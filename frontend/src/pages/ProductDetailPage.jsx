import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../mockData';
import { useCart } from '../context/CartContext';
import { Star, Heart, Zap, ShoppingCart, Truck, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { toast } from '../hooks/use-toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const { addToCart, addToWishlist, isInWishlist } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Button onClick={() => navigate('/')}>Go to Home</Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      toast({
        title: "Already in Wishlist",
        description: "This item is already in your wishlist.",
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  const images = product.images || [product.image];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg shadow-sm p-6">
          {/* Left Side - Images */}
          <div>
            <div className="sticky top-24">
              {/* Main Image */}
              <div className="aspect-square mb-4 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="flex gap-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-20 h-20 rounded border-2 overflow-hidden ${
                        selectedImage === idx ? 'border-[#2874f0]' : 'border-gray-200'
                      }`}
                    >
                      <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
              {/* Action Buttons */}
              <div className="flex gap-4 mt-6">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#ff9f00] hover:bg-[#e68a00] text-white h-12 text-lg font-semibold"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  ADD TO CART
                </Button>
                <Button
                  onClick={handleBuyNow}
                  className="flex-1 bg-[#fb641b] hover:bg-[#e05511] text-white h-12 text-lg font-semibold"
                >
                  <Zap className="mr-2 h-5 w-5" fill="currentColor" />
                  BUY NOW
                </Button>
              </div>
            </div>
          </div>

          {/* Right Side - Details */}
          <div>
            <div className="mb-4">
              <h1 className="text-2xl font-medium text-gray-800 mb-2">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-sm font-semibold">
                  {product.rating}
                  <Star className="h-4 w-4" fill="currentColor" />
                </div>
                <span className="text-gray-600">
                  {product.reviews.toLocaleString()} Ratings & Reviews
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-semibold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="text-green-600 font-semibold">
                      {product.discount}% off
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-4">
                {product.fastDelivery && (
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="h-5 w-5 text-[#2874f0]" />
                    <span className="font-medium">Fast Delivery</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-5 w-5 text-[#2874f0]" />
                  <span className="font-medium">Secure Transaction</span>
                </div>
                {product.inStock && (
                  <span className="text-green-600 font-medium text-sm">In Stock</span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Product Description</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Specifications */}
            {product.specifications && (
              <Card className="p-4 mb-6">
                <h3 className="text-lg font-semibold mb-3">Specifications</h3>
                <div className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex border-b pb-2">
                      <span className="font-medium text-gray-600 w-1/3">{key}</span>
                      <span className="text-gray-800 w-2/3">{value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-10 w-10"
                >
                  -
                </Button>
                <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-10 w-10"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Wishlist Button */}
            <Button
              variant="outline"
              onClick={handleWishlist}
              className="w-full border-[#2874f0] text-[#2874f0] hover:bg-blue-50"
            >
              <Heart
                className={`mr-2 h-5 w-5 ${
                  isInWishlist(product.id) ? 'fill-current text-red-500' : ''
                }`}
              />
              {isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
