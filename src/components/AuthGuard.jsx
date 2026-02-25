import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom'; // Added Link import
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaLock } from 'react-icons/fa';

const AuthGuard = ({ children, message = "Please login to access this page" }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaLock className="text-3xl text-primary-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-8">{message}</p>
          
          <div className="space-y-4">
            {/* Changed <a> to <Link> - prevents page reload */}
            <Link
              to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
              className="block w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition duration-300"
            >
              Login to Continue
            </Link>
            <Link
              to="/register"
              className="block w-full border border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition duration-300"
            >
              Create Account
            </Link>
          </div>
          
          <p className="mt-6 text-sm text-gray-500">
            Don't worry, we'll save your items for after you login
          </p>
        </div>
      </motion.div>
    );
  }

  return children;
};

export default AuthGuard;