import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaShoppingCart, FaTrash, FaPlus, FaMinus, 
  FaArrowLeft, FaArrowRight, FaLock, FaHeart,
  FaRegHeart, FaClock
} from 'react-icons/fa';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import AuthGuard from '../components/AuthGuard';
import toast from 'react-hot-toast';

const CartPage = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const { isAuthenticated } = useAuth();
  
  // Separate state for saved for later items
  const [savedForLater, setSavedForLater] = useState([]);

  // Load saved items from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('savedForLater');
    if (saved) {
      setSavedForLater(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever savedForLater changes
  useEffect(() => {
    localStorage.setItem('savedForLater', JSON.stringify(savedForLater));
  }, [savedForLater]);

  const handleSaveForLater = (item) => {
    // Remove from cart
    removeFromCart(item.id);
    
    // Add to saved for later (check if not already there)
    setSavedForLater(prev => {
      if (prev.some(i => i.id === item.id)) {
        return prev;
      }
      return [...prev, { ...item, savedAt: new Date().toISOString() }];
    });
    
    toast.success(`${item.name} saved for later`);
  };

  const handleMoveToCart = (item) => {
    // Add to cart with quantity 1
    addToCart(item, 1);
    
    // Remove from saved for later
    setSavedForLater(prev => prev.filter(i => i.id !== item.id));
    
    toast.success(`${item.name} moved to cart`);
  };

  const handleRemoveFromSaved = (itemId) => {
    setSavedForLater(prev => {
      const item = prev.find(i => i.id === itemId);
      if (item) {
        toast.success(`${item.name} removed from saved items`);
      }
      return prev.filter(i => i.id !== itemId);
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  if (cart.length === 0 && savedForLater.length === 0) {
    return (
      <>
        {/* <Navbar /> */}
        <div className="min-h-screen bg-gray-50 pt-24">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-white rounded-2xl shadow-xl p-12">
                <div className="bg-primary-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaShoppingCart className="text-4xl text-primary-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
                <p className="text-gray-600 mb-8">
                  Looks like you haven't added any products to your cart yet.
                  Explore our farm-fresh products and start shopping!
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center space-x-2 bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition duration-300"
                >
                  <span>Browse Products</span>
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold">Cart Items</h2>
                </div>

                {cart.length === 0 ? (
                  <div className="p-12 text-center">
                    <p className="text-gray-500">No items in cart</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="p-6 border-b last:border-0 hover:bg-gray-50 transition duration-300"
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Product Image */}
                        <div className="md:w-32 h-32">
                          <img
                            src={item.image || 'https://images.unsplash.com/photo-1587049352851-8d4e8915a7c4?w=300&h=300&fit=crop'}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div>
                              <Link 
                                to={`/product/${item.id}`} 
                                className="text-lg font-semibold hover:text-primary-600 transition"
                              >
                                {item.name}
                              </Link>
                              <p className="text-sm text-gray-600 mb-2">by {item.farmer}</p>
                              {item.isOrganic && (
                                <span className="inline-block bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                                  Organic
                                </span>
                              )}
                            </div>
                            <div className="text-right mt-2 md:mt-0">
                              <div className="text-xl font-bold text-primary-600">
                                ${(item.price * (item.quantity || 1)).toFixed(2)}
                              </div>
                              <div className="text-sm text-gray-500">
                                ${item.price} each
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                  onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                                  className="px-3 py-1 hover:bg-gray-100 transition"
                                  aria-label="Decrease quantity"
                                >
                                  <FaMinus className="text-xs" />
                                </button>
                                <span className="px-4 py-1 border-x border-gray-300 min-w-[40px] text-center">
                                  {item.quantity || 1}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                                  className="px-3 py-1 hover:bg-gray-100 transition"
                                  aria-label="Increase quantity"
                                >
                                  <FaPlus className="text-xs" />
                                </button>
                              </div>

                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700 transition flex items-center space-x-1"
                                aria-label="Remove item"
                              >
                                <FaTrash className="text-sm" />
                                <span className="text-sm">Remove</span>
                              </button>

                              {/* Save for Later Button */}
                              <button
                                onClick={() => handleSaveForLater(item)}
                                className="text-gray-500 hover:text-primary-600 transition flex items-center space-x-1"
                                aria-label="Save for later"
                              >
                                <FaClock className="text-sm" />
                                <span className="text-sm">Save for later</span>
                              </button>
                            </div>
                          </div>

                          {/* Delivery Estimate */}
                          <div className="mt-4 flex items-center space-x-2 text-sm text-green-600">
                            <span>✓ Delivery by {new Date(Date.now() + 5*24*60*60*1000).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Saved for Later Section */}
              {savedForLater.length > 0 && (
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mt-8">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">Saved for Later ({savedForLater.length})</h2>
                  </div>

                  {savedForLater.map((item) => (
                    <div key={item.id} className="p-6 border-b last:border-0 hover:bg-gray-50 transition duration-300">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Product Image */}
                        <div className="md:w-24 h-24">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-sm text-gray-600">by {item.farmer}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-primary-600">${item.price}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 mt-4">
                            <button
                              onClick={() => handleMoveToCart(item)}
                              className="text-primary-600 hover:text-primary-700 transition text-sm font-medium"
                            >
                              Move to Cart
                            </button>
                            <button
                              onClick={() => handleRemoveFromSaved(item.id)}
                              className="text-red-500 hover:text-red-700 transition text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Continue Shopping */}
              <div className="mt-6">
                <Link
                  to="/products"
                  className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition"
                >
                  <FaArrowLeft />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartCount} items)</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{cartTotal > 50 ? 'Free' : '$5.99'}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (8%)</span>
                    <span>${(cartTotal * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary-600">
                        ${(cartTotal + (cartTotal > 50 ? 0 : 5.99) + (cartTotal * 0.08)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Free Shipping Progress */}
                {cartTotal < 50 && (
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2 text-blue-600 mb-2">
                      <span className="text-sm font-medium">
                        Add ${(50 - cartTotal).toFixed(2)} more for free shipping
                      </span>
                    </div>
                    <div className="h-2 bg-blue-100 rounded-full">
                      <div 
                        className="h-2 bg-blue-600 rounded-full" 
                        style={{ width: `${(cartTotal / 50) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Checkout Button */}
                <Link
                  to="/checkout"
                  className="w-full bg-primary-600 text-white py-4 rounded-xl font-semibold hover:bg-primary-700 transition duration-300 mb-4 flex items-center justify-center space-x-2"
                >
                  <span>Proceed to Checkout</span>
                  <FaArrowRight />
                </Link>

                {/* Security Info */}
                <div className="text-center mt-4">
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <FaLock />
                      <span>Secure Checkout</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Wrap with AuthGuard for protection
const CartPageWithAuth = () => (
  <AuthGuard message="Please login to view your cart and checkout">
    <CartPage />
  </AuthGuard>
);

export default CartPageWithAuth;