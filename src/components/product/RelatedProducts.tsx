import React from 'react';
import { Link } from 'react-router-dom';
import { relatedProducts } from '../../data/dummyData';

interface RelatedProductsProps {
  productId: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ productId }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {relatedProducts.map((product) => (
        <div key={product.id} className="group">
          <Link to={`/product/${product.id}`} className="block">
            <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover aspect-[3/4] group-hover:scale-105 transition-transform duration-300"
              />
              {product.badge && (
                <span className={`absolute top-2 right-2 text-xs font-medium px-2 py-1 rounded ${
                  product.badge === 'Sale' 
                    ? 'bg-red-500 text-white' 
                    : product.badge === 'New' 
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-500 text-white'
                }`}>
                  {product.badge}
                </span>
              )}
            </div>
          </Link>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-1">
              <Link to={`/product/${product.id}`} className="hover:text-blue-600 transition-colors">
                {product.name}
              </Link>
            </h3>
            <div className="flex items-baseline">
              <span className="text-gray-900 font-medium">₹{product.price.toLocaleString('en-IN')}</span>
              {product.compareAtPrice && (
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ₹{product.compareAtPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelatedProducts;