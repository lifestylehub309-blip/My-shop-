import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductsByCategory, categories } from '../mockData';
import { Star, Zap, SlidersHorizontal } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const allProducts = getProductsByCategory(categoryId);
  const category = categories.find(c => c.id === parseInt(categoryId));
  
  const [sortBy, setSortBy] = useState('popularity');
  const [priceRange, setPriceRange] = useState([]);
  const [ratingFilter, setRatingFilter] = useState([]);
  const [showFilters, setShowFilters] = useState(true);

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  // Filter products
  let filteredProducts = [...allProducts];
  
  // Price filter
  if (priceRange.length > 0) {
    filteredProducts = filteredProducts.filter(p => {
      return priceRange.some(range => {
        if (range === 'under5000') return p.price < 5000;
        if (range === '5000-10000') return p.price >= 5000 && p.price < 10000;
        if (range === '10000-25000') return p.price >= 10000 && p.price < 25000;
        if (range === 'above25000') return p.price >= 25000;
        return true;
      });
    });
  }

  // Rating filter
  if (ratingFilter.length > 0) {
    filteredProducts = filteredProducts.filter(p => {
      return ratingFilter.some(rating => p.rating >= parseFloat(rating));
    });
  }

  // Sort products
  filteredProducts.sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'discount') return b.discount - a.discount;
    return 0; // popularity (default order)
  });

  const handlePriceFilter = (range) => {
    setPriceRange(prev => 
      prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
    );
  };

  const handleRatingFilter = (rating) => {
    setRatingFilter(prev =>
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    );
  };

  const ProductCard = ({ product }) => (
    <Link to={`/product/${product.id}`}>
      <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
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
              <>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-xs text-green-600 font-semibold">
                  {product.discount}% off
                </span>
              </>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {category ? category.name : 'All Products'}
              </h1>
              <p className="text-gray-600">
                Showing {filteredProducts.length} products
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Customer Rating</SelectItem>
                  <SelectItem value="discount">Discount</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-64 flex-shrink-0 hidden md:block">
              <Card className="p-4 sticky top-24">
                <h2 className="font-bold text-lg mb-4">Filters</h2>
                
                {/* Price Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Price</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Under ₹5,000', value: 'under5000' },
                      { label: '₹5,000 - ₹10,000', value: '5000-10000' },
                      { label: '₹10,000 - ₹25,000', value: '10000-25000' },
                      { label: 'Above ₹25,000', value: 'above25000' },
                    ].map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.value}
                          checked={priceRange.includes(option.value)}
                          onCheckedChange={() => handlePriceFilter(option.value)}
                        />
                        <label
                          htmlFor={option.value}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Customer Ratings</h3>
                  <div className="space-y-2">
                    {['4.5', '4', '3.5', '3'].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox
                          id={`rating-${rating}`}
                          checked={ratingFilter.includes(rating)}
                          onCheckedChange={() => handleRatingFilter(rating)}
                        />
                        <label
                          htmlFor={`rating-${rating}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center gap-1"
                        >
                          {rating}
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          & above
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {(priceRange.length > 0 || ratingFilter.length > 0) && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setPriceRange([]);
                      setRatingFilter([]);
                    }}
                    className="w-full"
                  >
                    Clear All Filters
                  </Button>
                )}
              </Card>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-600 text-lg">No products found matching your filters.</p>
                <Button
                  onClick={() => {
                    setPriceRange([]);
                    setRatingFilter([]);
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
