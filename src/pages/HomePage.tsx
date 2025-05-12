import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, TrendingUp, Shield, Truck } from 'lucide-react';
import { dummyProductData } from '../data/dummyData';

const HomePage: React.FC = () => {
  // Get 4 featured products
  const featuredProducts = dummyProductData.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1600)', 
            opacity: 0.5 
          }}
        ></div>
        
        <div className="relative container mx-auto px-4 py-32">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Summer Collections 2025</h1>
            <p className="text-lg mb-8">
              Discover the latest trends and styles for the summer season. Refresh your wardrobe with our premium quality clothing.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/shop" 
                className="px-6 py-3 bg-white text-gray-900 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </Link>
              <Link 
                to="/collections" 
                className="px-6 py-3 border border-white text-white rounded-md font-medium hover:bg-white hover:text-gray-900 transition-colors"
              >
                View Collections
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center p-6 bg-white rounded-lg shadow-sm">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Truck className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Free Shipping</h3>
                <p className="text-sm text-gray-600">On orders over ₹2,000</p>
              </div>
            </div>
            
            <div className="flex items-center p-6 bg-white rounded-lg shadow-sm">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Shield className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Secure Payments</h3>
                <p className="text-sm text-gray-600">100% secure transactions</p>
              </div>
            </div>
            
            <div className="flex items-center p-6 bg-white rounded-lg shadow-sm">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Premium Quality</h3>
                <p className="text-sm text-gray-600">Handpicked premium products</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link to="/shop" className="text-blue-600 hover:text-blue-800 flex items-center">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`}
                className="group"
              >
                <div className="bg-gray-100 rounded-lg overflow-hidden aspect-[3/4] mb-4">
                  <img
                    src={product.variants[0].images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400 mr-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>
                <p className="mt-1 font-medium">₹{product.variants[0].price.toLocaleString('en-IN')}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Banners */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative rounded-lg overflow-hidden h-80 group">
              <img
                src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
                alt="Men's Collection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Men's Collection</h3>
                <p className="text-sm mb-4 text-center">Discover our range of premium men's clothing and accessories.</p>
                <Link 
                  to="/collections"
                  className="px-6 py-2 bg-white text-gray-900 rounded-md font-medium hover:bg-gray-100 transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            
            <div className="relative rounded-lg overflow-hidden h-80 group">
              <img
                src="https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
                alt="Women's Collection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Women's Collection</h3>
                <p className="text-sm mb-4 text-center">Explore the latest women's fashion for every occasion.</p>
                <Link 
                  to="/collections"
                  className="px-6 py-2 bg-white text-gray-900 rounded-md font-medium hover:bg-gray-100 transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3">Sign Up for Our Newsletter</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new collections, seasonal sales, and exclusive offers.
          </p>
          
          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-l-md focus:outline-none text-gray-900"
            />
            <button
              type="submit"
              className="bg-gray-900 hover:bg-gray-800 px-6 py-3 rounded-r-md font-medium transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "The quality of the products exceeded my expectations. The cotton t-shirt I purchased is so comfortable and has held up well after multiple washes."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
                <div>
                  <h4 className="font-medium">Arjun Patel</h4>
                  <p className="text-sm text-gray-500">Mumbai</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Fast shipping and excellent customer service. I had a question about sizing and received a helpful response right away. Will definitely shop here again!"
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
                <div>
                  <h4 className="font-medium">Priya Sharma</h4>
                  <p className="text-sm text-gray-500">Delhi</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={i < 4 ? "currentColor" : "none"} />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "I love the variety of styles available. The jeans fit perfectly and the leather belt is of exceptional quality. Great value for the price."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
                <div>
                  <h4 className="font-medium">Vikram Mehta</h4>
                  <p className="text-sm text-gray-500">Bangalore</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;