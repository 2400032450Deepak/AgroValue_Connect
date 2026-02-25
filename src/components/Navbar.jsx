import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaLeaf, FaUser, FaShoppingCart, FaBars, FaTimes,
  FaTractor, FaHandshake, FaBlog, FaQuestionCircle,
  FaChevronDown
} from 'react-icons/fa';
import { useAuth } from "../context/AuthContext";
import { useCart } from '../hooks/useCart';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Check user role
  const isFarmer = user?.role === 'farmer';
  const isAdmin = user?.role === 'admin';
  const isBuyer = user?.role === 'buyer';

  // Check scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Check if a route is active
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { name: 'Home', path: '/', icon: FaLeaf },
    { name: 'Products', path: '/products', icon: FaShoppingCart },
    { 
      name: 'For Farmers', 
      icon: FaTractor,
      dropdown: [
        { name: 'Farmer Guide', path: '/farmer-resources' },
        { name: 'Success Stories', path: '/stories' }
      ]
    },
    { 
      name: 'For Buyers', 
      icon: FaHandshake,
      dropdown: [
        { name: 'How to Buy', path: '/buyer-resources' },
        { name: 'FAQ', path: '/help' }
      ]
    },
  ];

  // Navbar background
  const navbarBg = 'bg-white shadow-md';

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${navbarBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 flex-shrink-0"
            >
              <FaLeaf className="text-2xl text-primary-600" />
              <span className="font-bold text-xl text-gray-800 hidden sm:block">
                AgroValue<span className="text-secondary-500">Connect</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1 px-8">
              <div className="flex items-center space-x-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = item.path ? isActive(item.path) : false;
                  
                  if (item.dropdown) {
                    return (
                      <div
                        key={item.name}
                        className="relative"
                        onMouseEnter={() => setActiveDropdown(item.name)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <button
                          className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                            activeDropdown === item.name
                              ? 'text-primary-600 bg-primary-50'
                              : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                          }`}
                        >
                          <Icon className="text-base" />
                          <span>{item.name}</span>
                          <FaChevronDown className={`text-xs transition-transform duration-200 ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`} />
                        </button>
                        
                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100"
                            >
                              {item.dropdown.map((dropItem) => (
                                <Link
                                  key={dropItem.name}
                                  to={dropItem.path}
                                  className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                                    isActive(dropItem.path)
                                      ? 'text-primary-600 bg-primary-50 font-medium'
                                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                                  }`}
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  {dropItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        active
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="text-base" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              {/* Cart Icon - Show only for buyers */}
              {isBuyer && (
                <Link
                  to="/cart"
                  className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  aria-label="Shopping cart"
                >
                  <FaShoppingCart className="text-xl text-gray-700" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === 'user' ? null : 'user')}
                    className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold text-sm">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {activeDropdown === 'user' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100"
                      >
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="font-medium text-gray-800 text-sm">{user?.name}</p>
                          <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                        </div>
                        
                        <Link 
                          to={user?.role === 'farmer' ? '/farmer' : user?.role === 'buyer' ? '/buyer' : '/admin'}
                          className="block px-4 py-2 text-sm text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors duration-200"
                          onClick={() => setActiveDropdown(null)}
                        >
                          Dashboard
                        </Link>
                        
                        <Link 
                          to="/profile" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors duration-200"
                          onClick={() => setActiveDropdown(null)}
                        >
                          Profile
                        </Link>
                        
                        {/* Orders link - Show only for buyers */}
                        {isBuyer && (
                          <Link 
                            to="/orders" 
                            className="block px-4 py-2 text-sm text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors duration-200"
                            onClick={() => setActiveDropdown(null)}
                          >
                            My Orders
                          </Link>
                        )}
                        
                        <hr className="my-1 border-gray-100" />
                        
                        <button 
                          onClick={() => {
                            handleLogout();
                            setActiveDropdown(null);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                        >
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-medium bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <FaTimes className="text-xl text-gray-700" />
                ) : (
                  <FaBars className="text-xl text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-100"
            >
              <div className="max-w-7xl mx-auto px-4 py-3">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  
                  if (item.dropdown) {
                    return (
                      <div key={item.name} className="mb-1">
                        <div className="flex items-center justify-between px-4 py-2 text-gray-700 font-medium">
                          <div className="flex items-center space-x-3">
                            <Icon className="text-base" />
                            <span>{item.name}</span>
                          </div>
                        </div>
                        <div className="ml-8 pl-4 border-l-2 border-gray-100">
                          {item.dropdown.map((dropItem) => (
                            <Link
                              key={dropItem.name}
                              to={dropItem.path}
                              className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                                isActive(dropItem.path)
                                  ? 'text-primary-600 font-medium'
                                  : 'text-gray-600 hover:text-primary-600'
                              }`}
                              onClick={() => setIsOpen(false)}
                            >
                              {dropItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-2 transition-colors duration-200 ${
                        isActive(item.path)
                          ? 'text-primary-600 bg-primary-50 font-medium rounded-lg'
                          : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="text-base" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
                
                {!isAuthenticated && (
                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                    <Link
                      to="/login"
                      className="block w-full text-center px-4 py-2 text-primary-600 border border-primary-600 rounded-lg font-medium hover:bg-primary-50 transition duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block w-full text-center px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;