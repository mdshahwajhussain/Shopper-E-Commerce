import React, { useState } from 'react';
import { Check, ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { bundleProducts } from '../../data/dummyData';

interface ProductBundleProps {
  mainProduct: any;
  selectedVariant: any;
}

const ProductBundle: React.FC<ProductBundleProps> = ({ mainProduct, selectedVariant }) => {
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);

  // Calculate bundle price (with 10% discount)
  const regularTotal = bundleProducts.reduce((sum, item) => sum + item.price, 0);
  const discountedTotal = Math.floor(regularTotal * 0.9);
  const savedAmount = regularTotal - discountedTotal;

  const handleAddBundle = () => {
    setAdding(true);
    
    // Add each item in the bundle to cart
    bundleProducts.forEach(product => {
      addItem({
        productId: product.id,
        name: product.name,
        variant: {
          id: product.id,
          color: 'Default',
          size: 'M',
          price: product.id === mainProduct.id ? selectedVariant.price : product.price,
        },
        quantity: 1,
        image: product.id === mainProduct.id ? selectedVariant.images[0] : product.image,
      });
    });
    
    setTimeout(() => {
      setAdding(false);
    }, 1000);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 mb-16 bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete the Look</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {bundleProducts.map((product) => (
          <div key={product.id} className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-md overflow-hidden bg-white border border-gray-200">
              <img
                src={product.id === mainProduct.id ? selectedVariant.images[0] : product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{product.name}</h3>
              <p className="text-gray-600">
                ₹{(product.id === mainProduct.id ? selectedVariant.price : product.price).toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <div className="flex flex-wrap items-center justify-between mb-4">
          <div>
            <p className="text-gray-500 mb-1">Bundle Price (10% off)</p>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">₹{discountedTotal.toLocaleString('en-IN')}</span>
              <span className="text-sm text-gray-500 line-through">₹{regularTotal.toLocaleString('en-IN')}</span>
              <span className="text-sm text-green-600">Save ₹{savedAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
          
          <button
            className={`mt-4 sm:mt-0 w-full sm:w-auto flex items-center justify-center space-x-2 py-3 px-6 
            bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition-colors
            focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${adding ? 'opacity-75' : ''}`}
            onClick={handleAddBundle}
            disabled={adding}
          >
            {adding ? (
              <>
                <Check size={20} />
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <ShoppingCart size={20} />
                <span>Add Bundle to Cart</span>
              </>
            )}
          </button>
        </div>
        
        <p className="text-sm text-gray-500">
          *Buy these items together for a complete look and save 10% on your purchase.
        </p>
      </div>
    </div>
  );
};

export default ProductBundle;