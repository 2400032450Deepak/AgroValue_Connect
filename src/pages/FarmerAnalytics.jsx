import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaChartLine, FaEye, FaShoppingCart, FaHistory,
  FaCalendarAlt, FaDownload
} from 'react-icons/fa';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import Sidebar from '../components/Sidebar';
import { useFarmerData } from '../hooks/useFarmerData';
import toast from 'react-hot-toast';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

const FarmerAnalytics = () => {
  const [dateRange, setDateRange] = useState('month');
  const { products, orders, stats, getSalesData, getCategoryData } = useFarmerData();

  const salesData = getSalesData();
  const categoryData = getCategoryData();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' }
    }
  };

  const handleExportAnalytics = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      stats,
      products: products.length,
      orders: orders.length,
      revenue: stats.totalRevenue
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Analytics exported!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar role="farmer" />
      
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Analytics</h1>
            <p className="text-gray-600">Track your business performance</p>
          </div>
          <div className="flex gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <button
              onClick={handleExportAnalytics}
              className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
            >
              <FaDownload />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6">
            <FaEye className="text-3xl mb-3 opacity-80" />
            <p className="text-sm opacity-90">Total Views</p>
            <p className="text-3xl font-bold">24.5K</p>
            <p className="text-xs mt-2 opacity-75">+15.3% vs last month</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6">
            <FaShoppingCart className="text-3xl mb-3 opacity-80" />
            <p className="text-sm opacity-90">Conversion Rate</p>
            <p className="text-3xl font-bold">3.8%</p>
            <p className="text-xs mt-2 opacity-75">+0.5% vs last month</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6">
            <FaHistory className="text-3xl mb-3 opacity-80" />
            <p className="text-sm opacity-90">Avg. Order Value</p>
            <p className="text-3xl font-bold">$42.50</p>
            <p className="text-xs mt-2 opacity-75">+$3.20 vs last month</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Sales Trend</h3>
            <div className="h-64">
              <Line data={salesData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
            <div className="h-64">
              <Doughnut data={categoryData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {orders.slice(0, 5).map((order, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Order {order.id}</p>
                  <p className="text-sm text-gray-500">{order.customer} • ${order.total}</p>
                </div>
                <span className="text-sm text-gray-400">{order.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerAnalytics;