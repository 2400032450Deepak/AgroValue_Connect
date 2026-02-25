import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCalculator, FaDollarSign, FaPercent, FaBox,
  FaTruck, FaCreditCard, FaChartLine, FaSave,
  FaTrash, FaHistory, FaDownload, FaTimes
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const ProfitCalculator = ({ onClose }) => {
  const [formData, setFormData] = useState({
    productName: '',
    sellingPrice: '',
    productionCost: '',
    quantity: '1',
    platformFee: '5',
    shippingCost: '',
    packagingCost: '',
    additionalCosts: ''
  });

  const [result, setResult] = useState(null);
  const [calculations, setCalculations] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load calculation history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('profitCalculations');
    if (saved) {
      setCalculations(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateProfit = () => {
    // Parse values
    const sellingPrice = parseFloat(formData.sellingPrice) || 0;
    const productionCost = parseFloat(formData.productionCost) || 0;
    const quantity = parseInt(formData.quantity) || 1;
    const platformFee = parseFloat(formData.platformFee) || 0;
    const shippingCost = parseFloat(formData.shippingCost) || 0;
    const packagingCost = parseFloat(formData.packagingCost) || 0;
    const additionalCosts = parseFloat(formData.additionalCosts) || 0;

    // Validation
    if (sellingPrice <= 0) {
      toast.error('Please enter a valid selling price');
      return;
    }

    // Calculations
    const totalRevenue = sellingPrice * quantity;
    const totalProduction = productionCost * quantity;
    const feeAmount = (totalRevenue * platformFee) / 100;
    const totalCosts = totalProduction + feeAmount + shippingCost + packagingCost + additionalCosts;
    const grossProfit = totalRevenue - totalCosts;
    const profitMargin = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0;
    const profitPerUnit = quantity > 0 ? grossProfit / quantity : 0;
    const breakEvenPoint = productionCost > 0 ? Math.ceil(totalCosts / sellingPrice) : 0;

    const calculation = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      productName: formData.productName || 'Unnamed Product',
      sellingPrice,
      productionCost,
      quantity,
      totalRevenue,
      totalCosts,
      grossProfit,
      profitMargin,
      profitPerUnit,
      breakEvenPoint
    };

    setResult(calculation);

    // Save to history
    const updatedCalculations = [calculation, ...calculations].slice(0, 20); // Keep last 20
    setCalculations(updatedCalculations);
    localStorage.setItem('profitCalculations', JSON.stringify(updatedCalculations));
    
    toast.success('Profit calculated successfully!');
  };

  const clearForm = () => {
    setFormData({
      productName: '',
      sellingPrice: '',
      productionCost: '',
      quantity: '1',
      platformFee: '5',
      shippingCost: '',
      packagingCost: '',
      additionalCosts: ''
    });
    setResult(null);
  };

  const deleteCalculation = (id) => {
    const updated = calculations.filter(calc => calc.id !== id);
    setCalculations(updated);
    localStorage.setItem('profitCalculations', JSON.stringify(updated));
    toast.success('Calculation removed');
  };

  const downloadCSV = () => {
    if (calculations.length === 0) {
      toast.error('No calculations to download');
      return;
    }

    const headers = ['Date', 'Product', 'Revenue', 'Costs', 'Profit', 'Margin %'];
    const csvData = calculations.map(calc => [
      calc.date,
      calc.productName,
      calc.totalRevenue.toFixed(2),
      calc.totalCosts.toFixed(2),
      calc.grossProfit.toFixed(2),
      calc.profitMargin.toFixed(2)
    ]);

    const csv = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `profit-calculations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success('Calculations exported successfully!');
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
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white sticky top-0">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <FaCalculator className="text-3xl" />
              <div>
                <h2 className="text-2xl font-bold">Profit Calculator</h2>
                <p className="text-blue-100">Calculate your profits after fees and shipping</p>
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
          {/* History Toggle */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <FaHistory />
              <span>{showHistory ? 'Hide History' : 'Show History'}</span>
            </button>
            {calculations.length > 0 && (
              <button
                onClick={downloadCSV}
                className="flex items-center space-x-2 text-green-600 hover:text-green-700"
              >
                <FaDownload />
                <span>Export CSV</span>
              </button>
            )}
          </div>

          {/* History Panel */}
          <AnimatePresence>
            {showHistory && calculations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 bg-gray-50 rounded-xl p-4 max-h-60 overflow-y-auto"
              >
                <h3 className="font-semibold mb-3">Recent Calculations</h3>
                <div className="space-y-2">
                  {calculations.map(calc => (
                    <div key={calc.id} className="flex justify-between items-center p-2 bg-white rounded-lg">
                      <div>
                        <p className="font-medium">{calc.productName}</p>
                        <p className="text-xs text-gray-500">{calc.date}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`font-semibold ${calc.grossProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ${calc.grossProfit.toFixed(2)}
                        </span>
                        <button
                          onClick={() => deleteCalculation(calc.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Calculator Form */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Product Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name (Optional)
                </label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  placeholder="e.g., Organic Honey"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selling Price per Unit ($) *
                </label>
                <div className="relative">
                  <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    name="sellingPrice"
                    value={formData.sellingPrice}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Production Cost per Unit ($)
                </label>
                <div className="relative">
                  <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    name="productionCost"
                    value={formData.productionCost}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Costs & Fees</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platform Fee (%)
                </label>
                <div className="relative">
                  <FaPercent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    name="platformFee"
                    value={formData.platformFee}
                    onChange={handleChange}
                    step="0.1"
                    min="0"
                    max="100"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shipping Cost ($)
                </label>
                <div className="relative">
                  <FaTruck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    name="shippingCost"
                    value={formData.shippingCost}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Packaging Cost ($)
                </label>
                <div className="relative">
                  <FaBox className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    name="packagingCost"
                    value={formData.packagingCost}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Costs ($)
                </label>
                <input
                  type="number"
                  name="additionalCosts"
                  value={formData.additionalCosts}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6 pt-6 border-t">
            <button
              onClick={clearForm}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Clear All
            </button>
            <button
              onClick={calculateProfit}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center space-x-2"
            >
              <FaCalculator />
              <span>Calculate Profit</span>
            </button>
          </div>

          {/* Results */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold mb-4">Results</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${result.totalRevenue.toFixed(2)}
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Total Costs</p>
                  <p className="text-2xl font-bold text-red-600">
                    ${result.totalCosts.toFixed(2)}
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Gross Profit</p>
                  <p className={`text-2xl font-bold ${result.grossProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${result.grossProfit.toFixed(2)}
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Profit Margin</p>
                  <p className={`text-2xl font-bold ${result.profitMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {result.profitMargin.toFixed(1)}%
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Profit per Unit</p>
                  <p className={`text-2xl font-bold ${result.profitPerUnit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${result.profitPerUnit.toFixed(2)}
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Break-even Units</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {result.breakEvenPoint}
                  </p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 Tip: {result.profitMargin < 20 
                    ? 'Consider reducing costs or increasing price for better margins.' 
                    : result.profitMargin > 50 
                      ? 'Great margin! You\'re doing excellent.' 
                      : 'Healthy profit margin. Keep up the good work!'}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProfitCalculator;