import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaLeaf, FaUser, FaEnvelope, FaLock, FaTractor, 
  FaShoppingBag, FaEye, FaEyeSlash, FaCheckCircle,
  FaGoogle, FaFacebook, FaApple, FaArrowRight
} from 'react-icons/fa';
import  {useAuth}  from '../context/AuthContext';
import HelmetTags from '../components/SEO/HelmetTags';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();
  
  // Get role from URL query params
  const queryParams = new URLSearchParams(location.search);
  const defaultRole = queryParams.get('role') || 'buyer';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: defaultRole,
    agreeTerms: false,
    newsletter: true
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms agreement
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);
    try {
      const result = await register(formData);
      if (result.success) {
        // toast.success('Registration successful! Please check your email to verify your account.');
        navigate('/login');
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = (provider) => {
    toast.success(`Registering with ${provider}...`);
    // Implement social registration logic here
  };

  const passwordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: 'No password' };
    
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/(?=.*[a-z])/.test(password)) strength += 25;
    if (/(?=.*[A-Z])/.test(password)) strength += 25;
    if (/(?=.*\d)/.test(password)) strength += 25;
    
    if (strength <= 25) return { strength, label: 'Weak', color: 'bg-red-500' };
    if (strength <= 50) return { strength, label: 'Fair', color: 'bg-yellow-500' };
    if (strength <= 75) return { strength, label: 'Good', color: 'bg-blue-500' };
    return { strength, label: 'Strong', color: 'bg-green-500' };
  };

  const strength = passwordStrength();

  return (
    <>
      <HelmetTags 
        title="Create Account | AgroValue Connect"
        description="Join AgroValue Connect as a farmer or buyer. Start your journey to connect with global markets today."
      />
      
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl w-full"
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Left Column - Branding */}
              <div className="bg-gradient-to-br from-primary-600 to-primary-800 p-8 text-white hidden md:block">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-8">
                      <FaLeaf className="text-3xl" />
                      <span className="font-bold text-2xl">AgroValue Connect</span>
                    </div>
                    
                    <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
                    <p className="text-primary-100 mb-8">
                      Create an account and start your journey with thousands of farmers and buyers worldwide.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <FaCheckCircle className="text-secondary-400 text-xl flex-shrink-0" />
                        <span>Access to global markets</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FaCheckCircle className="text-secondary-400 text-xl flex-shrink-0" />
                        <span>Direct farmer-buyer connection</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FaCheckCircle className="text-secondary-400 text-xl flex-shrink-0" />
                        <span>Quality verified products</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FaCheckCircle className="text-secondary-400 text-xl flex-shrink-0" />
                        <span>24/7 customer support</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <p className="text-primary-200 text-sm">
                      Already have an account?{' '}
                      <Link to="/login" className="text-white font-semibold hover:underline">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Registration Form */}
              <div className="p-8 md:p-10">
                <div className="text-center md:text-left mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
                  <p className="text-gray-600 mt-1">Join as a farmer or buyer</p>
                </div>

                {/* Role Selection Tabs */}
                <div className="flex space-x-4 mb-6">
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, role: 'farmer' }))}
                    className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition duration-300 ${
                      formData.role === 'farmer'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <FaTractor />
                    <span className="font-medium">Farmer</span>
                  </button>
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, role: 'buyer' }))}
                    className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition duration-300 ${
                      formData.role === 'buyer'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <FaShoppingBag />
                    <span className="font-medium">Buyer</span>
                  </button>
                </div>

                {/* Social Registration */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <button
                    onClick={() => handleSocialRegister('Google')}
                    className="flex items-center justify-center py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition duration-300"
                  >
                    <FaGoogle className="text-red-500" />
                  </button>
                  <button
                    onClick={() => handleSocialRegister('Facebook')}
                    className="flex items-center justify-center py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition duration-300"
                  >
                    <FaFacebook className="text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleSocialRegister('Apple')}
                    className="flex items-center justify-center py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition duration-300"
                  >
                    <FaApple className="text-gray-900" />
                  </button>
                </div>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or register with email</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition duration-300 ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition duration-300 ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                        className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition duration-300 ${
                          errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    
                    {/* Password Strength Meter */}
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500">Password strength:</span>
                          <span className={`text-xs font-semibold ${strength.color.replace('bg-', 'text-')}`}>
                            {strength.label}
                          </span>
                        </div>
                        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${strength.color} transition-all duration-300`}
                            style={{ width: `${strength.strength}%` }}
                          />
                        </div>
                      </div>
                    )}
                    
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition duration-300 ${
                          errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                    )}
                  </div>

                  {/* Terms and Newsletter */}
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-600">
                        I agree to the{' '}
                        <a href="#" className="text-primary-600 hover:underline">Terms of Service</a>{' '}
                        and{' '}
                        <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>
                      </span>
                    </label>
                    {errors.agreeTerms && (
                      <p className="text-sm text-red-600">{errors.agreeTerms}</p>
                    )}

                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleChange}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-600">
                        Send me newsletters and updates
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary-600 text-white py-4 rounded-xl font-semibold hover:bg-primary-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <LoadingSpinner size="small" color="white" />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <span>Create Account</span>
                        <FaArrowRight />
                      </>
                    )}
                  </button>
                </form>

                {/* Mobile Sign In Link */}
                <div className="mt-6 text-center md:hidden">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary-600 font-semibold hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>

                {/* Role-specific info */}
                {formData.role === 'farmer' && (
                  <div className="mt-6 p-4 bg-primary-50 rounded-xl">
                    <h4 className="font-semibold text-primary-800 mb-2">Farmer Benefits:</h4>
                    <ul className="text-sm text-primary-600 space-y-1">
                      <li>• List unlimited products</li>
                      <li>• Access to global buyers</li>
                      <li>• No listing fees for first 3 months</li>
                      <li>• Free marketing tools</li>
                      <li>• Dedicated farmer support</li>
                    </ul>
                  </div>
                )}

                {formData.role === 'buyer' && (
                  <div className="mt-6 p-4 bg-primary-50 rounded-xl">
                    <h4 className="font-semibold text-primary-800 mb-2">Buyer Benefits:</h4>
                    <ul className="text-sm text-primary-600 space-y-1">
                      <li>• Direct from farmers</li>
                      <li>• Quality guaranteed</li>
                      <li>• Free shipping on orders $50+</li>
                      <li>• 30-day returns</li>
                      <li>• 24/7 customer support</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="text-xs text-gray-500">
              <span className="block font-semibold text-gray-700">✓ Secure SSL</span>
              Encrypted checkout
            </div>
            <div className="text-xs text-gray-500">
              <span className="block font-semibold text-gray-700">💰 Money-back</span>
              30-day guarantee
            </div>
            <div className="text-xs text-gray-500">
              <span className="block font-semibold text-gray-700">🛡️ Verified</span>
              Farmers & products
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Register;