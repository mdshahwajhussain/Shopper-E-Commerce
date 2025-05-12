import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface SizeChartModalProps {
  onClose: () => void;
}

const SizeChartModal: React.FC<SizeChartModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-auto animate-fadeIn"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Size Chart</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close size chart"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">How to Measure</h3>
            <p className="text-gray-600 mb-4">
              To choose the correct size, please refer to our size chart below. Measurements are in centimeters (cm).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium mb-2">Chest</h4>
                <p className="text-sm text-gray-600">
                  Measure around the fullest part of your chest, keeping the measuring tape horizontal.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium mb-2">Waist</h4>
                <p className="text-sm text-gray-600">
                  Measure around your natural waistline, keeping the tape comfortably loose.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium mb-2">Hips</h4>
                <p className="text-sm text-gray-600">
                  Measure around the fullest part of your hips, about 8" below your waistline.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium mb-2">Inseam</h4>
                <p className="text-sm text-gray-600">
                  Measure from your crotch to the bottom of your ankle.
                </p>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 border border-gray-200">Size</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-900 border border-gray-200">Chest (cm)</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-900 border border-gray-200">Waist (cm)</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-900 border border-gray-200">Hips (cm)</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-900 border border-gray-200">Standard Size</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3 border border-gray-200 font-medium">XS</td>
                  <td className="px-4 py-3 text-center border border-gray-200">84-88</td>
                  <td className="px-4 py-3 text-center border border-gray-200">68-72</td>
                  <td className="px-4 py-3 text-center border border-gray-200">92-96</td>
                  <td className="px-4 py-3 text-center border border-gray-200">36-38</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 border border-gray-200 font-medium">S</td>
                  <td className="px-4 py-3 text-center border border-gray-200">88-92</td>
                  <td className="px-4 py-3 text-center border border-gray-200">72-76</td>
                  <td className="px-4 py-3 text-center border border-gray-200">96-100</td>
                  <td className="px-4 py-3 text-center border border-gray-200">38-40</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border border-gray-200 font-medium">M</td>
                  <td className="px-4 py-3 text-center border border-gray-200">92-96</td>
                  <td className="px-4 py-3 text-center border border-gray-200">76-80</td>
                  <td className="px-4 py-3 text-center border border-gray-200">100-104</td>
                  <td className="px-4 py-3 text-center border border-gray-200">40-42</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 border border-gray-200 font-medium">L</td>
                  <td className="px-4 py-3 text-center border border-gray-200">96-100</td>
                  <td className="px-4 py-3 text-center border border-gray-200">80-84</td>
                  <td className="px-4 py-3 text-center border border-gray-200">104-108</td>
                  <td className="px-4 py-3 text-center border border-gray-200">42-44</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border border-gray-200 font-medium">XL</td>
                  <td className="px-4 py-3 text-center border border-gray-200">100-104</td>
                  <td className="px-4 py-3 text-center border border-gray-200">84-88</td>
                  <td className="px-4 py-3 text-center border border-gray-200">108-112</td>
                  <td className="px-4 py-3 text-center border border-gray-200">44-46</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 border border-gray-200 font-medium">XXL</td>
                  <td className="px-4 py-3 text-center border border-gray-200">104-108</td>
                  <td className="px-4 py-3 text-center border border-gray-200">88-92</td>
                  <td className="px-4 py-3 text-center border border-gray-200">112-116</td>
                  <td className="px-4 py-3 text-center border border-gray-200">46-48</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 text-sm text-gray-500">
            <p>Note: These measurements are a general guide. Fit may vary depending on the cut and style of the garment.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeChartModal;