import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import ProductImageGallery from '../components/product/ProductImageGallery';
import SizeChartModal from '../components/product/SizeChartModal';
import ColorCompareModal from '../components/product/ColorCompareModal';
import ProductTabs from '../components/product/ProductTabs';
import RelatedProducts from '../components/product/RelatedProducts';
import ComplementaryProducts from '../components/product/ComplementaryProducts';
import ProductBundle from '../components/product/ProductBundle';
import { dummyProductData } from '../data/dummyData';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [showColorCompare, setShowColorCompare] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  // Fetch product data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const fetchedProduct = dummyProductData.find(p => p.id === id) || dummyProductData[0];
      setProduct(fetchedProduct);
      setSelectedColor(fetchedProduct.variants[0].color);
      setSelectedSize(fetchedProduct.sizes[0]);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
        <p>Sorry, we couldn't find the product you're looking for.</p>
      </div>
    );
  }

  const currentVariant = product.variants.find((v: any) => v.color === selectedColor);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) return;

    setAddingToCart(true);
    
    // Create cart item
    const cartItem = {
      productId: product.id,
      name: product.name,
      variant: {
        id: currentVariant.id,
        color: selectedColor,
        size: selectedSize,
        price: currentVariant.price,
      },
      quantity,
      image: currentVariant.images[0],
    };

    // Add to cart
    addItem(cartItem);
    
    // Reset adding state after a short delay
    setTimeout(() => {
      setAddingToCart(false);
    }, 1000);
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="text-sm mb-8">
          <ol className="flex items-center space-x-2">
            <li><a href="/" className="text-gray-500 hover:text-gray-700">Home</a></li>
            <li><span className="text-gray-400 mx-1">/</span></li>
            <li><a href="/collections" className="text-gray-500 hover:text-gray-700">Collections</a></li>
            <li><span className="text-gray-400 mx-1">/</span></li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <ProductImageGallery images={currentVariant.images} />

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            {/* Reviews */}
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < product.rating ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-gray-500 text-sm">({product.reviews} reviews)</span>
            </div>
            
            {/* Price */}
            <div className="mb-6">
              <p className="text-2xl font-semibold text-gray-900">
                ₹{currentVariant.price.toLocaleString('en-IN')}
              </p>
              {currentVariant.compareAtPrice && (
                <p className="text-sm text-gray-500 line-through mt-1">
                  ₹{currentVariant.compareAtPrice.toLocaleString('en-IN')}
                </p>
              )}
            </div>
            
            {/* Color Options */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-900">Color: {selectedColor}</h3>
                <button 
                  onClick={() => setShowColorCompare(true)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Compare Colors
                </button>
              </div>
              <div className="flex space-x-3">
                {product.variants.map((variant: any) => (
                  <button
                    key={variant.id}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === variant.color 
                        ? 'border-blue-600 ring-2 ring-blue-200' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: variant.colorHex }}
                    onClick={() => setSelectedColor(variant.color)}
                    aria-label={variant.color}
                  ></button>
                ))}
              </div>
            </div>
            
            {/* Size Options */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <button 
                  onClick={() => setShowSizeChart(true)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Size Chart
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    className={`py-2 text-center border rounded-md transition-colors ${
                      selectedSize === size
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-900 border-gray-300 hover:border-gray-900'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity and Add to Cart */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex border border-gray-300 rounded-md">
                  <button 
                    className="px-3 py-2 border-r border-gray-300 hover:bg-gray-100 transition-colors"
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    aria-label="Decrease quantity"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    min="1"
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-center p-2 focus:outline-none"
                  />
                  <button 
                    className="px-3 py-2 border-l border-gray-300 hover:bg-gray-100 transition-colors"
                    onClick={() => setQuantity(prev => prev + 1)}
                    aria-label="Increase quantity"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
                
                <button
                  className={`flex-grow py-3 px-6 bg-gray-900 text-white rounded-md font-medium 
                    hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                    transition-all ${addingToCart ? 'opacity-75' : ''}`}
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                >
                  {addingToCart ? 'Adding...' : 'Add to Cart'}
                </button>
              </div>
            </div>
            
            {/* Shipping Information */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-center">
                <Truck size={20} className="text-gray-500 mr-3" />
                <p className="text-sm text-gray-600">Free shipping on orders over ₹2,000</p>
              </div>
              <div className="flex items-center">
                <ShieldCheck size={20} className="text-gray-500 mr-3" />
                <p className="text-sm text-gray-600">1-year warranty on all products</p>
              </div>
              <div className="flex items-center">
                <RefreshCw size={20} className="text-gray-500 mr-3" />
                <p className="text-sm text-gray-600">30-day easy returns</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Bundle */}
        <ProductBundle mainProduct={product} selectedVariant={currentVariant} />
        
        {/* Product Tabs */}
        <div className="mb-16">
          <ProductTabs product={product} />
        </div>
        
        {/* Complementary Products */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Pairs Well With</h2>
          <ComplementaryProducts productId={product.id} />
        </div>
        
        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
          <RelatedProducts productId={product.id} />
        </div>
      </div>

      {/* Modals */}
      {showSizeChart && (
        <SizeChartModal onClose={() => setShowSizeChart(false)} />
      )}
      
      {showColorCompare && (
        <ColorCompareModal 
          colors={product.variants.map((v: any) => ({ 
            name: v.color, 
            hex: v.colorHex 
          }))}
          onClose={() => setShowColorCompare(false)}
        />
      )}
    </div>
  );
};

export default ProductPage;