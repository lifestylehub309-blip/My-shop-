from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict
from datetime import datetime
import uuid

# Product Models
class Product(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    category: str
    categoryId: int
    price: float
    originalPrice: float
    discount: int
    rating: float
    reviews: int
    image: str
    images: List[str] = []
    description: str
    specifications: Dict[str, str] = {}
    inStock: bool = True
    fastDelivery: bool = False
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class ProductCreate(BaseModel):
    name: str
    category: str
    categoryId: int
    price: float
    originalPrice: float
    discount: int
    rating: float
    reviews: int
    image: str
    images: List[str] = []
    description: str
    specifications: Dict[str, str] = {}
    inStock: bool = True
    fastDelivery: bool = False

# Category Models
class Category(BaseModel):
    id: int
    name: str
    icon: str
    image: str

# User Models
class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    password: str  # Will be hashed
    role: str = "user"  # user or admin
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class UserSignup(BaseModel):
    name: str
    email: EmailStr
    phone: str
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: Optional[str] = None
    role: str

# Order Models
class OrderItem(BaseModel):
    productId: str
    name: str
    image: str
    price: float
    quantity: int

class ShippingAddress(BaseModel):
    fullName: str
    phone: str
    address: str
    city: str
    state: str
    pincode: str

class Order(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    userId: str
    items: List[OrderItem]
    totalAmount: float
    shippingAddress: ShippingAddress
    paymentMethod: str  # razorpay, cod
    paymentId: Optional[str] = None
    status: str = "pending"  # pending, confirmed, shipped, delivered, cancelled
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class OrderCreate(BaseModel):
    items: List[OrderItem]
    totalAmount: float
    shippingAddress: ShippingAddress
    paymentMethod: str
    paymentId: Optional[str] = None

# Payment Models
class PaymentOrderCreate(BaseModel):
    amount: float  # in rupees

class PaymentVerify(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str
