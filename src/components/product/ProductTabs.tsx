import React, { useState } from 'react';

interface ProductTabsProps {
  product: any;
}

const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="border-t border-gray-200">
      {/* Tab Buttons */}
      <div className="flex border-b border-gray-200">
        <button
          className={`py-4 px-6 text-sm font-medium transition-colors focus:outline-none ${
            activeTab === 'description'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('description')}
        >
          Description
        </button>
        <button
          className={`py-4 px-6 text-sm font-medium transition-colors focus:outline-none ${
            activeTab === 'information'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('information')}
        >
          Product Information
        </button>
        <button
          className={`py-4 px-6 text-sm font-medium transition-colors focus:outline-none ${
            activeTab === 'shipping'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('shipping')}
        >
          Shipping Details
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="py-6">
        {/* Description Tab */}
        <div className={activeTab === 'description' ? 'block' : 'hidden'}>
          <div className="prose max-w-none">
            <p className="mb-4">
              {product.description}
            </p>
            <p className="mb-4">
              Crafted with premium materials, this product combines style and functionality for the modern consumer. The attention to detail is evident in every stitch and feature, ensuring a product that not only looks good but is built to last.
            </p>
            <h3 className="text-lg font-medium mb-3">Key Features:</h3>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>Premium quality materials for durability</li>
              <li>Designed for comfort and functionality</li>
              <li>Versatile style suitable for multiple occasions</li>
              <li>Available in multiple colors and sizes</li>
              <li>Easy care - machine washable</li>
            </ul>
            <p>
              Whether you're dressing up for a special occasion or looking for everyday comfort, this product is a perfect addition to your collection.
            </p>
          </div>
        </div>
        
        {/* Product Information Tab */}
        <div className={activeTab === 'information' ? 'block' : 'hidden'}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Materials & Composition</h3>
              <ul className="space-y-3">
                <li className="flex">
                  <span className="font-medium w-32">Main Fabric:</span>
                  <span className="text-gray-600">{product.materials?.main || '100% Cotton'}</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32">Secondary:</span>
                  <span className="text-gray-600">{product.materials?.secondary || '5% Elastane'}</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32">Lining:</span>
                  <span className="text-gray-600">{product.materials?.lining || '100% Polyester'}</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32">Origin:</span>
                  <span className="text-gray-600">Made in India</span>
                </li>
              </ul>
              
              <h3 className="text-lg font-medium mt-8 mb-4">Care Instructions</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Machine wash at 30°C</li>
                <li>Do not bleach</li>
                <li>Iron at medium temperature</li>
                <li>Do not dry clean</li>
                <li>Tumble dry low</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Product Specifications</h3>
              <ul className="space-y-3">
                <li className="flex">
                  <span className="font-medium w-32">Product ID:</span>
                  <span className="text-gray-600">{product.id}</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32">Model Height:</span>
                  <span className="text-gray-600">180cm / 5'11"</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32">Model Size:</span>
                  <span className="text-gray-600">Medium</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32">Weight:</span>
                  <span className="text-gray-600">350g</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32">Collection:</span>
                  <span className="text-gray-600">Spring/Summer 2025</span>
                </li>
              </ul>
              
              <h3 className="text-lg font-medium mt-8 mb-4">Sustainability</h3>
              <p className="text-gray-600 mb-3">
                This product is made with eco-friendly materials and produced in facilities that uphold fair labor practices.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">Eco-friendly</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">Fair Trade</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">Recyclable Packaging</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Shipping Tab */}
        <div className={activeTab === 'shipping' ? 'block' : 'hidden'}>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Delivery Options</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <div>
                    <p className="font-medium">Standard Shipping</p>
                    <p className="text-sm text-gray-600">3-5 business days</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹150</p>
                    <p className="text-sm text-green-600">Free over ₹2,000</p>
                  </div>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <div>
                    <p className="font-medium">Express Shipping</p>
                    <p className="text-sm text-gray-600">1-2 business days</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹350</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Same-day Delivery</p>
                    <p className="text-sm text-gray-600">Available in select cities</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹500</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Shipping Policy</h3>
              <p className="text-gray-600 mb-4">
                We process all orders within 1-2 business days. Orders placed after 2 PM IST may be processed the next business day. Shipping time is in addition to this processing time.
              </p>
              <p className="text-gray-600">
                International shipping is available for select countries. Please note that additional customs fees, taxes, and duties may apply for international orders and are the responsibility of the customer.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Returns & Exchanges</h3>
              <p className="text-gray-600 mb-4">
                We offer a 30-day return policy for items in their original condition with tags attached. Returns are free for customers within India.
              </p>
              <p className="text-gray-600">
                To initiate a return or exchange, please contact our customer service team or visit your order history in your account.
              </p>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <h4 className="font-medium text-yellow-800 mb-1">COVID-19 Update</h4>
              <p className="text-sm text-yellow-700">
                Due to the ongoing situation, there might be slight delays in delivery and processing times. We appreciate your patience and understanding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;