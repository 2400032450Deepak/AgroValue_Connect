import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaBox, FaEdit, FaTrash, FaPlus, FaSearch,
  FaExclamationTriangle, FaCheckCircle, FaTimes,
  FaArrowLeft, FaArrowRight, FaFilter
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useFarmerData } from '../hooks/useFarmerData';
import toast from 'react-hot-toast';

const FarmerInventory = () => {
  const { products, updateProduct, deleteProduct } = useFarmerData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStock, setFilterStock] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStock = filterStock === 'all' ? true :
                        filterStock === 'low' ? product.stock < 50 && product.stock > 0 :
                        filterStock === 'out' ? product.stock === 0 :
                        filterStock === 'in' ? product.stock >= 50 : true;
    
    return matchesSearch && matchesStock;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleUpdateStock = (productId, newStock) => {
    const product = products.find(p => p.id === productId);
    const stockValue = parseInt(newStock);
    if (isNaN(stockValue) || stockValue < 0) {
      toast.error('Please enter a valid stock number');
      return;
    }
    updateProduct(productId, { ...product, stock: stockValue });
    toast.success('Stock updated successfully');
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    if (stock < 50) return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'In Stock', color: 'bg-green-100 text-green-800' };
  };

  const stats = {
    total: products.length,
    inStock: products.filter(p => p.stock >= 50).length,
    lowStock: products.filter(p => p.stock < 50 && p.stock > 0).length,
    outOfStock: products.filter(p => p.stock === 0).length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar role="farmer" />
      
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Inventory Management</h1>
            <p className="text-gray-600">Track and manage your product stock levels</p>
          </div>
          <Link
            to="/farmer/products"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
          >
            <FaPlus />
            <span>Add New Product</span>
          </Link>
        </div>

        {/* Inventory Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Products</p>
                <h3 className="text-3xl font-bold mt-1">{stats.total}</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FaBox className="text-2xl text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">In Stock</p>
                <h3 className="text-3xl font-bold mt-1 text-green-600">{stats.inStock}</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <FaCheckCircle className="text-2xl text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Low Stock</p>
                <h3 className="text-3xl font-bold mt-1 text-orange-600">{stats.lowStock}</h3>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <FaExclamationTriangle className="text-2xl text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Out of Stock</p>
                <h3 className="text-3xl font-bold mt-1 text-red-600">{stats.outOfStock}</h3>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <FaTimes className="text-2xl text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products by name or category..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-400" />
              <select
                value={filterStock}
                onChange={(e) => setFilterStock(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Stock</option>
                <option value="in">In Stock</option>
                <option value="low">Low Stock</option>
                <option value="out">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Current Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stock);
                  return (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">{product.category}</td>
                      <td className="px-6 py-4 font-semibold">${product.price}</td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          min="0"
                          value={product.stock}
                          onChange={(e) => handleUpdateStock(product.id, e.target.value)}
                          className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${stockStatus.color}`}>
                          {stockStatus.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <Link
                            to={`/farmer/products?edit=${product.id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Edit Product"
                          >
                            <FaEdit />
                          </Link>
                          <button 
                            onClick={() => deleteProduct(product.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete Product"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg border ${
                    currentPage === 1 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <FaArrowLeft />
                </button>
                <span className="px-4 py-2 bg-primary-50 text-primary-600 rounded-lg">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg border ${
                    currentPage === totalPages 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <FaBox className="text-5xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No products found in inventory</p>
              <Link
                to="/farmer/products"
                className="inline-block mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Add Your First Product
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Quick Tips</h4>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>• Click on stock numbers to update</li>
              <li>• Low stock items are highlighted</li>
              <li>• Use search to find products fast</li>
            </ul>
          </div>
          
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">Stock Levels</h4>
            <ul className="text-sm text-green-600 space-y-1">
              <li>• In Stock: 50+ units</li>
              <li>• Low Stock: 1-49 units</li>
              <li>• Out of Stock: 0 units</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
            <h4 className="font-semibold text-purple-800 mb-2">Bulk Actions</h4>
            <ul className="text-sm text-purple-600 space-y-1">
              <li>• Export inventory list</li>
              <li>• Print stock report</li>
              <li>• Set reorder alerts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerInventory;