import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaTimes, FaUser, FaBox, FaCalendar, 
  FaMoneyBillWave, FaTruck, FaCheckCircle,
  FaClock, FaPrint, FaDownload
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const OrderDetailsModal = ({ isOpen, onClose, order, onUpdateStatus }) => {
  if (!isOpen || !order) return null;

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleStatusChange = (newStatus) => {
    onUpdateStatus(order.id, newStatus);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadInvoice = () => {
    const invoice = `INVOICE
Order ID: ${order.id}
Date: ${order.date}
Customer: ${order.customer}

Items: ${order.items?.join(', ')}
Total: $${order.total}
Status: ${order.status}`;

    const blob = new Blob([invoice], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${order.id}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Invoice downloaded');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">Order Details</h2>
              <p className="text-primary-100 text-sm mt-1">{order.id}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition"
            >
              <FaTimes className="text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex justify-between items-center">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(order.status)}`}>
              {order.status.toUpperCase()}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={handlePrint}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                title="Print"
              >
                <FaPrint />
              </button>
              <button
                onClick={handleDownloadInvoice}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                title="Download Invoice"
              >
                <FaDownload />
              </button>
            </div>
          </div>

          {/* Order Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <FaUser className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="font-semibold">{order.customer}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <FaCalendar className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p className="font-semibold">{order.date}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <FaBox className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Items</p>
                  <p className="font-semibold">{order.products} items</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <FaMoneyBillWave className="text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-semibold text-primary-600">${order.total}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Items List */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Order Items</h3>
            <div className="bg-gray-50 rounded-xl p-4">
              {order.items?.map((item, index) => (
                <div key={index} className="flex justify-between py-2 border-b last:border-0">
                  <span>{item}</span>
                  <span className="text-gray-600">1 item</span>
                </div>
              ))}
            </div>
          </div>

          {/* Update Status */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Update Order Status</h3>
            <div className="flex flex-wrap gap-2">
              {['pending', 'processing', 'shipped', 'delivered'].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  disabled={order.status === status}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    order.status === status
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-end pt-4 border-t">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OrderDetailsModal;