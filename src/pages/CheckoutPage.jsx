import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaMapMarkerAlt, FaTruck, FaCreditCard, FaPaypal,
  FaApple, FaGoogle, FaShieldAlt, FaLock, FaCheckCircle
} from 'react-icons/fa';

import LoadingSpinner from '../components/LoadingSpinner';
import HelmetTags from '../components/SEO/HelmetTags';
import { useCart } from '../context/CartContext';
import  {useAuth}  from '../context/AuthContext';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    // Shipping Address
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    
    // Payment Info
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    
    // Billing Address
    sameAsShipping: true,
    billingFirstName: '',
    billingLastName: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZipCode: '',
    billingCountry: 'USA'
  });

  const shippingCost = cartTotal > 50 ? 0 : 5.99;
  const tax = cartTotal * 0.08;
  const finalTotal = cartTotal + shippingCost + tax;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmitShipping = (e) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    setStep(3);
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    
    // Simulate order processing
    setTimeout(() => {
      setLoading(false);
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/orders');
    }, 2000);
  };

  const steps = [
    { number: 1, name: 'Shipping', icon: FaTruck },
    { number: 2, name: 'Payment', icon: FaCreditCard },
    { number: 3, name: 'Review', icon: FaCheckCircle }
  ];

  return (
    <>
      <HelmetTags title="Checkout | AgroValue Connect" />
      
      <div className="min-h-screen bg-gray-50">
       
        <div className="container mx-auto px-4 py-8 mt-16">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

          {/* Progress Steps */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex justify-between">
              {steps.map((s, index) => {
                const Icon = s.icon;
                return (
                  <div key={s.number} className="flex-1 relative">
                    {index < steps.length - 1 && (
                      <div className={`absolute top-5 left-1/2 w-full h-1 ${
                        step > s.number ? 'bg-primary-600' : 'bg-gray-200'
                      }`} />
                    )}
                    <div className="relative flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step >= s.number 
                          ? 'bg-primary-600 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        <Icon />
                      </div>
                      <span className={`mt-2 text-sm font-medium ${
                        step >= s.number ? 'text-primary-600' : 'text-gray-500'
                      }`}>
                        {s.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Forms */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-primary-600" />
                      Shipping Address
                    </h2>

                    <form onSubmit={handleSubmitShipping}>
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address *
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Apartment, suite, etc. (optional)
                        </label>
                        <input
                          type="text"
                          name="apartment"
                          value={formData.apartment}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City *
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            State *
                          </label>
                          <select
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          >
                            <option value="">Select state</option>
                            <option value="CA">California</option>
                            <option value="NY">New York</option>
                            <option value="TX">Texas</option>
                            <option value="FL">Florida</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            ZIP Code *
                          </label>
                          <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={() => navigate('/cart')}
                          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300"
                        >
                          Back to Cart
                        </button>
                        <button
                          type="submit"
                          className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition duration-300"
                        >
                          Continue to Payment
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                      <FaCreditCard className="mr-2 text-primary-600" />
                      Payment Method
                    </h2>

                    {/* Payment Method Selection */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <button
                        onClick={() => setPaymentMethod('card')}
                        className={`p-4 border-2 rounded-xl flex flex-col items-center space-y-2 transition duration-300 ${
                          paymentMethod === 'card' 
                            ? 'border-primary-600 bg-primary-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <FaCreditCard className={`text-2xl ${
                          paymentMethod === 'card' ? 'text-primary-600' : 'text-gray-400'
                        }`} />
                        <span className="text-sm font-medium">Credit Card</span>
                      </button>

                      <button
                        onClick={() => setPaymentMethod('paypal')}
                        className={`p-4 border-2 rounded-xl flex flex-col items-center space-y-2 transition duration-300 ${
                          paymentMethod === 'paypal' 
                            ? 'border-primary-600 bg-primary-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <FaPaypal className={`text-2xl ${
                          paymentMethod === 'paypal' ? 'text-primary-600' : 'text-gray-400'
                        }`} />
                        <span className="text-sm font-medium">PayPal</span>
                      </button>

                      <button
                        onClick={() => setPaymentMethod('apple')}
                        className={`p-4 border-2 rounded-xl flex flex-col items-center space-y-2 transition duration-300 ${
                          paymentMethod === 'apple' 
                            ? 'border-primary-600 bg-primary-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <FaApple className={`text-2xl ${
                          paymentMethod === 'apple' ? 'text-primary-600' : 'text-gray-400'
                        }`} />
                        <span className="text-sm font-medium">Apple Pay</span>
                      </button>
                    </div>

                    {paymentMethod === 'card' && (
                      <form onSubmit={handleSubmitPayment}>
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Card Number *
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>

                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Name on Card *
                          </label>
                          <input
                            type="text"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Expiry Date *
                            </label>
                            <input
                              type="text"
                              name="expiry"
                              placeholder="MM/YY"
                              value={formData.expiry}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              CVV *
                            </label>
                            <input
                              type="text"
                              name="cvv"
                              placeholder="123"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                          </div>
                        </div>

                        {/* Billing Address */}
                        <div className="mb-6">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              name="sameAsShipping"
                              checked={formData.sameAsShipping}
                              onChange={handleInputChange}
                              className="rounded text-primary-600"
                            />
                            <span>Billing address same as shipping</span>
                          </label>
                        </div>

                        {!formData.sameAsShipping && (
                          <div className="space-y-6 mb-8">
                            <h3 className="font-semibold">Billing Address</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  First Name *
                                </label>
                                <input
                                  type="text"
                                  name="billingFirstName"
                                  value={formData.billingFirstName}
                                  onChange={handleInputChange}
                                  required
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Last Name *
                                </label>
                                <input
                                  type="text"
                                  name="billingLastName"
                                  value={formData.billingLastName}
                                  onChange={handleInputChange}
                                  required
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Address *
                              </label>
                              <input
                                type="text"
                                name="billingAddress"
                                value={formData.billingAddress}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                              />
                            </div>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300"
                          >
                            Back to Shipping
                          </button>
                          <button
                            type="submit"
                            className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition duration-300"
                          >
                            Review Order
                          </button>
                        </div>
                      </form>
                    )}

                    {paymentMethod === 'paypal' && (
                      <div className="text-center py-12">
                        <FaPaypal className="text-6xl text-blue-600 mx-auto mb-4" />
                        <p className="text-gray-600 mb-6">
                          You'll be redirected to PayPal to complete your payment.
                        </p>
                        <button
                          onClick={() => setStep(3)}
                          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                          Continue with PayPal
                        </button>
                      </div>
                    )}

                    {paymentMethod === 'apple' && (
                      <div className="text-center py-12">
                        <FaApple className="text-6xl text-gray-800 mx-auto mb-4" />
                        <p className="text-gray-600 mb-6">
                          Pay quickly and securely with Apple Pay.
                        </p>
                        <button
                          onClick={() => setStep(3)}
                          className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition duration-300 flex items-center justify-center space-x-2 mx-auto"
                        >
                          <FaApple />
                          <span>Pay with Apple Pay</span>
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h2 className="text-2xl font-bold mb-6">Review Your Order</h2>

                    <div className="space-y-6 mb-8">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2 flex items-center">
                          <FaMapMarkerAlt className="mr-2 text-primary-600" />
                          Shipping Address
                        </h3>
                        <p className="text-gray-600">
                          {formData.firstName} {formData.lastName}<br />
                          {formData.address}<br />
                          {formData.city}, {formData.state} {formData.zipCode}<br />
                          {formData.country}
                        </p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2 flex items-center">
                          <FaCreditCard className="mr-2 text-primary-600" />
                          Payment Method
                        </h3>
                        <p className="text-gray-600">
                          {paymentMethod === 'card' && 'Credit Card ending in ' + formData.cardNumber.slice(-4)}
                          {paymentMethod === 'paypal' && 'PayPal'}
                          {paymentMethod === 'apple' && 'Apple Pay'}
                        </p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Order Items</h3>
                        {cart.map(item => (
                          <div key={item.id} className="flex justify-between py-2">
                            <span>{item.name} x {item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <button
                        onClick={() => setStep(2)}
                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300"
                      >
                        Back to Payment
                      </button>
                      <button
                        onClick={handlePlaceOrder}
                        disabled={loading}
                        className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        {loading ? (
                          <>
                            <LoadingSpinner size="small" color="white" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <span>Place Order • ${finalTotal.toFixed(2)}</span>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                {cart.map(item => (
                  <div key={item.id} className="flex items-center space-x-4 py-3 border-b">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="font-semibold text-primary-600">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}

                <div className="space-y-3 mt-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary-600">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <FaLock />
                    <span>Secure Checkout</span>
                    <FaShieldAlt />
                    <span>SSL Encrypted</span>
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

export default CheckoutPage;