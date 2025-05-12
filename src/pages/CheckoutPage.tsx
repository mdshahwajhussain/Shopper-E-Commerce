import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ChevronLeft, ChevronRight, CreditCard, DollarSign, Smartphone } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const CheckoutPage: React.FC = () => {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    nameOnCard: '',
    expiry: '',
    cvv: '',
  });
  const [upiInfo, setUpiInfo] = useState({
    upiId: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleCardInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleUpiInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpiInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const validateShippingInfo = () => {
    if (!shippingInfo.fullName || !shippingInfo.email || !shippingInfo.address || 
        !shippingInfo.city || !shippingInfo.state || !shippingInfo.pincode || !shippingInfo.phone) {
      setError('Please fill in all fields');
      return false;
    }
    
    if (!/^\d{6}$/.test(shippingInfo.pincode)) {
      setError('Please enter a valid 6-digit pincode');
      return false;
    }
    
    if (!/^\d{10}$/.test(shippingInfo.phone)) {
      setError('Please enter a valid 10-digit phone number');
      return false;
    }
    
    setError(null);
    return true;
  };

  const validatePaymentInfo = () => {
    if (paymentMethod === 'card') {
      if (!cardInfo.cardNumber || !cardInfo.nameOnCard || !cardInfo.expiry || !cardInfo.cvv) {
        setError('Please fill in all card details');
        return false;
      }
      
      if (!/^\d{16}$/.test(cardInfo.cardNumber.replace(/\s/g, ''))) {
        setError('Please enter a valid 16-digit card number');
        return false;
      }
      
      if (!/^\d{3,4}$/.test(cardInfo.cvv)) {
        setError('Please enter a valid CVV');
        return false;
      }
    } else if (paymentMethod === 'upi') {
      if (!upiInfo.upiId) {
        setError('Please enter your UPI ID');
        return false;
      }
      
      if (!/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z][a-zA-Z]{2,64}$/i.test(upiInfo.upiId)) {
        setError('Please enter a valid UPI ID (e.g., name@upi)');
        return false;
      }
    }
    
    setError(null);
    return true;
  };

  const handleContinue = () => {
    if (step === 1) {
      if (validateShippingInfo()) {
        setStep(2);
      }
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handlePlaceOrder = () => {
    if (!validatePaymentInfo()) return;
    
    setLoading(true);
    setError(null);
    
    // Simulate order processing
    setTimeout(() => {
      // Save order in localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const newOrder = {
        id: `ORD${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toISOString(),
        items,
        total: totalPrice,
        shippingInfo,
        paymentMethod,
        status: 'Order Placed',
        trackingNumber: `TRK${Math.floor(1000000 + Math.random() * 9000000)}`,
      };
      
      localStorage.setItem('orders', JSON.stringify([...orders, newOrder]));
      
      // Clear cart and redirect to confirmation
      clearCart();
      setLoading(false);
      navigate('/order-tracking');
    }, 1500);
  };

  // If cart is empty, show message
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Checkout Steps */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className={`flex-1 flex flex-col items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              1
            </div>
            <span className="mt-2 text-sm font-medium">Shipping</span>
          </div>
          <div className={`flex-1 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`flex-1 flex flex-col items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
            <span className="mt-2 text-sm font-medium">Payment</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Summary */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Cart Items</h2>
                
                <div className="border rounded-lg overflow-hidden mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center p-4 border-b last:border-b-0">
                      <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="ml-4 flex-grow">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          {item.variant.color}, {item.variant.size}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center">
                            <button
                              className="p-1 rounded-md border border-gray-300 hover:bg-gray-100"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                            >
                              <ChevronLeft size={16} />
                            </button>
                            <span className="mx-2">{item.quantity}</span>
                            <button
                              className="p-1 rounded-md border border-gray-300 hover:bg-gray-100"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              <ChevronRight size={16} />
                            </button>
                          </div>
                          <span className="font-medium">
                            ₹{(item.variant.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                      
                      <button
                        className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
                
                <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
                
                {error && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                    {error}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={shippingInfo.fullName}
                      onChange={handleShippingInfoChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleShippingInfoChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingInfoChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingInfoChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleShippingInfoChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={shippingInfo.pincode}
                      onChange={handleShippingInfoChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      maxLength={6}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleShippingInfoChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      maxLength={10}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={handleContinue}
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                
                {error && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                    {error}
                  </div>
                )}
                
                <div className="mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        paymentMethod === 'card' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <div className="flex items-center mb-2">
                        <CreditCard className="text-gray-700 mr-2" size={20} />
                        <span className="font-medium">Credit/Debit Card</span>
                      </div>
                      <p className="text-sm text-gray-500">Secure payment via card</p>
                    </div>
                    
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        paymentMethod === 'upi' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => setPaymentMethod('upi')}
                    >
                      <div className="flex items-center mb-2">
                        <Smartphone className="text-gray-700 mr-2" size={20} />
                        <span className="font-medium">UPI Payment</span>
                      </div>
                      <p className="text-sm text-gray-500">Pay using UPI ID</p>
                    </div>
                    
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        paymentMethod === 'cod' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => setPaymentMethod('cod')}
                    >
                      <div className="flex items-center mb-2">
                        <DollarSign className="text-gray-700 mr-2" size={20} />
                        <span className="font-medium">Cash on Delivery</span>
                      </div>
                      <p className="text-sm text-gray-500">Pay when you receive</p>
                    </div>
                  </div>
                </div>
                
                {/* Payment Form based on selected method */}
                {paymentMethod === 'card' && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Card Details</h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={cardInfo.cardNumber}
                          onChange={handleCardInfoChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          name="nameOnCard"
                          value={cardInfo.nameOnCard}
                          onChange={handleCardInfoChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            name="expiry"
                            value={cardInfo.expiry}
                            onChange={handleCardInfoChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="password"
                            name="cvv"
                            value={cardInfo.cvv}
                            onChange={handleCardInfoChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="123"
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'upi' && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">UPI Details</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        UPI ID
                      </label>
                      <input
                        type="text"
                        name="upiId"
                        value={upiInfo.upiId}
                        onChange={handleUpiInfoChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="name@upi"
                      />
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'cod' && (
                  <div className="mb-6">
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-yellow-700">
                            Cash on Delivery will be collected at the time of delivery. Please have the exact amount ready.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <button
                    className="px-6 py-3 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition-colors"
                    onClick={handleBack}
                  >
                    Back to Shipping
                  </button>
                  
                  <button
                    className={`px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                    onClick={handlePlaceOrder}
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 sticky top-20">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">
                        {item.name} <span className="text-gray-500">x{item.quantity}</span>
                      </p>
                    </div>
                    <p className="text-sm font-medium">
                      ₹{(item.variant.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="font-medium">₹{totalPrice.toLocaleString('en-IN')}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Shipping</p>
                  <p className="font-medium">
                    {totalPrice > 2000 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `₹150`
                    )}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Tax</p>
                  <p className="font-medium">₹{Math.round(totalPrice * 0.18).toLocaleString('en-IN')}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <p>Total</p>
                  <p>
                    ₹{(
                      totalPrice +
                      (totalPrice > 2000 ? 0 : 150) +
                      Math.round(totalPrice * 0.18)
                    ).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 text-sm text-gray-500">
                <p className="mb-2">We accept:</p>
                <div className="flex space-x-2">
                  <div className="p-1 border border-gray-300 rounded bg-white">
                    <span className="text-xs font-medium">VISA</span>
                  </div>
                  <div className="p-1 border border-gray-300 rounded bg-white">
                    <span className="text-xs font-medium">MASTERCARD</span>
                  </div>
                  <div className="p-1 border border-gray-300 rounded bg-white">
                    <span className="text-xs font-medium">UPI</span>
                  </div>
                  <div className="p-1 border border-gray-300 rounded bg-white">
                    <span className="text-xs font-medium">COD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;