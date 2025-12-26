import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { productsAPI } from '../services/api';
import { Star, Zap, Search as SearchIcon } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  const performSearch = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await productsAPI.search(searchQuery);
      setResults(response.data);
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      const searchResults = searchProducts(query);
      setResults(searchResults);
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const ProductCard = ({ product }) => (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="cursor-pointer"
    >
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
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Input
              type="text"
              placeholder="Search for products, brands and more"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-6 text-lg rounded-lg"
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-6 bg-[#2874f0] hover:bg-[#1c5dbf]"
            >
              <SearchIcon className="h-5 w-5" />
            </Button>
          </div>
        </form>

        {/* Results */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {results.length > 0
              ? `Search Results for "${initialQuery}" (${results.length})`
              : `No results found for "${initialQuery}"`}
          </h2>

          {results.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <SearchIcon className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-6">Try different keywords or browse categories</p>
              <Button onClick={() => navigate('/')} className="bg-[#2874f0] hover:bg-[#1c5dbf]">
                Go to Home
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
