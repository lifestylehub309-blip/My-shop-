import React from 'react';
import { Card } from '../components/ui/card';
import { Package } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
  const navigate = useNavigate();
  
  // Mock orders - will be replaced with actual orders from backend
  const orders = [];

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">My Orders</h1>
          <Card className="p-12 text-center">
            <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't made any orders yet</p>
            <Button onClick={() => navigate('/')} className="bg-[#2874f0] hover:bg-[#1c5dbf]">
              Start Shopping
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Orders</h1>
        {/* Orders will be displayed here once backend is integrated */}
      </div>
    </div>
  );
};

export default OrdersPage;
