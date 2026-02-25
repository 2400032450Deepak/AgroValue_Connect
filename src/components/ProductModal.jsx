import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaPlus, FaImage, FaLeaf, FaGlobe } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ProductModal = ({ isOpen, onClose, onSave, product = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: 'Honey',
    description: '',
    unit: 'kg',
    isOrganic: false,
    internationalShipping: false,
    image: ''
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || '',
        stock: product.stock || '',
        category: product.category || 'Honey',
        description: product.description || '',
        unit: product.unit || 'kg',
        isOrganic: product.isOrganic || false,
        internationalShipping: product.internationalShipping || false,
        image: product.image || ''
      });
      setImagePreview(product.image || '');
    } else {
      resetForm();
    }
  }, [product]);

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      stock: '',
      category: 'Honey',
      description: '',
      unit: 'kg',
      isOrganic: false,
      internationalShipping: false,
      image: ''
    });
    setImagePreview('');
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image size should be less than 10MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.price) newErrors.price = 'Price is required';
    else if (isNaN(formData.price) || formData.price <= 0) newErrors.price = 'Invalid price';
    if (!formData.stock) newErrors.stock = 'Stock quantity is required';
    else if (isNaN(formData.stock) || formData.stock < 0) newErrors.stock = 'Invalid stock';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fill all required fields');
      return;
    }

    onSave({
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      id: product?.id || Date.now()
    });

    resetForm();
    onClose();
  };

  if (!isOpen) return null;

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
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 sticky top-0">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">
              {product ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition"
            >
              <FaTimes className="text-white" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary-500 transition">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-48 mx-auto rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview('');
                      setFormData(prev => ({ ...prev, image: '' }));
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <FaTimes className="text-sm" />
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <FaImage className="text-4xl text-gray-400 mx-auto mb-2" />
                  <span className="text-gray-600">Click to upload image</span>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                </label>
              )}
            </div>
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Organic Wild Honey"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Category and Price */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option>Honey</option>
                <option>Pickles</option>
                <option>Oils</option>
                <option>Spices</option>
                <option>Dry Fruits</option>
                <option>Grains</option>
                <option>Pulses</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="12.99"
              />
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
            </div>
          </div>

          {/* Stock and Unit */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.stock ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="100"
              />
              {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit
              </label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option>kg</option>
                <option>g</option>
                <option>liter</option>
                <option>piece</option>
                <option>dozen</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Describe your product..."
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          {/* Checkboxes */}
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="isOrganic"
                checked={formData.isOrganic}
                onChange={handleChange}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
              <div className="flex items-center space-x-2">
                <FaLeaf className="text-green-600" />
                <span className="text-sm text-gray-700">Organic Product</span>
              </div>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="internationalShipping"
                checked={formData.internationalShipping}
                onChange={handleChange}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
              <div className="flex items-center space-x-2">
                <FaGlobe className="text-blue-600" />
                <span className="text-sm text-gray-700">International Shipping</span>
              </div>
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
            >
              {product ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ProductModal;