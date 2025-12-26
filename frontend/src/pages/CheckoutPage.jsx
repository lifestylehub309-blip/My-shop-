import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from '../hooks/use-toast';
import { MapPin, CreditCard, CheckCircle2 } from 'lucide-react';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [address, setAddress] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    pincode: '',
    address: '',
    city: '',
    state: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('razorpay');

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <h2 className="text-2xl font-bold mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">Please login to continue with checkout</p>
          <Button onClick={() => navigate('/login')} className="w-full bg-[#2874f0] hover:bg-[#1c5dbf]">
            Login
          </Button>
        </Card>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Button onClick={() => navigate('/')} className="bg-[#2874f0] hover:bg-[#1c5dbf]">
            Continue Shopping
          </Button>
        </Card>
      </div>
    );
  }

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (!address.fullName || !address.phone || !address.address || !address.city || !address.state || !address.pincode) {
      toast({
        title: "Error",
        description: "Please fill all address fields",
        variant: "destructive"
      });
      return;
    }
    setStep(2);
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    
    // Load Razorpay script
    const res = await loadRazorpayScript();
    if (!res) {
      toast({
        title: "Error",
        description: "Failed to load payment gateway. Please try again.",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    // For now, simulate payment success
    // In production, this will call backend API to create Razorpay order
    setTimeout(() => {
      setLoading(false);
      setStep(3);
      clearCart();
      toast({
        title: "Order Placed Successfully!",
        description: "Your order has been confirmed.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h1>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= 1 ? 'bg-[#2874f0] text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              {step > 1 ? <CheckCircle2 className="h-6 w-6" /> : '1'}
            </div>
            <span className="ml-2 font-semibold">Address</span>
          </div>
          <div className={`h-1 w-24 mx-4 ${
            step >= 2 ? 'bg-[#2874f0]' : 'bg-gray-300'
          }`} />
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= 2 ? 'bg-[#2874f0] text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              {step > 2 ? <CheckCircle2 className="h-6 w-6" /> : '2'}
            </div>
            <span className="ml-2 font-semibold">Payment</span>
          </div>
          <div className={`h-1 w-24 mx-4 ${
            step >= 3 ? 'bg-[#2874f0]' : 'bg-gray-300'
          }`} />
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= 3 ? 'bg-[#2874f0] text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              {step > 3 ? <CheckCircle2 className="h-6 w-6" /> : '3'}
            </div>
            <span className="ml-2 font-semibold">Confirmation</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="h-6 w-6 text-[#2874f0]" />
                  <h2 className="text-xl font-bold">Delivery Address</h2>
                </div>
                <form onSubmit={handleAddressSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={address.fullName}
                        onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={address.phone}
                        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Address *</Label>
                      <Input
                        id="address"
                        value={address.address}
                        onChange={(e) => setAddress({ ...address, address: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={address.state}
                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input
                        id="pincode"
                        value={address.pincode}
                        onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="mt-6 bg-[#fb641b] hover:bg-[#e05511]">
                    Continue to Payment
                  </Button>
                </form>
              </Card>
            )}

            {step === 2 && (
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="h-6 w-6 text-[#2874f0]" />
                  <h2 className="text-xl font-bold">Payment Method</h2>
                </div>
                
                {/* Delivery Address Summary */}
                <div className="bg-gray-50 p-4 rounded mb-6">
                  <p className="font-semibold mb-2">Delivery Address:</p>
                  <p className="text-sm text-gray-700">
                    {address.fullName}, {address.phone}<br />
                    {address.address}<br />
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                  <Button
                    variant="link"
                    onClick={() => setStep(1)}
                    className="text-[#2874f0] p-0 h-auto mt-2"
                  >
                    Change Address
                  </Button>
                </div>

                {/* Payment Options */}
                <div className="space-y-4">
                  <div className="border rounded p-4 cursor-pointer hover:border-[#2874f0] transition-colors">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="razorpay"
                        checked={paymentMethod === 'razorpay'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <div>
                        <p className="font-semibold">Razorpay (UPI, Cards, Wallets)</p>
                        <p className="text-sm text-gray-600">Pay securely using Razorpay</p>
                      </div>
                    </label>
                  </div>
                  
                  <div className="border rounded p-4 cursor-pointer hover:border-[#2874f0] transition-colors">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <div>
                        <p className="font-semibold">Cash on Delivery</p>
                        <p className="text-sm text-gray-600">Pay when you receive</p>
                      </div>
                    </label>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={loading}
                  className="mt-6 bg-[#fb641b] hover:bg-[#e05511] w-full"
                >
                  {loading ? 'Processing...' : `Pay ${formatPrice(cartTotal)}`}
                </Button>
              </Card>
            )}

            {step === 3 && (
              <Card className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 rounded-full p-4">
                    <CheckCircle2 className="h-16 w-16 text-green-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for your order. You will receive a confirmation email shortly.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button onClick={() => navigate('/orders')} className="bg-[#2874f0] hover:bg-[#1c5dbf]">
                    View Orders
                  </Button>
                  <Button onClick={() => navigate('/')} variant="outline">
                    Continue Shopping
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3 text-sm">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <p className="font-medium line-clamp-2">{item.name}</p>
                      <p className="text-gray-600">Qty: {item.quantity}</p>
                      <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Delivery</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
