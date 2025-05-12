import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CollectionsPage: React.FC = () => {
  const collections = [
    {
      id: 'summer-2025',
      name: 'Summer Collection 2025',
      description: 'Lightweight fabrics and breathable designs perfect for the summer heat.',
      image: 'https://images.pexels.com/photos/1108680/pexels-photo-1108680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      products: 24,
    },
    {
      id: 'essentials',
      name: 'Wardrobe Essentials',
      description: 'Timeless pieces that form the foundation of every wardrobe.',
      image: 'https://images.pexels.com/photos/6347919/pexels-photo-6347919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      products: 18,
    },
    {
      id: 'formal',
      name: 'Formal Wear',
      description: 'Sophisticated clothing for professional settings and special occasions.',
      image: 'https://images.pexels.com/photos/6598938/pexels-photo-6598938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      products: 15,
    },
    {
      id: 'activewear',
      name: 'Performance Activewear',
      description: 'Technical fabrics designed for comfort during your workouts.',
      image: 'https://images.pexels.com/photos/2994122/pexels-photo-2994122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      products: 20,
    },
    {
      id: 'accessories',
      name: 'Premium Accessories',
      description: 'Elevate your outfits with our carefully curated accessories.',
      image: 'https://images.pexels.com/photos/6046227/pexels-photo-6046227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      products: 30,
    },
    {
      id: 'casual',
      name: 'Weekend Casual',
      description: 'Comfortable yet stylish pieces perfect for your off-duty days.',
      image: 'https://images.pexels.com/photos/2682289/pexels-photo-2682289.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      products: 22,
    },
  ];

  const featuredCollections = collections.slice(0, 2);
  const otherCollections = collections.slice(2);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative pt-16 pb-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-blue-50"
          aria-hidden="true"
        ></div>
        <div className="relative container mx-auto px-4">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="mb-8 lg:mb-0 lg:pr-8">
              <div className="max-w-md mx-auto lg:max-w-none lg:mx-0">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                  Discover Our Collections
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Explore our carefully curated collections, each thoughtfully designed to showcase the latest trends and timeless classics.
                </p>
                <Link
                  to="/shop"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Shop All Products
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-lg">
                <div className="relative rounded-lg overflow-hidden shadow-xl">
                  <img
                    className="w-full h-auto"
                    src="https://images.pexels.com/photos/6214329/pexels-photo-6214329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Collections showcase"
                  />
                  <div className="absolute inset-0 bg-gray-900 bg-opacity-20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Collections */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Collections</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {featuredCollections.map((collection) => (
            <div key={collection.id} className="relative">
              <div className="aspect-w-16 aspect-h-9 lg:aspect-h-7 overflow-hidden rounded-lg">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-90"></div>
              </div>
              <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-white mb-2">{collection.name}</h3>
                <p className="text-gray-200 mb-4 max-w-md">{collection.description}</p>
                <p className="text-sm text-gray-300 mb-4">{collection.products} products</p>
                <Link
                  to={`/shop?collection=${collection.id}`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  View Collection
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Other Collections */}
        <h2 className="text-2xl font-bold mb-8">All Collections</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherCollections.map((collection) => (
            <Link 
              key={collection.id} 
              to={`/shop?collection=${collection.id}`}
              className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                  {collection.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{collection.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{collection.products} products</span>
                  <span className="text-blue-600 inline-flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform">
                    Explore <ArrowRight size={16} className="ml-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Seasonal Collection Banner */}
        <div className="mt-16 relative overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-700 opacity-90"></div>
          <img
            src="https://images.pexels.com/photos/2300334/pexels-photo-2300334.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Seasonal collection"
            className="w-full h-full object-cover"
          />
          <div className="relative px-8 py-12 md:py-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Limited Edition Seasonal Collection</h2>
            <p className="text-gray-100 text-lg mb-8">
              Discover our exclusive seasonal collection before it's gone. Limited quantities available.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;