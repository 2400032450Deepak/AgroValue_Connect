import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaTruck, FaGlobe, FaBox, FaWeightHanging,
  FaRuler, FaCalculator, FaTimes, FaMapMarkerAlt
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const ShippingCalculator = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fromCountry: 'USA',
    toCountry: '',
    weight: '',
    dimensions: {
      length: '',
      width: '',
      height: ''
    },
    productType: 'general',
    shippingSpeed: 'standard'
  });

  const [result, setResult] = useState(null);

  const countries = [
    'USA', 'Canada', 'UK', 'Germany', 'France', 'India', 'China', 'Japan',
    'Australia', 'Brazil', 'Mexico', 'Spain', 'Italy', 'UAE', 'Singapore'
  ];

  const productTypes = [
    { value: 'general', label: 'General Goods', multiplier: 1.0 },
    { value: 'fragile', label: 'Fragile Items', multiplier: 1.3 },
    { value: 'perishable', label: 'Perishable', multiplier: 1.5 },
    { value: 'hazardous', label: 'Hazardous', multiplier: 2.0 },
    { value: 'documents', label: 'Documents', multiplier: 0.8 }
  ];

  const shippingSpeeds = [
    { value: 'economy', label: 'Economy (7-14 days)', multiplier: 0.8 },
    { value: 'standard', label: 'Standard (5-7 days)', multiplier: 1.0 },
    { value: 'express', label: 'Express (2-4 days)', multiplier: 1.5 },
    { value: 'priority', label: 'Priority (1-2 days)', multiplier: 2.0 }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const calculateShipping = () => {
    if (!formData.toCountry) {
      toast.error('Please select destination country');
      return;
    }

    if (!formData.weight || parseFloat(formData.weight) <= 0) {
      toast.error('Please enter valid weight');
      return;
    }

    // Base rate calculation
    const weight = parseFloat(formData.weight);
    const productType = productTypes.find(p => p.value === formData.productType);
    const speed = shippingSpeeds.find(s => s.value === formData.shippingSpeed);
    
    // Complex calculation based on various factors
    let baseRate = 10 + (weight * 2.5); // $10 base + $2.5 per kg
    
    // Distance factor (simplified)
    const distanceFactor = formData.toCountry === 'USA' ? 1.0 : 
                          formData.toCountry === 'Canada' ? 1.2 :
                          formData.toCountry === 'India' ? 2.5 : 2.0;
    
    // Dimensional weight if dimensions provided
    let dimensionalWeight = 0;
    if (formData.dimensions.length && formData.dimensions.width && formData.dimensions.height) {
      const vol = (formData.dimensions.length * formData.dimensions.width * formData.dimensions.height) / 5000; // DIM factor
      dimensionalWeight = Math.max(weight, vol);
    }

    const finalWeight = dimensionalWeight || weight;
    const rate = baseRate * distanceFactor * (productType?.multiplier || 1) * (speed?.multiplier || 1);
    
    // Additional services
    const insurance = rate * 0.05; // 5% insurance
    const tracking = 2.99;
    const signature = 3.99;
    
    const total = rate + insurance + tracking + signature;

    const shippingResult = {
      baseRate: rate,
      insurance,
      tracking,
      signature,
      total,
      estimatedDays: speed?.label.split('(')[1].replace(')', '') || '5-7 days',
      carrier: formData.toCountry === 'USA' ? 'USPS' : 'DHL',
      dimensionalWeight: dimensionalWeight || null
    };

    setResult(shippingResult);
    toast.success('Shipping cost calculated!');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white sticky top-0">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <FaTruck className="text-3xl" />
              <div>
                <h2 className="text-2xl font-bold">Shipping Cost Estimator</h2>
                <p className="text-green-100">Calculate shipping costs to different countries</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column - Origin & Destination */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Route Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Country
                </label>
                <select
                  name="fromCountry"
                  value={formData.fromCountry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To Country *
                </label>
                <select
                  name="toCountry"
                  value={formData.toCountry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select destination</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Type
                </label>
                <select
                  name="productType"
                  value={formData.productType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {productTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shipping Speed
                </label>
                <select
                  name="shippingSpeed"
                  value={formData.shippingSpeed}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {shippingSpeeds.map(speed => (
                    <option key={speed.value} value={speed.value}>{speed.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right Column - Package Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Package Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg) *
                </label>
                <div className="relative">
                  <FaWeightHanging className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="0.0"
                    step="0.1"
                    min="0"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dimensions (cm) - Optional
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <input
                      type="number"
                      name="dimensions.length"
                      value={formData.dimensions.length}
                      onChange={handleChange}
                      placeholder="Length"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      name="dimensions.width"
                      value={formData.dimensions.width}
                      onChange={handleChange}
                      placeholder="Width"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      name="dimensions.height"
                      value={formData.dimensions.height}
                      onChange={handleChange}
                      placeholder="Height"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* Package Volume Preview */}
              {formData.dimensions.length && formData.dimensions.width && formData.dimensions.height && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Volume: {(formData.dimensions.length * formData.dimensions.width * formData.dimensions.height).toFixed(0)} cm³
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Calculate Button */}
          <div className="flex justify-end mt-6 pt-6 border-t">
            <button
              onClick={calculateShipping}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold flex items-center space-x-2"
            >
              <FaCalculator />
              <span>Calculate Shipping Cost</span>
            </button>
          </div>

          {/* Results */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold mb-4">Shipping Estimate</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Carrier</p>
                  <p className="text-xl font-bold text-green-600">{result.carrier}</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Delivery Time</p>
                  <p className="text-xl font-bold text-blue-600">{result.estimatedDays}</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Base Rate</p>
                  <p className="text-xl font-bold">${result.baseRate.toFixed(2)}</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between py-2 border-b">
                  <span>Base Shipping</span>
                  <span className="font-semibold">${result.baseRate.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>Insurance (5%)</span>
                  <span className="font-semibold">${result.insurance.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>Tracking</span>
                  <span className="font-semibold">${result.tracking.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>Signature Required</span>
                  <span className="font-semibold">${result.signature.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 text-lg font-bold">
                  <span>Total</span>
                  <span className="text-green-600">${result.total.toFixed(2)}</span>
                </div>
              </div>

              {result.dimensionalWeight && (
                <p className="text-sm text-gray-600">
                  Note: Dimensional weight ({result.dimensionalWeight.toFixed(1)} kg) was used for calculation.
                </p>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ShippingCalculator;