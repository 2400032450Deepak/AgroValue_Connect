import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHome, FaBox, FaShoppingCart, FaUsers, 
  FaChartLine, FaCog, FaSignOutAlt, FaTractor,
  FaUser, FaHeart, FaClipboardList, FaStore,
  FaChevronLeft, FaChevronRight, FaBell,
  FaQuestionCircle, FaFileAlt, FaStar, FaLeaf
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ role }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Menu items based on role
  const menuItems = {
    farmer: [
      { icon: FaHome, label: 'Dashboard', path: '/farmer' },
      { icon: FaBox, label: 'My Products', path: '/farmer/products' },
      { icon: FaShoppingCart, label: 'Orders', path: '/farmer/orders' },
      { icon: FaChartLine, label: 'Analytics', path: '/farmer/analytics' },
      { icon: FaClipboardList, label: 'Inventory', path: '/farmer/inventory' },
      { icon: FaStar, label: 'Reviews', path: '/farmer/reviews' },
      { icon: FaStore, label: 'Store Settings', path: '/farmer/store' },
      { icon: FaCog, label: 'Settings', path: '/farmer/settings' },
    ],
    buyer: [
      { icon: FaHome, label: 'Dashboard', path: '/buyer' },
      { icon: FaStore, label: 'Browse Products', path: '/products' },
      { icon: FaShoppingCart, label: 'My Orders', path: '/buyer/orders' },
      { icon: FaHeart, label: 'Wishlist', path: '/wishlist' },
      { icon: FaStar, label: 'My Reviews', path: '/buyer/reviews' },
      { icon: FaCog, label: 'Settings', path: '/buyer/settings' },
    ],
    admin: [
      { icon: FaHome, label: 'Dashboard', path: '/admin' },
      { icon: FaUsers, label: 'Users', path: '/admin/users' },
      { icon: FaBox, label: 'Products', path: '/admin/products' },
      { icon: FaShoppingCart, label: 'Transactions', path: '/admin/transactions' },
      { icon: FaChartLine, label: 'Reports', path: '/admin/reports' },
      { icon: FaFileAlt, label: 'Verifications', path: '/admin/verifications' },
      { icon: FaBell, label: 'Notifications', path: '/admin/notifications' },
      { icon: FaCog, label: 'Settings', path: '/admin/settings' },
    ]
  };

  // Bottom menu items (common for all roles)
  const bottomMenuItems = [
    { icon: FaQuestionCircle, label: 'Help', path: '/help' },
    { icon: FaFileAlt, label: 'Resources', path: `/${role}-resources` },
  ];

  const items = menuItems[role] || [];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <motion.aside
      initial={{ width: collapsed ? 80 : 280 }}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-screen bg-white shadow-2xl z-40 flex flex-col"
    >
      {/* Logo Section */}
      <div className={`p-6 border-b flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed && (
          <Link to="/" className="flex items-center space-x-2">
            <FaLeaf className="text-3xl text-primary-600" />
            <span className="font-bold text-xl text-gray-800">AgroValue</span>
          </Link>
        )}
        {collapsed && (
          <Link to="/">
            <FaLeaf className="text-3xl text-primary-600" />
          </Link>
        )}
        
        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 transition duration-300 hidden lg:block"
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      {/* User Profile Section */}
      <div className={`p-6 border-b ${collapsed ? 'text-center' : ''}`}>
        <div className={`flex ${collapsed ? 'flex-col' : 'items-center space-x-4'}`}>
          <div className="relative">
            <img
              src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=4caf50&color=fff`}
              alt={user?.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-primary-200"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          
          {!collapsed && (
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 truncate">{user?.name || 'User'}</h3>
              <p className="text-sm text-gray-500 capitalize">{role}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto py-6">
        <nav className="space-y-1 px-3">
          {items.map((item, index) => {
            const Icon = item.icon;
            
            return (
              <NavLink
                key={index}
                to={item.path}
                end={item.path === `/${role}`}
                className={({ isActive }) =>
                  `flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} 
                  px-4 py-3 rounded-xl transition-all duration-300 group relative ${
                    isActive
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`text-xl ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-primary-600'}`} />
                    
                    {!collapsed && (
                      <span className="font-medium">{item.label}</span>
                    )}

                    {collapsed && (
                      <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                        {item.label}
                      </span>
                    )}

                    {isActive && !collapsed && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 w-1 h-8 bg-secondary-500 rounded-r-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="my-6 border-t border-gray-200 mx-6"></div>

        {/* Bottom Menu */}
        <nav className="space-y-1 px-3">
          {bottomMenuItems.map((item, index) => {
            const Icon = item.icon;
            
            return (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} 
                  px-4 py-3 rounded-xl transition-all duration-300 group relative ${
                    isActive
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`text-xl ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-primary-600'}`} />
                    
                    {!collapsed && (
                      <span className="font-medium">{item.label}</span>
                    )}

                    {collapsed && (
                      <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                        {item.label}
                      </span>
                    )}

                    {isActive && !collapsed && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 w-1 h-8 bg-secondary-500 rounded-r-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-6 border-t">
        <button
          onClick={handleLogout}
          className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} 
            w-full px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-300 group relative`}
        >
          <FaSignOutAlt className="text-xl" />
          {!collapsed && <span className="font-medium">Logout</span>}
          
          {collapsed && (
            <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
              Logout
            </span>
          )}
        </button>

        {/* Version Info */}
        {!collapsed && (
          <p className="text-xs text-center text-gray-400 mt-4">
            Version 1.0.0
          </p>
        )}
      </div>

      {/* Notification Badge (for demo) */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-20 left-20 bg-white rounded-xl shadow-xl p-4 min-w-[300px] z-50"
          >
            <h4 className="font-semibold mb-3">Notifications</h4>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium">New Order Received</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium">Payment Confirmed</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
};

export default Sidebar;