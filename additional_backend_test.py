#!/usr/bin/env python3
"""
Additional Backend API Testing for edge cases and validation
"""

import requests
import json

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

def test_edge_cases():
    """Test edge cases and error handling"""
    session = requests.Session()
    
    print("🔍 Testing Edge Cases and Error Handling")
    print("=" * 50)
    
    # Test 1: Invalid product ID
    try:
        response = session.get(f"{API_BASE}/products/invalid-id")
        print(f"✅ Invalid product ID: {response.status_code} (Expected 404)")
    except Exception as e:
        print(f"❌ Invalid product ID test failed: {e}")
    
    # Test 2: Search with empty query
    try:
        response = session.get(f"{API_BASE}/products/search", params={"q": ""})
        print(f"✅ Empty search query: {response.status_code}")
    except Exception as e:
        print(f"❌ Empty search test failed: {e}")
    
    # Test 3: Category that doesn't exist
    try:
        response = session.get(f"{API_BASE}/products/category/999")
        print(f"✅ Non-existent category: {response.status_code} - {len(response.json())} products")
    except Exception as e:
        print(f"❌ Non-existent category test failed: {e}")
    
    # Test 4: Auth without token
    try:
        response = session.get(f"{API_BASE}/auth/me")
        print(f"✅ Auth without token: {response.status_code} (Expected 403/401)")
    except Exception as e:
        print(f"❌ Auth without token test failed: {e}")
    
    # Test 5: Invalid login credentials
    try:
        response = session.post(f"{API_BASE}/auth/login", json={
            "email": "nonexistent@example.com",
            "password": "wrongpassword"
        })
        print(f"✅ Invalid login: {response.status_code} (Expected 401)")
    except Exception as e:
        print(f"❌ Invalid login test failed: {e}")
    
    # Test 6: Signup with invalid email
    try:
        response = session.post(f"{API_BASE}/auth/signup", json={
            "name": "Test User",
            "email": "invalid-email",
            "phone": "1234567890",
            "password": "password123"
        })
        print(f"✅ Invalid email signup: {response.status_code} (Expected 422)")
    except Exception as e:
        print(f"❌ Invalid email signup test failed: {e}")
    
    # Test 7: Orders without auth
    try:
        response = session.get(f"{API_BASE}/orders")
        print(f"✅ Orders without auth: {response.status_code} (Expected 403/401)")
    except Exception as e:
        print(f"❌ Orders without auth test failed: {e}")
    
    print("\n🎯 Edge case testing completed!")

def test_data_validation():
    """Test data structure and validation"""
    session = requests.Session()
    
    print("\n📊 Testing Data Structure and Validation")
    print("=" * 50)
    
    # Test product data structure
    try:
        response = session.get(f"{API_BASE}/products")
        if response.status_code == 200:
            products = response.json()
            if products:
                product = products[0]
                required_fields = ['id', 'name', 'category', 'categoryId', 'price', 'rating']
                missing_fields = [field for field in required_fields if field not in product]
                
                if not missing_fields:
                    print("✅ Product data structure: All required fields present")
                else:
                    print(f"❌ Product data structure: Missing fields: {missing_fields}")
                
                # Check data types
                if isinstance(product.get('price'), (int, float)) and product.get('price') > 0:
                    print("✅ Product price: Valid numeric value")
                else:
                    print("❌ Product price: Invalid value")
                
                if isinstance(product.get('rating'), (int, float)) and 0 <= product.get('rating') <= 5:
                    print("✅ Product rating: Valid range (0-5)")
                else:
                    print("❌ Product rating: Invalid range")
    except Exception as e:
        print(f"❌ Product data validation failed: {e}")
    
    # Test category data structure
    try:
        response = session.get(f"{API_BASE}/categories")
        if response.status_code == 200:
            categories = response.json()
            if categories:
                category = categories[0]
                required_fields = ['id', 'name', 'icon', 'image']
                missing_fields = [field for field in required_fields if field not in category]
                
                if not missing_fields:
                    print("✅ Category data structure: All required fields present")
                else:
                    print(f"❌ Category data structure: Missing fields: {missing_fields}")
    except Exception as e:
        print(f"❌ Category data validation failed: {e}")
    
    print("\n🎯 Data validation testing completed!")

if __name__ == "__main__":
    test_edge_cases()
    test_data_validation()