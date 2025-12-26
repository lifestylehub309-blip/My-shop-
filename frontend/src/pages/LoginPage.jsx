import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from '../hooks/use-toast';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login(loginData.email, loginData.password);
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { signup } = require('../context/AuthContext');
      await signup(signupData.name, signupData.email, signupData.password, signupData.phone);
      toast({
        title: "Signup Successful",
        description: "Your account has been created!",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: error.message || "Something went wrong",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-6xl w-full gap-8">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col justify-center bg-[#2874f0] rounded-lg p-12 text-white">
          <h1 className="text-4xl font-bold mb-4">Flipkart</h1>
          <p className="text-xl mb-8">The Shopping Destination</p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
              <span>Browse millions of products</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
              <span>Secure payments & fast delivery</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
              <span>Easy returns & refunds</span>
            </li>
          </ul>
        </div>

        {/* Right Side - Auth Forms */}
        <Card className="p-8">
          <div className="mb-6">
            <div className="flex border-b">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 font-semibold transition-colors ${
                  isLogin
                    ? 'text-[#2874f0] border-b-2 border-[#2874f0]'
                    : 'text-gray-600'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 font-semibold transition-colors ${
                  !isLogin
                    ? 'text-[#2874f0] border-b-2 border-[#2874f0]'
                    : 'text-gray-600'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {isLogin ? (
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                    placeholder="Enter your password"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#fb641b] hover:bg-[#e05511] h-12"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    required
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <Label htmlFor="signup-email">Email Address</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    required
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={signupData.phone}
                    onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                    required
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    required
                    placeholder="Create a password"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#fb641b] hover:bg-[#e05511] h-12"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </div>
            </form>
          )}

          <p className="text-center text-sm text-gray-600 mt-6">
            By continuing, you agree to Flipkart's{' '}
            <Link to="/terms" className="text-[#2874f0] hover:underline">
              Terms of Use
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-[#2874f0] hover:underline">
              Privacy Policy
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
