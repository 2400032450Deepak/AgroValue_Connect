import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaShoppingCart, FaSearch, FaEye, FaTruck,
  FaCheckCircle, FaClock, FaFilter
} from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import { useFarmerData } from '../hooks/useFarmerData';
import OrderDetailsModal from '../components/OrderDetailsModal';

const FarmerOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const { orders, updateOrderStatus } = useFarmerData();

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return FaClock;
      case 'processing': return FaTruck;
      case 'shipped': return FaTruck;
      case 'delivered': return FaCheckCircle;
      default: return FaClock;
    }
  };

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar role="farmer" />
      
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
          <p className="text-gray-600">Manage your incoming orders</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <p className="text-gray-600 text-sm">Total</p>
            <p className="text-2xl font-bold">{orderStats.total}</p>
          </div>
          <div className="bg-yellow-50 rounded-xl shadow-lg p-4 text-center border border-yellow-200">
            <p className="text-yellow-600 text-sm">Pending</p>
            <p className="text-2xl font-bold text-yellow-700">{orderStats.pending}</p>
          </div>
          <div className="bg-blue-50 rounded-xl shadow-lg p-4 text-center border border-blue-200">
            <p className="text-blue-600 text-sm">Processing</p>
            <p className="text-2xl font-bold text-blue-700">{orderStats.processing}</p>
          </div>
          <div className="bg-purple-50 rounded-xl shadow-lg p-4 text-center border border-purple-200">
            <p className="text-purple-600 text-sm">Shipped</p>
            <p className="text-2xl font-bold text-purple-700">{orderStats.shipped}</p>
          </div>
          <div className="bg-green-50 rounded-xl shadow-lg p-4 text-center border border-green-200">
            <p className="text-green-600 text-sm">Delivered</p>
            <p className="text-2xl font-bold text-green-700">{orderStats.delivered}</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders by ID or customer..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left">Order ID</th>
                <th className="px-6 py-4 text-left">Customer</th>
                <th className="px-6 py-4 text-left">Items</th>
                <th className="px-6 py-4 text-left">Total</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => {
                const StatusIcon = getStatusIcon(order.status);
                return (
                  <tr 
                    key={order.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowOrderDetails(true);
                    }}
                  >
                    <td className="px-6 py-4 font-medium">{order.id}</td>
                    <td className="px-6 py-4">{order.customer}</td>
                    <td className="px-6 py-4">{order.products} items</td>
                    <td className="px-6 py-4 font-semibold">${order.total}</td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center space-x-1 px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                        <StatusIcon className="text-sm" />
                        <span className="capitalize">{order.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">{order.date}</td>
                    <td className="px-6 py-4">
                      <button 
                        className="text-primary-600 hover:text-primary-800 font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOrder(order);
                          setShowOrderDetails(true);
                        }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <FaShoppingCart className="text-5xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No orders found</p>
            </div>
          )}
        </div>

        {/* Order Details Modal */}
        <OrderDetailsModal
          isOpen={showOrderDetails}
          onClose={() => {
            setShowOrderDetails(false);
            setSelectedOrder(null);
          }}
          order={selectedOrder}
          onUpdateStatus={updateOrderStatus}
        />
      </div>
    </div>
  );
};

export default FarmerOrders;