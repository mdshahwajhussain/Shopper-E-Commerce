import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CheckCircle, Circle, Clock, Package, Truck, MapPin } from 'lucide-react';
import { orderStatuses, sampleOrders } from '../data/dummyData';

const OrderTrackingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin', { state: { redirectTo: '/order-tracking' } });
      return;
    }

    // Load orders from localStorage
    const loadOrders = () => {
      const storedOrders = localStorage.getItem('orders');
      if (storedOrders) {
        const parsedOrders = JSON.parse(storedOrders);
        setOrders(parsedOrders);
        
        if (parsedOrders.length > 0) {
          setSelectedOrder(parsedOrders[0]);
        }
      } else {
        // Use sample orders if no orders in localStorage
        setOrders(sampleOrders);
        if (sampleOrders.length > 0) {
          setSelectedOrder(sampleOrders[0]);
        }
      }
      setLoading(false);
    };

    loadOrders();
  }, [isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-4xl">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">No Orders Found</h1>
          <p className="text-gray-600 mb-8">You haven't placed any orders yet.</p>
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  const getStatusIndex = (status: string) => {
    return orderStatuses.findIndex(s => s === status);
  };

  const getOrderDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Order Tracking</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order List */}
        <div className="lg:col-span-1">
          <h2 className="text-lg font-semibold mb-4">Your Orders</h2>
          
          <div className="bg-white rounded-lg border border-gray-200 divide-y">
            {orders.map((order) => (
              <button
                key={order.id}
                className={`w-full text-left p-4 transition-colors ${
                  selectedOrder?.id === order.id
                    ? 'bg-blue-50 border-l-4 border-l-blue-500'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedOrder(order)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{order.id}</h3>
                    <p className="text-sm text-gray-500">{getOrderDate(order.date)}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    order.status === 'Delivered' 
                      ? 'bg-green-100 text-green-800' 
                      : order.status === 'Order Placed' 
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm">
                  {order.items.length} {order.items.length === 1 ? 'item' : 'items'} · 
                  <span className="font-medium ml-1">₹{order.total.toLocaleString('en-IN')}</span>
                </p>
              </button>
            ))}
          </div>
        </div>
        
        {/* Order Details */}
        <div className="lg:col-span-2">
          {selectedOrder && (
            <div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                <div className="flex flex-wrap justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold mb-1">Order #{selectedOrder.id}</h2>
                    <p className="text-gray-500">Placed on {getOrderDate(selectedOrder.date)}</p>
                    {selectedOrder.trackingNumber && (
                      <p className="text-sm mt-1">
                        Tracking: <span className="font-medium">{selectedOrder.trackingNumber}</span>
                      </p>
                    )}
                  </div>
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    selectedOrder.status === 'Delivered' 
                      ? 'bg-green-100 text-green-800' 
                      : selectedOrder.status === 'Order Placed' 
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedOrder.status}
                  </span>
                </div>
                
                {/* Order Tracking Progress */}
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-900 mb-4">Order Progress</h3>
                  
                  <div className="relative">
                    <div className="absolute left-5 top-0 h-full w-0.5 bg-gray-200"></div>
                    
                    <div className="space-y-6">
                      {orderStatuses.map((status, index) => {
                        const currentStatusIndex = getStatusIndex(selectedOrder.status);
                        const isCompleted = index <= currentStatusIndex;
                        const isCurrent = index === currentStatusIndex;
                        
                        let StatusIcon = Circle;
                        if (isCompleted && !isCurrent) StatusIcon = CheckCircle;
                        else if (status === 'Order Placed') StatusIcon = Clock;
                        else if (status === 'Processing') StatusIcon = Package;
                        else if (status === 'Shipped') StatusIcon = Truck;
                        else if (status === 'Out for Delivery') StatusIcon = Truck;
                        else if (status === 'Delivered') StatusIcon = MapPin;
                        
                        return (
                          <div key={status} className="flex items-start">
                            <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full ${
                              isCompleted 
                                ? 'bg-green-100 text-green-600' 
                                : 'bg-gray-100 text-gray-400'
                            }`}>
                              <StatusIcon size={20} className={isCompleted ? 'text-green-600' : 'text-gray-400'} />
                            </div>
                            <div className="ml-4">
                              <h4 className={`font-medium ${isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                                {status}
                              </h4>
                              {isCurrent && (
                                <p className="text-sm text-gray-500 mt-1">
                                  {status === 'Order Placed' && 'We\'ve received your order and are processing it.'}
                                  {status === 'Processing' && 'Your order is being prepared for shipping.'}
                                  {status === 'Shipped' && 'Your order has been shipped and is on its way.'}
                                  {status === 'Out for Delivery' && 'Your order is out for delivery and will arrive today.'}
                                  {status === 'Delivered' && 'Your order has been delivered.'}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                {/* Order Items */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
                  
                  <div className="border rounded-lg overflow-hidden">
                    {selectedOrder.items.map((item: any, index: number) => (
                      <div key={index} className="flex p-4 border-b last:border-b-0">
                        <div className="w-16 h-16 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-500 mb-1">
                            {item.variant.color}, {item.variant.size}
                          </p>
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            <p className="font-medium">₹{(item.variant.price * item.quantity).toLocaleString('en-IN')}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Shipping Address */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Shipping Address</h3>
                  
                  <div className="text-gray-700">
                    <p className="font-medium">{selectedOrder.shippingAddress?.name || 'Aarav Singh'}</p>
                    <p>{selectedOrder.shippingAddress?.street || '123 Main Street'}</p>
                    <p>
                      {selectedOrder.shippingAddress?.city || 'Mumbai'}, {selectedOrder.shippingAddress?.state || 'Maharashtra'}
                    </p>
                    <p>{selectedOrder.shippingAddress?.zip || '400001'}</p>
                    <p>{selectedOrder.shippingAddress?.country || 'India'}</p>
                  </div>
                </div>
                
                {/* Payment Information */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Payment Information</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Method</span>
                      <span className="font-medium">{selectedOrder.paymentMethod || 'Credit Card'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>₹{selectedOrder.total.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>{selectedOrder.total > 2000 ? 'Free' : '₹150'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span>₹{Math.round(selectedOrder.total * 0.18).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-medium">
                      <span>Total</span>
                      <span>₹{(
                        selectedOrder.total + 
                        (selectedOrder.total > 2000 ? 0 : 150) + 
                        Math.round(selectedOrder.total * 0.18)
                      ).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;