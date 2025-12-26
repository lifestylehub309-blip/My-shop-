import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { toast } from '../hooks/use-toast';

const WishlistPage = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">Save your favorite items here</p>
          <Button onClick={() => navigate('/')} className="bg-[#2874f0] hover:bg-[#1c5dbf]">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Wishlist ({wishlist.length})</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-all">
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover cursor-pointer group-hover:scale-110 transition-transform duration-500"
                  onClick={() => navigate(`/product/${product.id}`)}
                />
                {product.discount > 0 && (
                  <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 text-xs font-semibold rounded">
                    {product.discount}% OFF
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-2 right-2 bg-white hover:bg-gray-100 rounded-full"
                >
                  <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                </Button>
              </div>
              <div className="p-4">
                <h3
                  className="font-medium text-sm line-clamp-2 mb-2 text-gray-800 cursor-pointer hover:text-[#2874f0]"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <Button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-[#ff9f00] hover:bg-[#e68a00] text-white"
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
