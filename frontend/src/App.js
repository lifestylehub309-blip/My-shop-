import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from './components/ui/toaster';

// Components
import Header from './components/Header';
import CategoryBar from './components/CategoryBar';

// Pages
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import WishlistPage from './pages/WishlistPage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="App">
            <Routes>
              {/* Routes with Header and CategoryBar */}
              <Route
                path="/*"
                element={
                  <>
                    <Header />
                    <CategoryBar />
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/product/:id" element={<ProductDetailPage />} />
                      <Route path="/category/:categoryId" element={<CategoryPage />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/wishlist" element={<WishlistPage />} />
                      <Route path="/search" element={<SearchPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/orders" element={<OrdersPage />} />
                    </Routes>
                  </>
                }
              />
              {/* Login page without Header */}
              <Route path="/login" element={<LoginPage />} />
            </Routes>
            <Toaster />
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
