import React from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { complementaryProducts } from '../../data/dummyData';

interface ComplementaryProductsProps {
  productId: string;
}

const ComplementaryProducts: React.FC<ComplementaryProductsProps> = ({ productId }) => {
  const { addItem } = useCart();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 300;
      
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const handleAddToCart = (product: any) => {
    addItem({
      productId: product.id,
      name: product.name,
      variant: {
        id: product.id,
        color: 'Default',
        size: 'One Size',
        price: product.price,
      },
      quantity: 1,
      image: product.image,
    });
  };

  return (
    <div className="relative">
      {/* Scroll Buttons */}
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
        onClick={() => scroll('left')}
        aria-label="Scroll left"
      >
        <ChevronLeft size={20} />
      </button>
      
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
        onClick={() => scroll('right')}
        aria-label="Scroll right"
      >
        <ChevronRight size={20} />
      </button>
      
      {/* Products Scroll Area */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide gap-6 py-4 px-2 -mx-2 scroll-smooth"
      >
        {complementaryProducts.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-56">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative pb-[100%] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform hover:scale-105 duration-300"
                />
                {product.badge && (
                  <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded">
                    {product.badge}
                  </span>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-1 truncate">{product.name}</h3>
                <p className="text-gray-900 mb-3">₹{product.price.toLocaleString('en-IN')}</p>
                <button
                  className="w-full flex items-center justify-center space-x-1 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart size={16} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplementaryProducts;