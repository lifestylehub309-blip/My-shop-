# Backend Implementation Contracts

## Current Mock Data (to be replaced)
- **mockData.js**: All products, categories, banners
- **AuthContext.js**: Mock login/signup functions
- **CartContext.js**: LocalStorage-based cart (will keep for offline support)

## API Contracts

### 1. Products API
```
GET /api/products - Get all products
GET /api/products/:id - Get product by ID
GET /api/products/category/:categoryId - Get products by category
GET /api/products/search?q=query - Search products
POST /api/products - Create product (admin)
PUT /api/products/:id - Update product (admin)
DELETE /api/products/:id - Delete product (admin)
```

### 2. Categories API
```
GET /api/categories - Get all categories
```

### 3. Users API
```
POST /api/auth/signup - User registration
POST /api/auth/login - User login
GET /api/auth/me - Get current user
PUT /api/auth/profile - Update user profile
```

### 4. Cart API (Optional - using localStorage for now)
```
GET /api/cart - Get user cart
POST /api/cart - Add to cart
PUT /api/cart/:itemId - Update cart item
DELETE /api/cart/:itemId - Remove from cart
```

### 5. Orders API
```
POST /api/orders - Create order
GET /api/orders - Get user orders
GET /api/orders/:id - Get order details
```

### 6. Payment API (Razorpay)
```
POST /api/payment/create-order - Create Razorpay order
POST /api/payment/verify - Verify payment signature
```

### 7. Wishlist API
```
GET /api/wishlist - Get user wishlist
POST /api/wishlist - Add to wishlist
DELETE /api/wishlist/:productId - Remove from wishlist
```

## MongoDB Models

### Product Model
- name, category, categoryId, price, originalPrice, discount
- rating, reviews, image, images[], description
- specifications (object), inStock, fastDelivery

### User Model
- name, email, password (hashed), phone
- addresses[], role (user/admin)
- createdAt, updatedAt

### Order Model
- userId, items[], totalAmount, status
- shippingAddress, paymentMethod, paymentId
- createdAt, updatedAt

### Category Model (optional - can use hardcoded)
- name, icon, image

## Frontend-Backend Integration Plan

### Phase 1: Products & Categories
1. Create Product and Category models
2. Seed database with mock products
3. Replace mockData.js imports with API calls
4. Update HomePage, CategoryPage, ProductDetailPage, SearchPage

### Phase 2: Authentication
1. Create User model with JWT
2. Implement signup/login APIs
3. Update AuthContext to use real APIs
4. Add authentication middleware

### Phase 3: Orders & Checkout
1. Create Order model
2. Implement order creation API
3. Update CheckoutPage to create orders
4. Update OrdersPage to fetch user orders

### Phase 4: Payment Integration
1. Add Razorpay configuration
2. Create payment order API
3. Implement payment verification
4. Update CheckoutPage with Razorpay integration

### Phase 5: Wishlist (Optional)
1. Add wishlist to User model or separate collection
2. Implement wishlist APIs
3. Update WishlistPage to use APIs

## Environment Variables Needed
```
# Backend .env
MONGO_URL=existing
DB_NAME=existing
JWT_SECRET=to_be_generated
RAZORPAY_KEY_ID=to_be_provided
RAZORPAY_KEY_SECRET=to_be_provided
```

## Cart Strategy
- Keep localStorage-based cart for now (works offline)
- Optionally sync with backend when user logs in
- This is common e-commerce pattern (cart before login)
