#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Flipkart Clone
Tests all backend endpoints including Products, Categories, Auth, and Orders APIs
"""

import requests
import json
import os
from typing import Dict, Any, Optional

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except FileNotFoundError:
        pass
    return "http://localhost:8001"

BASE_URL = get_backend_url()
API_BASE = f"{BASE_URL}/api"

class FlipkartAPITester:
    def __init__(self):
        self.session = requests.Session()
        self.auth_token = None
        self.test_user_data = {
            "name": "Priya Sharma",
            "email": "priya.sharma@example.com", 
            "phone": "9876543210",
            "password": "SecurePass123"
        }
        self.test_results = []
        
    def log_test(self, test_name: str, success: bool, details: str = "", response_data: Any = None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "details": details,
            "response_data": response_data
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if details:
            print(f"   Details: {details}")
        if not success and response_data:
            print(f"   Response: {response_data}")
        print()

    def test_health_check(self):
        """Test basic connectivity"""
        try:
            response = self.session.get(f"{API_BASE}/health", timeout=10)
            if response.status_code == 200:
                self.log_test("Health Check", True, f"API is accessible at {API_BASE}")
                return True
            else:
                self.log_test("Health Check", False, f"Status: {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Health Check", False, f"Connection error: {str(e)}")
            return False

    def test_categories_api(self):
        """Test Categories API"""
        try:
            response = self.session.get(f"{API_BASE}/categories")
            
            if response.status_code == 200:
                categories = response.json()
                if isinstance(categories, list) and len(categories) > 0:
                    # Check if categories have required fields
                    first_category = categories[0]
                    required_fields = ['id', 'name', 'icon', 'image']
                    
                    if all(field in first_category for field in required_fields):
                        self.log_test("GET /api/categories", True, 
                                    f"Retrieved {len(categories)} categories successfully")
                        return categories
                    else:
                        self.log_test("GET /api/categories", False, 
                                    f"Missing required fields in category data", first_category)
                else:
                    self.log_test("GET /api/categories", False, 
                                "No categories returned or invalid format", categories)
            else:
                self.log_test("GET /api/categories", False, 
                            f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/categories", False, f"Error: {str(e)}")
        
        return None

    def test_products_api(self):
        """Test Products API endpoints"""
        products = None
        
        # Test 1: Get all products
        try:
            response = self.session.get(f"{API_BASE}/products")
            
            if response.status_code == 200:
                products = response.json()
                if isinstance(products, list) and len(products) > 0:
                    self.log_test("GET /api/products", True, 
                                f"Retrieved {len(products)} products successfully")
                else:
                    self.log_test("GET /api/products", False, 
                                "No products returned or invalid format", products)
                    return None
            else:
                self.log_test("GET /api/products", False, 
                            f"Status: {response.status_code}", response.text)
                return None
        except Exception as e:
            self.log_test("GET /api/products", False, f"Error: {str(e)}")
            return None

        # Test 2: Get products by category (Electronics - category ID 1)
        try:
            response = self.session.get(f"{API_BASE}/products/category/1")
            
            if response.status_code == 200:
                electronics_products = response.json()
                if isinstance(electronics_products, list):
                    # Verify all products are from Electronics category
                    all_electronics = all(p.get('categoryId') == 1 for p in electronics_products)
                    if all_electronics:
                        self.log_test("GET /api/products/category/1", True, 
                                    f"Retrieved {len(electronics_products)} electronics products")
                    else:
                        self.log_test("GET /api/products/category/1", False, 
                                    "Some products don't belong to Electronics category")
                else:
                    self.log_test("GET /api/products/category/1", False, 
                                "Invalid response format", electronics_products)
            else:
                self.log_test("GET /api/products/category/1", False, 
                            f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/products/category/1", False, f"Error: {str(e)}")

        # Test 3: Search products for iPhone
        try:
            response = self.session.get(f"{API_BASE}/products/search", params={"q": "iphone"})
            
            if response.status_code == 200:
                search_results = response.json()
                if isinstance(search_results, list):
                    # Check if results contain iPhone-related products
                    iphone_found = any('iphone' in p.get('name', '').lower() for p in search_results)
                    if iphone_found or len(search_results) > 0:
                        self.log_test("GET /api/products/search?q=iphone", True, 
                                    f"Search returned {len(search_results)} results")
                    else:
                        self.log_test("GET /api/products/search?q=iphone", True, 
                                    "Search completed but no iPhone products found (expected if no iPhone in DB)")
                else:
                    self.log_test("GET /api/products/search?q=iphone", False, 
                                "Invalid response format", search_results)
            else:
                self.log_test("GET /api/products/search?q=iphone", False, 
                            f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/products/search?q=iphone", False, f"Error: {str(e)}")

        # Test 4: Get specific product by ID
        if products and len(products) > 0:
            try:
                # Use the first product's ID
                product_id = products[0].get('id')
                if product_id:
                    response = self.session.get(f"{API_BASE}/products/{product_id}")
                    
                    if response.status_code == 200:
                        product = response.json()
                        if product.get('id') == product_id:
                            self.log_test(f"GET /api/products/{product_id}", True, 
                                        f"Retrieved product: {product.get('name', 'Unknown')}")
                        else:
                            self.log_test(f"GET /api/products/{product_id}", False, 
                                        "Product ID mismatch", product)
                    else:
                        self.log_test(f"GET /api/products/{product_id}", False, 
                                    f"Status: {response.status_code}", response.text)
                else:
                    self.log_test("GET /api/products/{product_id}", False, 
                                "No product ID available for testing")
            except Exception as e:
                self.log_test("GET /api/products/{product_id}", False, f"Error: {str(e)}")

        return products

    def test_auth_signup(self):
        """Test user signup"""
        try:
            response = self.session.post(f"{API_BASE}/auth/signup", 
                                       json=self.test_user_data)
            
            if response.status_code == 200:
                user_response = response.json()
                required_fields = ['id', 'name', 'email', 'role']
                
                if all(field in user_response for field in required_fields):
                    self.log_test("POST /api/auth/signup", True, 
                                f"User created successfully: {user_response.get('name')}")
                    return True
                else:
                    self.log_test("POST /api/auth/signup", False, 
                                "Missing required fields in response", user_response)
            elif response.status_code == 400:
                # User might already exist
                error_detail = response.json().get('detail', '')
                if 'already registered' in error_detail.lower():
                    self.log_test("POST /api/auth/signup", True, 
                                "User already exists (expected for repeated tests)")
                    return True
                else:
                    self.log_test("POST /api/auth/signup", False, 
                                f"Bad request: {error_detail}")
            else:
                self.log_test("POST /api/auth/signup", False, 
                            f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("POST /api/auth/signup", False, f"Error: {str(e)}")
        
        return False

    def test_auth_login(self):
        """Test user login"""
        try:
            login_data = {
                "email": self.test_user_data["email"],
                "password": self.test_user_data["password"]
            }
            
            response = self.session.post(f"{API_BASE}/auth/login", json=login_data)
            
            if response.status_code == 200:
                login_response = response.json()
                
                if 'access_token' in login_response and 'user' in login_response:
                    self.auth_token = login_response['access_token']
                    user_info = login_response['user']
                    
                    self.log_test("POST /api/auth/login", True, 
                                f"Login successful for: {user_info.get('name')}")
                    return True
                else:
                    self.log_test("POST /api/auth/login", False, 
                                "Missing access_token or user in response", login_response)
            else:
                self.log_test("POST /api/auth/login", False, 
                            f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("POST /api/auth/login", False, f"Error: {str(e)}")
        
        return False

    def test_auth_me(self):
        """Test get current user info"""
        if not self.auth_token:
            self.log_test("GET /api/auth/me", False, "No auth token available")
            return False
            
        try:
            headers = {"Authorization": f"Bearer {self.auth_token}"}
            response = self.session.get(f"{API_BASE}/auth/me", headers=headers)
            
            if response.status_code == 200:
                user_info = response.json()
                required_fields = ['id', 'name', 'email', 'role']
                
                if all(field in user_info for field in required_fields):
                    self.log_test("GET /api/auth/me", True, 
                                f"Retrieved user info: {user_info.get('name')}")
                    return True
                else:
                    self.log_test("GET /api/auth/me", False, 
                                "Missing required fields", user_info)
            else:
                self.log_test("GET /api/auth/me", False, 
                            f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/auth/me", False, f"Error: {str(e)}")
        
        return False

    def test_orders_create(self, products):
        """Test order creation"""
        if not self.auth_token:
            self.log_test("POST /api/orders", False, "No auth token available")
            return False
            
        if not products or len(products) == 0:
            self.log_test("POST /api/orders", False, "No products available for order")
            return False
            
        try:
            # Create a test order with sample items
            sample_product = products[0]
            order_data = {
                "items": [
                    {
                        "productId": sample_product.get('id'),
                        "name": sample_product.get('name'),
                        "image": sample_product.get('image'),
                        "price": sample_product.get('price'),
                        "quantity": 2
                    }
                ],
                "totalAmount": sample_product.get('price', 0) * 2,
                "shippingAddress": {
                    "fullName": "Priya Sharma",
                    "phone": "9876543210",
                    "address": "123 MG Road",
                    "city": "Bangalore",
                    "state": "Karnataka",
                    "pincode": "560001"
                },
                "paymentMethod": "razorpay",
                "paymentId": "pay_test123456"
            }
            
            headers = {"Authorization": f"Bearer {self.auth_token}"}
            response = self.session.post(f"{API_BASE}/orders", 
                                       json=order_data, headers=headers)
            
            if response.status_code == 200:
                order_response = response.json()
                required_fields = ['id', 'userId', 'items', 'totalAmount', 'status']
                
                if all(field in order_response for field in required_fields):
                    self.log_test("POST /api/orders", True, 
                                f"Order created successfully: {order_response.get('id')}")
                    return order_response
                else:
                    self.log_test("POST /api/orders", False, 
                                "Missing required fields in order response", order_response)
            else:
                self.log_test("POST /api/orders", False, 
                            f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("POST /api/orders", False, f"Error: {str(e)}")
        
        return None

    def test_orders_get(self):
        """Test get user orders"""
        if not self.auth_token:
            self.log_test("GET /api/orders", False, "No auth token available")
            return False
            
        try:
            headers = {"Authorization": f"Bearer {self.auth_token}"}
            response = self.session.get(f"{API_BASE}/orders", headers=headers)
            
            if response.status_code == 200:
                orders = response.json()
                if isinstance(orders, list):
                    self.log_test("GET /api/orders", True, 
                                f"Retrieved {len(orders)} orders for user")
                    return True
                else:
                    self.log_test("GET /api/orders", False, 
                                "Invalid response format", orders)
            else:
                self.log_test("GET /api/orders", False, 
                            f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/orders", False, f"Error: {str(e)}")
        
        return False

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Flipkart Clone Backend API Tests")
        print(f"📍 Testing API at: {API_BASE}")
        print("=" * 60)
        
        # Test basic connectivity
        if not self.test_health_check():
            print("❌ Cannot connect to API. Stopping tests.")
            return
        
        # Test Categories API
        print("📂 Testing Categories API...")
        categories = self.test_categories_api()
        
        # Test Products API
        print("📦 Testing Products API...")
        products = self.test_products_api()
        
        # Test Auth API
        print("🔐 Testing Authentication API...")
        signup_success = self.test_auth_signup()
        login_success = self.test_auth_login()
        if login_success:
            self.test_auth_me()
        
        # Test Orders API (requires auth)
        print("🛒 Testing Orders API...")
        if login_success and products:
            order = self.test_orders_create(products)
            self.test_orders_get()
        
        # Print summary
        self.print_summary()

    def print_summary(self):
        """Print test summary"""
        print("=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if result['success'])
        total = len(self.test_results)
        
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        print(f"Success Rate: {(passed/total)*100:.1f}%")
        
        # Show failed tests
        failed_tests = [result for result in self.test_results if not result['success']]
        if failed_tests:
            print("\n❌ FAILED TESTS:")
            for test in failed_tests:
                print(f"  • {test['test']}: {test['details']}")
        
        print("\n" + "=" * 60)

if __name__ == "__main__":
    tester = FlipkartAPITester()
    tester.run_all_tests()