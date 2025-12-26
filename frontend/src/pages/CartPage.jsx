import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add items to get started</p>
          <Button onClick={() => navigate('/')} className="bg-[#2874f0] hover:bg-[#1c5dbf]">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  const savings = cart.reduce(
    (total, item) => total + (item.originalPrice - item.price) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-32 h-32 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{item.category}</p>
                    
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="text-xl font-bold text-gray-900">
                        {formatPrice(item.price)}
                      </span>
                      {item.originalPrice > item.price && (
                        <>
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(item.originalPrice)}
                          </span>
                          <span className="text-sm text-green-600 font-semibold">
                            {item.discount}% off
                          </span>
                        </>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-3 border rounded">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-semibold min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                
                {savings > 0 && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Discount</span>
                    <span>-{formatPrice(savings)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-gray-700">
                  <span>Delivery Charges</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total Amount</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                {savings > 0 && (
                  <p className="text-sm text-green-600 mt-2">
                    You will save {formatPrice(savings)} on this order
                  </p>
                )}
              </div>

              <Button
                onClick={() => navigate('/checkout')}
                className="w-full bg-[#fb641b] hover:bg-[#e05511] text-white h-12 text-lg font-semibold"
              >
                Proceed to Checkout
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
