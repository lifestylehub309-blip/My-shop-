from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

from models import (
    Product, ProductCreate, Category, 
    User, UserSignup, UserLogin, UserResponse,
    Order, OrderCreate, OrderItem,
    PaymentOrderCreate, PaymentVerify
)
from auth import hash_password, verify_password, create_access_token, get_current_user
from seed_data import categories_data, products_data

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Collections
products_collection = db.products
users_collection = db.users
orders_collection = db.orders
categories_collection = db.categories

# Create the main app
app = FastAPI(title="Flipkart Clone API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ============== HELPER FUNCTIONS ==============
def convert_objectid_to_str(doc):
    """Convert MongoDB ObjectId to string and handle id field"""
    if doc is None:
        return None
    
    if isinstance(doc, list):
        return [convert_objectid_to_str(item) for item in doc]
    
    if isinstance(doc, dict):
        # Convert _id to id if present
        if "_id" in doc:
            doc["id"] = str(doc["_id"])
            del doc["_id"]
        
        # Convert any other ObjectId fields
        for key, value in doc.items():
            if isinstance(value, ObjectId):
                doc[key] = str(value)
            elif isinstance(value, dict):
                doc[key] = convert_objectid_to_str(value)
            elif isinstance(value, list):
                doc[key] = convert_objectid_to_str(value)
    
    return doc

# ============== INITIALIZATION ==============
@app.on_event("startup")
async def startup_db():
    """Initialize database with seed data if empty"""
    try:
        # Seed categories
        if await categories_collection.count_documents({}) == 0:
            await categories_collection.insert_many(categories_data)
            logger.info("Categories seeded successfully")
        
        # Seed products
        if await products_collection.count_documents({}) == 0:
            await products_collection.insert_many(products_data)
            logger.info("Products seeded successfully")
            
    except Exception as e:
        logger.error(f"Error seeding database: {e}")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

# ============== ROOT & HEALTH ==============
@api_router.get("/")
async def root():
    return {"message": "Flipkart Clone API", "status": "running"}

@api_router.get("/health")
async def health():
    return {"status": "healthy"}

# ============== CATEGORIES API ==============
@api_router.get("/categories", response_model=List[Category])
async def get_categories():
    """Get all categories"""
    categories = await categories_collection.find().to_list(100)
    return categories

# ============== PRODUCTS API ==============
@api_router.get("/products", response_model=List[Product])
async def get_products(
    category: Optional[int] = None,
    limit: int = 100,
    skip: int = 0
):
    """Get all products with optional category filter"""
    query = {}
    if category:
        query["categoryId"] = category
    
    products = await products_collection.find(query).skip(skip).limit(limit).to_list(limit)
    return products

@api_router.get("/products/search")
async def search_products(q: str):
    """Search products by name, category, or description"""
    query = {
        "$or": [
            {"name": {"$regex": q, "$options": "i"}},
            {"category": {"$regex": q, "$options": "i"}},
            {"description": {"$regex": q, "$options": "i"}}
        ]
    }
    products = await products_collection.find(query).to_list(100)
    return products

@api_router.get("/products/category/{category_id}")
async def get_products_by_category(category_id: int):
    """Get products by category ID"""
    products = await products_collection.find({"categoryId": category_id}).to_list(100)
    return products

@api_router.get("/products/{product_id}")
async def get_product(product_id: str):
    """Get single product by ID"""
    product = await products_collection.find_one({"id": product_id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

# ============== AUTH API ==============
@api_router.post("/auth/signup", response_model=UserResponse)
async def signup(user_data: UserSignup):
    """User registration"""
    # Check if user exists
    existing_user = await users_collection.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user
    user = User(
        name=user_data.name,
        email=user_data.email,
        phone=user_data.phone,
        password=hash_password(user_data.password)
    )
    
    await users_collection.insert_one(user.dict())
    
    return UserResponse(
        id=user.id,
        name=user.name,
        email=user.email,
        phone=user.phone,
        role=user.role
    )

@api_router.post("/auth/login")
async def login(credentials: UserLogin):
    """User login"""
    user = await users_collection.find_one({"email": credentials.email})
    if not user or not verify_password(credentials.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    access_token = create_access_token(data={"sub": user["id"]})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": UserResponse(
            id=user["id"],
            name=user["name"],
            email=user["email"],
            phone=user.get("phone"),
            role=user["role"]
        )
    }

@api_router.get("/auth/me", response_model=UserResponse)
async def get_current_user_info(user_id: str = Depends(get_current_user)):
    """Get current user info"""
    user = await users_collection.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return UserResponse(
        id=user["id"],
        name=user["name"],
        email=user["email"],
        phone=user.get("phone"),
        role=user["role"]
    )

# ============== ORDERS API ==============
@api_router.post("/orders", response_model=Order)
async def create_order(order_data: OrderCreate, user_id: str = Depends(get_current_user)):
    """Create new order"""
    order = Order(
        userId=user_id,
        items=order_data.items,
        totalAmount=order_data.totalAmount,
        shippingAddress=order_data.shippingAddress,
        paymentMethod=order_data.paymentMethod,
        paymentId=order_data.paymentId
    )
    
    await orders_collection.insert_one(order.dict())
    return order

@api_router.get("/orders", response_model=List[Order])
async def get_user_orders(user_id: str = Depends(get_current_user)):
    """Get all orders for current user"""
    orders = await orders_collection.find({"userId": user_id}).sort("createdAt", -1).to_list(100)
    return orders

@api_router.get("/orders/{order_id}", response_model=Order)
async def get_order(order_id: str, user_id: str = Depends(get_current_user)):
    """Get single order details"""
    order = await orders_collection.find_one({"id": order_id, "userId": user_id})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

# ============== PAYMENT API (Mock for now) ==============
@api_router.post("/payment/create-order")
async def create_payment_order(payment_data: PaymentOrderCreate):
    """Create Razorpay order - Mock implementation"""
    # In production, this will call Razorpay API
    # For now, return mock order
    import uuid
    return {
        "orderId": f"order_{uuid.uuid4().hex[:12]}",
        "amount": payment_data.amount * 100,  # Convert to paise
        "currency": "INR"
    }

@api_router.post("/payment/verify")
async def verify_payment(payment_data: PaymentVerify):
    """Verify Razorpay payment - Mock implementation"""
    # In production, verify signature with Razorpay
    # For now, return success
    return {"status": "success", "message": "Payment verified"}

# Include the router in the main app
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)