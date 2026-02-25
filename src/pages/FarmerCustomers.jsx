import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUsers, FaSearch, FaUser, FaStar,
  FaShoppingCart, FaMoneyBillWave, FaEnvelope
} from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import { useFarmerData } from '../hooks/useFarmerData';
import toast from 'react-hot-toast';

const FarmerCustomers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { orders } = useFarmerData();

  // Extract unique customers from orders
  const customers = orders.reduce((acc, order) => {
    if (!acc.find(c => c.name === order.customer)) {
      acc.push({
        name: order.customer,
        email: `${order.customer.toLowerCase().replace(' ', '.')}@example.com`,
        orders: 1,
        spent: order.total,
        lastOrder: order.date,
        avatar: `https://ui-avatars.com/api/?name=${order.customer}&background=4caf50&color=fff`
      });
    } else {
      const customer = acc.find(c => c.name === order.customer);
      customer.orders += 1;
      customer.spent += order.total;
      if (new Date(order.date) > new Date(customer.lastOrder)) {
        customer.lastOrder = order.date;
      }
    }
    return acc;
  }, []);

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCustomers = customers.length;
  const totalSpent = customers.reduce((sum, c) => sum + c.spent, 0);
  const avgOrderValue = totalSpent / orders.length || 0;

  const handleContact = (customer) => {
    toast.success(`Message sent to ${customer.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar role="farmer" />
      
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Customers</h1>
          <p className="text-gray-600">People who bought from you</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Customers</p>
                <p className="text-3xl font-bold">{totalCustomers}</p>
              </div>
              <FaUsers className="text-3xl text-primary-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-green-600">${totalSpent.toFixed(2)}</p>
              </div>
              <FaMoneyBillWave className="text-3xl text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Avg. Order Value</p>
                <p className="text-3xl font-bold text-blue-600">${avgOrderValue.toFixed(2)}</p>
              </div>
              <FaShoppingCart className="text-3xl text-blue-500" />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Customers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={customer.avatar}
                  alt={customer.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{customer.name}</h3>
                  <p className="text-sm text-gray-600">{customer.email}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex justify-between">
                  <span>🛒 Orders:</span>
                  <span className="font-semibold">{customer.orders}</span>
                </p>
                <p className="flex justify-between">
                  <span>💰 Spent:</span>
                  <span className="font-semibold">${customer.spent.toFixed(2)}</span>
                </p>
                <p className="flex justify-between">
                  <span>📅 Last order:</span>
                  <span className="font-semibold">{customer.lastOrder}</span>
                </p>
              </div>
              <button
                onClick={() => handleContact(customer)}
                className="mt-4 w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition flex items-center justify-center space-x-2"
              >
                <FaEnvelope />
                <span>Contact</span>
              </button>
            </motion.div>
          ))}
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <FaUsers className="text-5xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No customers found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerCustomers;