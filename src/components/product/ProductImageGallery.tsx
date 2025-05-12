import React, { useState } from 'react';
import { ChevronUp, ChevronDown, ZoomIn } from 'lucide-react';

interface ProductImageGalleryProps {
  images: string[];
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handlePrevious = () => {
    setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleZoomMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!showZoom) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Thumbnails - Vertical Column */}
      <div className="col-span-2 order-1 hidden sm:block">
        <div className="relative max-h-[500px] overflow-auto scrollbar-hide flex flex-col space-y-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`border rounded-md overflow-hidden transition ${
                currentImageIndex === index
                  ? 'border-blue-600 ring-1 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleThumbnailClick(index)}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={image}
                alt={`Product thumbnail ${index + 1}`}
                className="w-full h-auto object-cover aspect-square"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Main Image */}
      <div 
        className="col-span-12 sm:col-span-10 order-3 sm:order-2 relative"
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        onMouseMove={handleZoomMove}
      >
        <div className="relative overflow-hidden rounded-lg border border-gray-200 aspect-square">
          <img
            src={images[currentImageIndex]}
            alt="Product"
            className="w-full h-full object-cover"
          />
          
          {/* Zoom icon indicator */}
          <div className="absolute top-4 right-4 bg-white/70 p-2 rounded-full">
            <ZoomIn size={20} className="text-gray-700" />
          </div>
          
          {/* Zoom view */}
          {showZoom && (
            <div 
              className="absolute inset-0 bg-no-repeat pointer-events-none z-10"
              style={{
                backgroundImage: `url(${images[currentImageIndex]})`,
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                backgroundSize: '200%'
              }}
            ></div>
          )}
        </div>
        
        {/* Navigation buttons for small screens */}
        <div className="mt-4 flex justify-between sm:hidden">
          <button 
            className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
            onClick={handlePrevious}
            aria-label="Previous image"
          >
            <ChevronUp className="rotate-90" size={16} />
          </button>
          
          <button 
            className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
            onClick={handleNext}
            aria-label="Next image"
          >
            <ChevronDown className="rotate-90" size={16} />
          </button>
        </div>
      </div>

      {/* Thumbnails - Horizontal Row (Mobile) */}
      <div className="col-span-12 order-2 sm:hidden">
        <div className="flex space-x-2 overflow-x-auto py-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`min-w-[60px] border rounded-md overflow-hidden ${
                currentImageIndex === index
                  ? 'border-blue-600 ring-1 ring-blue-200'
                  : 'border-gray-200'
              }`}
              onClick={() => handleThumbnailClick(index)}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={image}
                alt={`Product thumbnail ${index + 1}`}
                className="w-full h-auto object-cover aspect-square"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImageGallery;