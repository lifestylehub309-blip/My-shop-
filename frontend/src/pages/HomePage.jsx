import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { banners } from '../mockData';
import { productsAPI } from '../services/api';
import { Star, TrendingUp, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../components/ui/carousel';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsAPI.getAll();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const topDeals = products.filter(p => p.discount >= 40).slice(0, 6);
  const electronics = products.filter(p => p.categoryId === 1).slice(0, 6);
  const fashion = products.filter(p => p.categoryId === 2).slice(0, 6);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2874f0] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const ProductCard = ({ product }) => (
    <Link to={`/product/${product.id}`}>
      <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 h-full">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {product.discount > 0 && (
            <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 text-xs font-semibold rounded">
              {product.discount}% OFF
            </div>
          )}
          {product.fastDelivery && (
            <div className="absolute top-2 right-2 bg-[#2874f0] text-white p-1.5 rounded-full">
              <Zap className="h-4 w-4" fill="currentColor" />
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-medium text-sm line-clamp-2 mb-2 text-gray-800">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded text-xs font-semibold">
              {product.rating}
              <Star className="h-3 w-3" fill="currentColor" />
            </div>
            <span className="text-xs text-gray-500">({product.reviews.toLocaleString()})</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-4">
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {banners.map((banner) => (
                <CarouselItem key={banner.id}>
                  <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-8 md:px-16">
                      <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
                        {banner.title}
                      </h2>
                      <p className="text-lg md:text-2xl text-white mb-6">
                        {banner.subtitle}
                      </p>
                      <Button className="bg-[#2874f0] hover:bg-[#1c5dbf] text-white w-fit px-8">
                        Shop Now
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      </div>

      {/* Top Deals Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-[#2874f0]" />
              <h2 className="text-2xl font-bold text-gray-900">Top Deals</h2>
            </div>
            <Link to="/deals">
              <Button variant="ghost" className="text-[#2874f0] hover:text-[#1c5dbf]">
                View All
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {topDeals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Electronics Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Best of Electronics</h2>
            <Link to="/category/1">
              <Button variant="ghost" className="text-[#2874f0] hover:text-[#1c5dbf]">
                View All
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {electronics.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Fashion Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Fashion Top Deals</h2>
            <Link to="/category/2">
              <Button variant="ghost" className="text-[#2874f0] hover:text-[#1c5dbf]">
                View All
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {fashion.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#172337] text-white mt-12">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">ABOUT</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
                <li><Link to="/press" className="hover:text-white">Press</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">HELP</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/payments" className="hover:text-white">Payments</Link></li>
                <li><Link to="/shipping" className="hover:text-white">Shipping</Link></li>
                <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">POLICY</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/returns" className="hover:text-white">Return Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white">Terms Of Use</Link></li>
                <li><Link to="/privacy" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">SOCIAL</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="https://facebook.com" className="hover:text-white">Facebook</a></li>
                <li><a href="https://twitter.com" className="hover:text-white">Twitter</a></li>
                <li><a href="https://instagram.com" className="hover:text-white">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 Flipkart Clone. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
