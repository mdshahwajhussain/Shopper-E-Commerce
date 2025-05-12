import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

interface Color {
  name: string;
  hex: string;
}

interface ColorCompareModalProps {
  colors: Color[];
  onClose: () => void;
}

const ColorCompareModal: React.FC<ColorCompareModalProps> = ({ colors, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  useEffect(() => {
    // Initially select the first two colors
    if (colors.length >= 2) {
      setSelectedColors([colors[0].name, colors[1].name]);
    } else if (colors.length === 1) {
      setSelectedColors([colors[0].name]);
    }
  }, [colors]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    document.addEventListener('mousedown', handleClickOutside);

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const toggleColorSelection = (colorName: string) => {
    if (selectedColors.includes(colorName)) {
      // Remove if already selected
      setSelectedColors(selectedColors.filter(name => name !== colorName));
    } else {
      // Add if not selected (limit to 3 colors max)
      if (selectedColors.length < 3) {
        setSelectedColors([...selectedColors, colorName]);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl animate-fadeIn"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Compare Colors</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close color comparison"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Select up to 3 colors to compare</h3>
            <div className="flex flex-wrap gap-3">
              {colors.map((color) => (
                <button
                  key={color.name}
                  className={`flex items-center space-x-2 border rounded-full px-3 py-1.5 transition-colors ${
                    selectedColors.includes(color.name)
                      ? 'bg-blue-50 border-blue-300'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => toggleColorSelection(color.name)}
                >
                  <span 
                    className="w-4 h-4 rounded-full inline-block" 
                    style={{ backgroundColor: color.hex }}
                  ></span>
                  <span className="text-sm">{color.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          {selectedColors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedColors.map((colorName) => {
                const color = colors.find(c => c.name === colorName);
                if (!color) return null;
                
                return (
                  <div key={color.name} className="flex flex-col items-center">
                    <div 
                      className="w-32 h-32 rounded-full mb-4"
                      style={{ backgroundColor: color.hex }}
                    ></div>
                    <h4 className="font-medium text-gray-900">{color.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">{color.hex}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Select at least one color to compare
            </div>
          )}
          
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Colors Side by Side</h3>
            <div className="h-24 rounded-lg overflow-hidden flex">
              {selectedColors.map((colorName, index) => {
                const color = colors.find(c => c.name === colorName);
                if (!color) return null;
                
                return (
                  <div 
                    key={color.name}
                    className="flex-1 flex items-end justify-center p-3"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span className={`text-xs font-medium px-2 py-1 rounded bg-white/80 ${
                      isLightColor(color.hex) ? 'text-gray-900' : 'text-white'
                    }`}>
                      {color.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to determine if a color is light or dark
function isLightColor(color: string): boolean {
  // Convert hex to RGB
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate perceived brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  return brightness > 128;
}

export default ColorCompareModal;