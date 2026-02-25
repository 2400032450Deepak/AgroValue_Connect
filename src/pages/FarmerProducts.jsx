import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaBox, FaPlus, FaEdit, FaTrash, FaSearch,
  FaStar, FaFilter
} from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import { useFarmerData } from '../hooks/useFarmerData';
import ProductModal from '../components/ProductModal';
import toast from 'react-hot-toast';

const FarmerProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { products, addProduct, updateProduct, deleteProduct } = useFarmerData();

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || product.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar role="farmer" />
      
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Products</h1>
            <p className="text-gray-600">Manage your product listings</p>
          </div>
          
          <button
            onClick={() => setShowAddProduct(true)}
            className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
          >
            <FaPlus />
            <span>Add New Product</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600">Total Products</p>
            <p className="text-3xl font-bold">{products.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600">Active Products</p>
            <p className="text-3xl font-bold text-green-600">
              {products.filter(p => p.status === 'active').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600">Low Stock</p>
            <p className="text-3xl font-bold text-orange-600">
              {products.filter(p => p.status === 'low-stock').length}
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Products</option>
              <option value="active">Active</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">Category: {product.category}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-primary-600">${product.price}</span>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>{product.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    product.status === 'active' ? 'bg-green-100 text-green-800' :
                    product.status === 'low-stock' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    Stock: {product.stock}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowEditProduct(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modals */}
        <ProductModal
          isOpen={showAddProduct}
          onClose={() => setShowAddProduct(false)}
          onSave={(productData) => {
            addProduct(productData);
            setShowAddProduct(false);
          }}
        />

        <ProductModal
          isOpen={showEditProduct}
          onClose={() => {
            setShowEditProduct(false);
            setSelectedProduct(null);
          }}
          onSave={(productData) => {
            updateProduct(productData.id, productData);
            setShowEditProduct(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
        />
      </div>
    </div>
  );
};

export default FarmerProducts;