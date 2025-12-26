import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Package, Heart, User as UserIcon, LogOut } from 'lucide-react';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <h2 className="text-2xl font-bold mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">Please login to view your profile</p>
          <Button onClick={() => navigate('/login')} className="w-full bg-[#2874f0] hover:bg-[#1c5dbf]">
            Login
          </Button>
        </Card>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Account</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-[#2874f0] flex items-center justify-center text-white text-3xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                {user.phone && <p className="text-gray-600">{user.phone}</p>}
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full text-red-600 border-red-600 hover:bg-red-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </Card>

          {/* Quick Links */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate('/orders')}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Package className="h-6 w-6 text-[#2874f0]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">My Orders</h3>
                  <p className="text-sm text-gray-600">View all your orders</p>
                </div>
              </div>
            </Card>

            <Card
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate('/wishlist')}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Wishlist</h3>
                  <p className="text-sm text-gray-600">View saved items</p>
                </div>
              </div>
            </Card>

            <Card
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate('/profile/edit')}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Edit Profile</h3>
                  <p className="text-sm text-gray-600">Update your details</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
