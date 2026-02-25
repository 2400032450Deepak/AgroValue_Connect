import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationTriangle, FaCheckCircle, FaBox, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const InventoryAlert = ({ products, onClose }) => {
  const lowStockItems = products.filter(p => p.stock < 50 && p.stock > 0);
  const outOfStockItems = products.filter(p => p.stock === 0);

  if (lowStockItems.length === 0 && outOfStockItems.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl shadow-lg mb-6 overflow-hidden"
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <FaExclamationTriangle className="text-2xl" />
            <h3 className="font-bold text-lg">Inventory Alert</h3>
          </div>
          {onClose && (
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded">
              <FaTimes />
            </button>
          )}
        </div>

        <div className="mt-3 grid md:grid-cols-2 gap-4">
          {lowStockItems.length > 0 && (
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <FaBox className="text-yellow-300" />
                <span className="font-semibold">Low Stock ({lowStockItems.length})</span>
              </div>
              <div className="space-y-1">
                {lowStockItems.slice(0, 3).map(item => (
                  <div key={item.id} className="text-sm flex justify-between">
                    <span>{item.name}</span>
                    <span className="font-semibold">{item.stock} left</span>
                  </div>
                ))}
                {lowStockItems.length > 3 && (
                  <p className="text-xs opacity-75">+{lowStockItems.length - 3} more items</p>
                )}
              </div>
            </div>
          )}

          {outOfStockItems.length > 0 && (
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <FaExclamationTriangle className="text-red-300" />
                <span className="font-semibold">Out of Stock ({outOfStockItems.length})</span>
              </div>
              <div className="space-y-1">
                {outOfStockItems.slice(0, 3).map(item => (
                  <div key={item.id} className="text-sm">
                    {item.name}
                  </div>
                ))}
                {outOfStockItems.length > 3 && (
                  <p className="text-xs opacity-75">+{outOfStockItems.length - 3} more items</p>
                )}
              </div>
            </div>
          )}
        </div>

        <Link
          to="/farmer/products"
          className="mt-3 inline-block text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition"
        >
          Manage Inventory →
        </Link>
      </div>
    </motion.div>
  );
};

export default InventoryAlert;