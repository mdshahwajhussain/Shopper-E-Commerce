import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ChevronDown, X, Grid2X2, LayoutList, Star } from 'lucide-react';
import { dummyProductData } from '../data/dummyData';

const ShopPage: React.FC = () => {
  const [products, setProducts] = useState(dummyProductData);
  const [filteredProducts, setFilteredProducts] = useState(dummyProductData);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    rating: 0,
  });
  const [sort, setSort] = useState('featured');
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }
    
    // Apply price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      result = result.filter(product => {
        const price = product.variants[0].price;
        return price >= min && (max ? price <= max : true);
      });
    }
    
    // Apply rating filter
    if (filters.rating > 0) {
      result = result.filter(product => Math.floor(product.rating) >= filters.rating);
    }
    
    // Apply sorting
    if (sort === 'price-low') {
      result.sort((a, b) => a.variants[0].price - b.variants[0].price);
    } else if (sort === 'price-high') {
      result.sort((a, b) => b.variants[0].price - a.variants[0].price);
    } else if (sort === 'top-rated') {
      result.sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredProducts(result);
  }, [products, filters, sort]);

  const resetFilters = () => {
    setFilters({
      category: '',
      priceRange: '',
      rating: 0,
    });
    setSort('featured');
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse max-w-6xl mx-auto">
          <div className="h-8 bg-gray-200 rounded max-w-[200px] mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="space-y-3">
                <div className="h-60 bg-gray-200 rounded-lg"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Shop All Products</h1>
            <p className="text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available
            </p>
          </div>
          
          <div className="flex items-center mt-4 sm:mt-0">
            <button
              className="md:hidden mr-4 flex items-center text-gray-700 hover:text-gray-900 bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm"
              onClick={toggleFilters}
            >
              <Filter size={18} className="mr-1" />
              Filters
            </button>
            
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                className={`p-2 ${view === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                onClick={() => setView('grid')}
                aria-label="Grid view"
              >
                <Grid2X2 size={18} />
              </button>
              <button
                className={`p-2 ${view === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                onClick={() => setView('list')}
                aria-label="List view"
              >
                <LayoutList size={18} />
              </button>
            </div>
            
            <div className="ml-3">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="top-rated">Top Rated</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden md:block md:w-64 flex-shrink-0">
            <div className="sticky top-20">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-bold text-lg">Filters</h2>
                  {(filters.category || filters.priceRange || filters.rating > 0) && (
                    <button
                      onClick={resetFilters}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Reset All
                    </button>
                  )}
                </div>
                
                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Categories</h3>
                  <div className="space-y-2">
                    {['Clothing', 'Accessories', 'Footwear', 'Outerwear'].map((category) => (
                      <label key={category} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={filters.category === category}
                          onChange={() => setFilters({ ...filters, category })}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-full"
                        />
                        <span className="ml-2 text-sm text-gray-700">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Under ₹1,000', value: '0-1000' },
                      { label: '₹1,000 - ₹2,500', value: '1000-2500' },
                      { label: '₹2,500 - ₹5,000', value: '2500-5000' },
                      { label: 'Over ₹5,000', value: '5000-' },
                    ].map((range) => (
                      <label key={range.value} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="priceRange"
                          checked={filters.priceRange === range.value}
                          onChange={() => setFilters({ ...filters, priceRange: range.value })}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-full"
                        />
                        <span className="ml-2 text-sm text-gray-700">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Ratings */}
                <div>
                  <h3 className="font-medium mb-3">Rating</h3>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          checked={filters.rating === rating}
                          onChange={() => setFilters({ ...filters, rating })}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-full"
                        />
                        <div className="ml-2 flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                            />
                          ))}
                          <span className="ml-1 text-sm text-gray-700">& Up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Filters Modal - Mobile */}
          {showFilters && (
            <div className="md:hidden fixed inset-0 z-50 flex items-end">
              <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleFilters}></div>
              <div className="relative bg-white w-full rounded-t-2xl p-6 max-h-[80vh] overflow-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-bold text-lg">Filters</h2>
                  <button onClick={toggleFilters} className="p-1">
                    <X size={20} />
                  </button>
                </div>
                
                {/* Mobile Filters Content */}
                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Categories</h3>
                  <div className="space-y-3">
                    {['Clothing', 'Accessories', 'Footwear', 'Outerwear'].map((category) => (
                      <label key={category} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={filters.category === category}
                          onChange={() => setFilters({ ...filters, category })}
                          className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-full"
                        />
                        <span className="ml-2 text-gray-700">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Under ₹1,000', value: '0-1000' },
                      { label: '₹1,000 - ₹2,500', value: '1000-2500' },
                      { label: '₹2,500 - ₹5,000', value: '2500-5000' },
                      { label: 'Over ₹5,000', value: '5000-' },
                    ].map((range) => (
                      <label key={range.value} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="priceRange"
                          checked={filters.priceRange === range.value}
                          onChange={() => setFilters({ ...filters, priceRange: range.value })}
                          className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-full"
                        />
                        <span className="ml-2 text-gray-700">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Ratings */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Rating</h3>
                  <div className="space-y-3">
                    {[4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          checked={filters.rating === rating}
                          onChange={() => setFilters({ ...filters, rating })}
                          className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-full"
                        />
                        <div className="ml-2 flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                            />
                          ))}
                          <span className="ml-1 text-gray-700">& Up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={resetFilters}
                    className="flex-1 py-2 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Reset
                  </button>
                  <button
                    onClick={toggleFilters}
                    className="flex-1 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Products Grid/List */}
          <div className="flex-grow">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium mb-2">No Products Found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria.</p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : view === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="group"
                  >
                    <div className="bg-gray-100 rounded-lg overflow-hidden aspect-[3/4] mb-3">
                      <img
                        src={product.variants[0].images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center mb-1">
                      <div className="flex text-yellow-400 mr-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">({product.reviews})</span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="font-medium text-gray-900">
                        ₹{product.variants[0].price.toLocaleString('en-IN')}
                      </span>
                      {product.variants[0].compareAtPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ₹{product.variants[0].compareAtPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="flex flex-col sm:flex-row group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="sm:w-48 h-48 bg-gray-100 flex-shrink-0">
                      <img
                        src={product.variants[0].images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 flex-grow">
                      <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                        {product.name}
                      </h3>
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400 mr-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="mt-auto">
                        <div className="flex items-baseline">
                          <span className="font-medium text-gray-900">
                            ₹{product.variants[0].price.toLocaleString('en-IN')}
                          </span>
                          {product.variants[0].compareAtPrice && (
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              ₹{product.variants[0].compareAtPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;