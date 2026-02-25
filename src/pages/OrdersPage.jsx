import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBox, FaTruck, FaCheckCircle, FaClock, 
  FaEye, FaDownload, FaStar, FaComment,
  FaMapMarkerAlt, FaCreditCard,
  FaSearch, FaFilter, FaChevronDown, FaChevronUp
} from 'react-icons/fa';

import LoadingSpinner from '../components/LoadingSpinner';
import HelmetTags from '../components/SEO/HelmetTags';
import {useAuth}  from '../context/AuthContext';
import toast from 'react-hot-toast';

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders([
        {
          id: 'ORD-2024-001',
          date: '2024-01-15',
          status: 'delivered',
          total: 45.99,
          items: 3,
          paymentMethod: 'Credit Card',
          shippingAddress: '123 Main St, New York, NY 10001',
          estimatedDelivery: '2024-01-18',
          actualDelivery: '2024-01-17',
          trackingNumber: 'TRK123456789',
          carrier: 'FedEx',
          products: [
            {
              id: 1,
              name: 'Organic Wild Honey',
              farmer: 'Rajesh Kumar',
              price: 12.99,
              quantity: 2,
              image: 'https://media.istockphoto.com/id/842769074/photo/sweet-honeycomb-and-wooden-honey-dripping.jpg?s=612x612&w=0&k=20&c=GJwPKmbX02jYByrjIWLOf8xTHWqQEy3vN6cYajM6p7o=',
              reviewed: true
            },
            {
              id: 2,
              name: 'Handcrafted Mango Pickle',
              farmer: 'Priya Sharma',
              price: 8.99,
              quantity: 1,
              image: 'https://avakaayapickleshouse.com/wp-content/uploads/2024/10/Mango-pickle-6_2_11zon.webp',
              reviewed: false
            },
            {
              id: 3,
              name: 'Cold-Pressed Almond Oil',
              farmer: 'Amit Patel',
              price: 15.99,
              quantity: 1,
              image: 'https://healthyroots.com/cdn/shop/files/ColdPressedAlmondoils.jpg?v=1763794735',
              reviewed: false
            }
          ]
        },
        {
          id: 'ORD-2024-002',
          date: '2024-01-10',
          status: 'shipped',
          total: 34.97,
          items: 2,
          paymentMethod: 'PayPal',
          shippingAddress: '456 Oak Ave, Los Angeles, CA 90001',
          estimatedDelivery: '2024-01-14',
          trackingNumber: 'TRK987654321',
          carrier: 'UPS',
          products: [
            {
              id: 4,
              name: 'Traditional Jaggery',
              farmer: 'Sunita Devi',
              price: 6.99,
              quantity: 3,
              image: 'https://img.freepik.com/free-vector/organic-jaggery-powder-blocks-with-fresh-sugar-cane-color-background-realistic-vector-illustration_1284-78025.jpg',
              reviewed: false
            },
            {
              id: 5,
              name: 'Spice Mix - Garam Masala',
              farmer: 'Meera Singh',
              price: 7.99,
              quantity: 2,
              image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop',
              reviewed: false
            }
          ]
        },
        {
          id: 'ORD-2024-003',
          date: '2024-01-05',
          status: 'processing',
          total: 67.25,
          items: 4,
          paymentMethod: 'Credit Card',
          shippingAddress: '789 Pine St, Chicago, IL 60601',
          estimatedDelivery: '2024-01-12',
          products: [
            {
              id: 6,
              name: 'Organic Basmati Rice',
              farmer: 'Harpreet Singh',
              price: 24.99,
              quantity: 1,
              image: 'https://www.greendna.in/cdn/shop/products/basmati6_945x.jpg?v=1742283085',
              reviewed: false
            },
            {
              id: 7,
              name: 'Wood Pressed Groundnut Oil',
              farmer: 'Venkatesh Rao',
              price: 19.99,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5',
              reviewed: false
            },
            {
              id: 8,
              name:  'Premium Chana Dal',
              farmer: 'Krishna Reddy',
              price: 12.99,
              quantity: 50,
              image: 'https://m.media-amazon.com/images/I/51vdr3+AsWL._AC_UF894,1000_QL80_.jpg',
              reviewed: false
            }
          ]
        },
        {
          id: 'ORD-2024-004',
          date: '2024-01-01',
          status: 'cancelled',
          total: 23.50,
          items: 2,
          paymentMethod: 'Credit Card',
          shippingAddress: '321 Elm St, Miami, FL 33101',
          cancellationReason: 'Changed mind',
          products: [
            {
              id: 9,
              name: 'Handcrafted Mango Pickle',
              farmer: 'Priya Sharma',
              price: 8.99,
              quantity: 2,
              image: 'https://avakaayapickleshouse.com/wp-content/uploads/2024/10/Mango-pickle-6_2_11zon.webp',
              reviewed: false
            }
          ]
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'delivered': return FaCheckCircle;
      case 'shipped': return FaTruck;
      case 'processing': return FaClock;
      case 'cancelled': return FaBox;
      default: return FaBox;
    }
  };

  const handleTrackOrder = (order) => {
    toast.success(`Tracking: ${order.trackingNumber} (${order.carrier})`);
  };

  const handleDownloadInvoice = (orderId) => {
    toast.success(`Invoice for order ${orderId} downloaded`);
  };

  const handleReorder = (order) => {
    toast.success(`Order #${order.id} added to cart`);
  };

  const handleReviewProduct = (product) => {
    setSelectedProduct(product);
    setShowReviewModal(true);
  };

  const filteredOrders = orders
    .filter(order => filter === 'all' || order.status === filter)
    .filter(order => 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.products.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  if (loading) {
    return (
      <>
        
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="large" />
        </div>
      </>
    );
  }

  return (
    <>
      <HelmetTags title="My Orders | AgroValue Connect" />
      
      <div className="min-h-screen bg-gray-50">
        

        <div className="container mx-auto px-4 py-8 mt-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
              <p className="text-gray-600">Track and manage your orders</p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0 w-full md:w-auto">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-full sm:w-64"
                />
              </div>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Orders</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-6">
            <AnimatePresence>
              {filteredOrders.map((order) => {
                const StatusIcon = getStatusIcon(order.status);
                const isExpanded = expandedOrder === order.id;

                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden"
                  >
                    {/* Order Header */}
                    <div className="p-6 border-b">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div className="flex items-center space-x-4 mb-4 md:mb-0">
                          <div className="bg-primary-100 p-3 rounded-xl">
                            <FaBox className="text-2xl text-primary-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                            <p className="text-sm text-gray-600">Placed on {order.date}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <span className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                            <StatusIcon />
                            <span className="capitalize">{order.status}</span>
                          </span>
                          <button
                            onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition duration-300"
                          >
                            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-gray-600">Total Amount</p>
                          <p className="font-semibold text-primary-600">${order.total.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Items</p>
                          <p className="font-semibold">{order.items} items</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Payment</p>
                          <p className="font-semibold">{order.paymentMethod}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Est. Delivery</p>
                          <p className="font-semibold">{order.estimatedDelivery || 'N/A'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          {/* Products */}
                          <div className="p-6 border-b">
                            <h4 className="font-semibold mb-4">Order Items</h4>
                            <div className="space-y-4">
                              {order.products.map((product) => (
                                <div key={product.id} className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4">
                                    <img
                                      src={product.image}
                                      alt={product.name}
                                      className="w-16 h-16 object-cover rounded-lg"
                                    />
                                    <div>
                                      <h5 className="font-medium">{product.name}</h5>
                                      <p className="text-sm text-gray-600">by {product.farmer}</p>
                                      <p className="text-sm text-gray-600">Qty: {product.quantity}</p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-semibold text-primary-600">
                                      ${(product.price * product.quantity).toFixed(2)}
                                    </p>
                                    {order.status === 'delivered' && !product.reviewed && (
                                      <button
                                        onClick={() => handleReviewProduct(product)}
                                        className="text-sm text-primary-600 hover:text-primary-700 mt-2 flex items-center space-x-1"
                                      >
                                        <FaStar />
                                        <span>Write a Review</span>
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Shipping Information */}
                          <div className="p-6 border-b">
                            <h4 className="font-semibold mb-4 flex items-center">
                              <FaMapMarkerAlt className="mr-2 text-primary-600" />
                              Shipping Address
                            </h4>
                            <p className="text-gray-600">{order.shippingAddress}</p>
                            
                            {order.trackingNumber && (
                              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-600 mb-2">Tracking Information</p>
                                <p className="font-medium">Tracking #: {order.trackingNumber}</p>
                                <p className="text-sm text-gray-600">Carrier: {order.carrier}</p>
                              </div>
                            )}
                          </div>

                          {/* Order Actions */}
                          <div className="p-6 bg-gray-50 flex flex-wrap gap-4">
                            {order.status === 'shipped' && (
                              <button
                                onClick={() => handleTrackOrder(order)}
                                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition duration-300"
                              >
                                <FaTruck />
                                <span>Track Order</span>
                              </button>
                            )}
                            
                            <button
                              onClick={() => handleDownloadInvoice(order.id)}
                              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300"
                            >
                              <FaDownload />
                              <span>Download Invoice</span>
                            </button>

                            {order.status === 'delivered' && (
                              <button
                                onClick={() => handleReorder(order)}
                                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300"
                              >
                                <FaBox />
                                <span>Reorder</span>
                              </button>
                            )}

                            <button
                              onClick={() => window.location.href = `/order/${order.id}`}
                              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300"
                            >
                              <FaEye />
                              <span>View Details</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filteredOrders.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                <FaBox className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No orders found</h3>
                <p className="text-gray-600 mb-6">You haven't placed any orders matching your criteria</p>
                <Link
                  to="/products"
                  className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition duration-300"
                >
                  <span>Browse Products</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {showReviewModal && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowReviewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-4">Write a Review</h3>
              
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h4 className="font-semibold">{selectedProduct.name}</h4>
                  <p className="text-sm text-gray-600">by {selectedProduct.farmer}</p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex space-x-2">
                  {[1,2,3,4,5].map((star) => (
                    <button
                      key={star}
                      className="text-2xl text-gray-300 hover:text-yellow-400 transition"
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Share your experience with this product..."
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowReviewModal(false);
                    toast.success('Thank you for your review!');
                  }}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition duration-300"
                >
                  Submit Review
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OrdersPage;