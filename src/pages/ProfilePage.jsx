import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaCamera, FaSave, FaKey, FaBell, FaShieldAlt,
  FaGlobe, FaLanguage, FaMoon, FaSun, FaEdit
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import HelmetTags from '../components/SEO/HelmetTags';
import  {useAuth}  from '../context/AuthContext';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    zipCode: user?.zipCode || '',
    country: user?.country || 'USA',
    bio: user?.bio || '',
    avatar: user?.avatar || '',
    language: user?.language || 'English',
    timezone: user?.timezone || 'EST',
    notifications: {
      email: true,
      sms: false,
      push: true,
      promotions: false
    }
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    await updateProfile(formData);
    setLoading(false);
    setEditMode(false);
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    toast.success('Password changed successfully');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: FaUser },
    { id: 'security', name: 'Security', icon: FaShieldAlt },
    { id: 'notifications', name: 'Notifications', icon: FaBell },
    { id: 'preferences', name: 'Preferences', icon: FaGlobe }
  ];

  return (
    <>
      <HelmetTags title="My Profile | AgroValue Connect" />
      
      <div className="min-h-screen bg-gray-50">
       

        <div className="container mx-auto px-4 py-8 mt-16">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                {/* Profile Summary */}
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <img
                      src={formData.avatar || `https://ui-avatars.com/api/?name=${formData.name}&background=4caf50&color=fff`}
                      alt={formData.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <button className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition duration-300">
                      <FaCamera className="text-sm" />
                    </button>
                  </div>
                  <h2 className="text-xl font-bold">{formData.name}</h2>
                  <p className="text-gray-600 capitalize">{user?.role}</p>
                </div>

                {/* Navigation Tabs */}
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition duration-300 ${
                          activeTab === tab.id
                            ? 'bg-primary-600 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Icon />
                        <span>{tab.name}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                {activeTab === 'profile' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">Profile Information</h2>
                      <button
                        onClick={() => setEditMode(!editMode)}
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300"
                      >
                        <FaEdit />
                        <span>{editMode ? 'Cancel' : 'Edit Profile'}</span>
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            disabled={!editMode}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={!editMode}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            disabled={!editMode}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Country
                          </label>
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            disabled={!editMode}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                          >
                            <option value="USA">United States</option>
                            <option value="Canada">Canada</option>
                            <option value="UK">United Kingdom</option>
                            <option value="Australia">Australia</option>
                            <option value="India">India</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          disabled={!editMode}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                        />
                      </div>

                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            disabled={!editMode}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            State
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            disabled={!editMode}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            ZIP Code
                          </label>
                          <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            disabled={!editMode}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          rows="4"
                          value={formData.bio}
                          onChange={handleInputChange}
                          disabled={!editMode}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                          placeholder="Tell us a little about yourself..."
                        />
                      </div>

                      {editMode && (
                        <div className="flex justify-end">
                          <button
                            onClick={handleSaveProfile}
                            disabled={loading}
                            className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition duration-300 disabled:opacity-50"
                          >
                            {loading ? <LoadingSpinner size="small" color="white" /> : <FaSave />}
                            <span>Save Changes</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'security' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h2 className="text-2xl font-bold mb-6">Security Settings</h2>

                    <div className="space-y-6">
                      <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Current Password
                            </label>
                            <input
                              type="password"
                              name="currentPassword"
                              value={passwordData.currentPassword}
                              onChange={handlePasswordChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              New Password
                            </label>
                            <input
                              type="password"
                              name="newPassword"
                              value={passwordData.newPassword}
                              onChange={handlePasswordChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Confirm New Password
                            </label>
                            <input
                              type="password"
                              name="confirmPassword"
                              value={passwordData.confirmPassword}
                              onChange={handlePasswordChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                          </div>

                          <button
                            onClick={handleChangePassword}
                            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition duration-300"
                          >
                            Update Password
                          </button>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
                        <p className="text-gray-600 mb-4">
                          Add an extra layer of security to your account by enabling two-factor authentication.
                        </p>
                        <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition duration-300">
                          Enable 2FA
                        </button>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold mb-4">Login Sessions</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                            <div>
                              <p className="font-medium">Current Session</p>
                              <p className="text-sm text-gray-600">Chrome on Windows • New York, USA</p>
                            </div>
                            <span className="text-green-600 text-sm">Active now</span>
                          </div>
                          <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                            <div>
                              <p className="font-medium">Previous Session</p>
                              <p className="text-sm text-gray-600">Safari on iPhone • Los Angeles, USA</p>
                            </div>
                            <span className="text-gray-500 text-sm">2 days ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'notifications' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h2 className="text-2xl font-bold mb-6">Notification Preferences</h2>

                    <div className="space-y-6">
                      <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold mb-4">Email Notifications</h3>
                        
                        <div className="space-y-3">
                          <label className="flex items-center justify-between p-4 bg-white rounded-lg">
                            <div>
                              <p className="font-medium">Order Updates</p>
                              <p className="text-sm text-gray-600">Receive updates about your orders</p>
                            </div>
                            <input
                              type="checkbox"
                              name="notifications.email"
                              checked={formData.notifications.email}
                              onChange={handleInputChange}
                              className="toggle-checkbox"
                            />
                          </label>

                          <label className="flex items-center justify-between p-4 bg-white rounded-lg">
                            <div>
                              <p className="font-medium">Promotions & Deals</p>
                              <p className="text-sm text-gray-600">Get special offers and discounts</p>
                            </div>
                            <input
                              type="checkbox"
                              name="notifications.promotions"
                              checked={formData.notifications.promotions}
                              onChange={handleInputChange}
                              className="toggle-checkbox"
                            />
                          </label>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold mb-4">Push Notifications</h3>
                        
                        <div className="space-y-3">
                          <label className="flex items-center justify-between p-4 bg-white rounded-lg">
                            <div>
                              <p className="font-medium">Order Status</p>
                              <p className="text-sm text-gray-600">Get real-time order updates</p>
                            </div>
                            <input
                              type="checkbox"
                              name="notifications.push"
                              checked={formData.notifications.push}
                              onChange={handleInputChange}
                              className="toggle-checkbox"
                            />
                          </label>

                          <label className="flex items-center justify-between p-4 bg-white rounded-lg">
                            <div>
                              <p className="font-medium">SMS Alerts</p>
                              <p className="text-sm text-gray-600">Receive text messages for important updates</p>
                            </div>
                            <input
                              type="checkbox"
                              name="notifications.sms"
                              checked={formData.notifications.sms}
                              onChange={handleInputChange}
                              className="toggle-checkbox"
                            />
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition duration-300">
                          Save Preferences
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'preferences' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h2 className="text-2xl font-bold mb-6">Preferences</h2>

                    <div className="space-y-6">
                      <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold mb-4">Language & Region</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Language
                            </label>
                            <select
                              name="language"
                              value={formData.language}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                              <option value="English">English</option>
                              <option value="Spanish">Spanish</option>
                              <option value="French">French</option>
                              <option value="German">German</option>
                              <option value="Hindi">Hindi</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Timezone
                            </label>
                            <select
                              name="timezone"
                              value={formData.timezone}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                              <option value="EST">Eastern Time</option>
                              <option value="CST">Central Time</option>
                              <option value="MST">Mountain Time</option>
                              <option value="PST">Pacific Time</option>
                              <option value="GMT">GMT</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Currency
                            </label>
                            <select
                              name="currency"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                              <option value="USD">USD ($)</option>
                              <option value="EUR">EUR (€)</option>
                              <option value="GBP">GBP (£)</option>
                              <option value="INR">INR (₹)</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold mb-4">Theme</h3>
                        
                        <div className="flex space-x-4">
                          <button className="flex items-center space-x-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition duration-300">
                            <FaMoon />
                            <span>Dark Mode</span>
                          </button>
                          <button className="flex items-center space-x-2 px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300">
                            <FaSun />
                            <span>Light Mode</span>
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition duration-300">
                          Save Preferences
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;