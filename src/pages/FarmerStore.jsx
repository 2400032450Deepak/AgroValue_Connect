import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaStore, FaSave, FaImage, FaMapMarkerAlt,
  FaPhone, FaEnvelope, FaGlobe, FaFacebook,
  FaTwitter, FaInstagram, FaYoutube, FaEdit,
  FaCheck, FaTimes, FaPlus, FaTrash
} from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const FarmerStore = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [storeData, setStoreData] = useState({
    storeName: user?.farmName || 'My Farm Store',
    tagline: 'Fresh from farm to your table',
    description: 'We are a family-owned farm dedicated to producing high-quality organic products using traditional methods passed down through generations.',
    logo: null,
    banner: null,
    address: user?.location || '123 Farm Road, Uttarakhand, India',
    phone: user?.phone || '+91 98765 43210',
    email: user?.email || 'farmer@example.com',
    website: 'www.myfarmstore.com',
    established: '2020',
    socialMedia: {
      facebook: 'https://facebook.com/myfarm',
      twitter: 'https://twitter.com/myfarm',
      instagram: 'https://instagram.com/myfarm',
      youtube: 'https://youtube.com/@myfarm'
    },
    businessHours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '10:00 AM - 4:00 PM',
      sunday: 'Closed'
    },
    shippingPolicy: 'Free shipping on orders over $50. International shipping available at additional cost. Orders are processed within 24-48 hours.',
    returnPolicy: '30-day return policy for unopened products. Perishable items cannot be returned. Please contact us within 48 hours of delivery for any issues.',
    certifications: ['Organic', 'Non-GMO', 'Fair Trade', 'Sustainable'],
    paymentMethods: ['Credit Card', 'PayPal', 'Bank Transfer', 'Cash on Delivery']
  });

  const [newCert, setNewCert] = useState('');
  const [newPayment, setNewPayment] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('farmerStoreData');
    if (saved) {
      setStoreData(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  const handleSave = () => {
    localStorage.setItem('farmerStoreData', JSON.stringify(storeData));
    setEditing(false);
    toast.success('Store settings saved successfully!');
  };

  const handleAddCertification = () => {
    if (newCert.trim()) {
      setStoreData({
        ...storeData,
        certifications: [...storeData.certifications, newCert.trim()]
      });
      setNewCert('');
    }
  };

  const handleRemoveCertification = (index) => {
    const updated = storeData.certifications.filter((_, i) => i !== index);
    setStoreData({ ...storeData, certifications: updated });
  };

  const handleAddPayment = () => {
    if (newPayment.trim()) {
      setStoreData({
        ...storeData,
        paymentMethods: [...storeData.paymentMethods, newPayment.trim()]
      });
      setNewPayment('');
    }
  };

  const handleRemovePayment = (index) => {
    const updated = storeData.paymentMethods.filter((_, i) => i !== index);
    setStoreData({ ...storeData, paymentMethods: updated });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar role="farmer" />
      
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Store Settings</h1>
            <p className="text-gray-600">Manage your store profile and preferences</p>
          </div>
          <button
            onClick={editing ? handleSave : () => setEditing(true)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition ${
              editing 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            {editing ? <FaCheck /> : <FaEdit />}
            <span>{editing ? 'Save Changes' : 'Edit Store'}</span>
          </button>
        </div>

        {/* Store Preview */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Banner */}
          <div className="h-48 bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 relative">
            {editing && (
              <button className="absolute bottom-4 right-4 bg-white text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition flex items-center space-x-2">
                <FaImage />
                <span>Change Banner</span>
              </button>
            )}
          </div>

          {/* Store Info */}
          <div className="px-8 pb-8 relative">
            {/* Logo */}
            <div className="flex flex-col md:flex-row items-start md:items-end -mt-16">
              <div className="w-32 h-32 bg-white rounded-2xl shadow-xl flex items-center justify-center mb-4 md:mb-0 border-4 border-white">
                {storeData.logo ? (
                  <img src={storeData.logo} alt="Logo" className="w-full h-full rounded-2xl object-cover" />
                ) : (
                  <FaStore className="text-5xl text-primary-600" />
                )}
              </div>
              
              <div className="md:ml-6 flex-1">
                {editing ? (
                  <input
                    type="text"
                    value={storeData.storeName}
                    onChange={(e) => setStoreData({...storeData, storeName: e.target.value})}
                    className="text-3xl font-bold text-gray-800 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                ) : (
                  <h2 className="text-3xl font-bold text-gray-800">{storeData.storeName}</h2>
                )}
                
                {editing ? (
                  <input
                    type="text"
                    value={storeData.tagline}
                    onChange={(e) => setStoreData({...storeData, tagline: e.target.value})}
                    className="text-gray-600 mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Store tagline"
                  />
                ) : (
                  <p className="text-gray-600 mt-1">{storeData.tagline}</p>
                )}
                
                <p className="text-sm text-gray-400 mt-1">Member since {storeData.established}</p>
              </div>
            </div>

            {/* About Section */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">About</h3>
              {editing ? (
                <textarea
                  value={storeData.description}
                  onChange={(e) => setStoreData({...storeData, description: e.target.value})}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              ) : (
                <p className="text-gray-600 leading-relaxed">{storeData.description}</p>
              )}
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <FaMapMarkerAlt className="text-primary-600 flex-shrink-0" />
                    {editing ? (
                      <input
                        type="text"
                        value={storeData.address}
                        onChange={(e) => setStoreData({...storeData, address: e.target.value})}
                        className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    ) : (
                      <span>{storeData.address}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-600">
                    <FaPhone className="text-primary-600 flex-shrink-0" />
                    {editing ? (
                      <input
                        type="text"
                        value={storeData.phone}
                        onChange={(e) => setStoreData({...storeData, phone: e.target.value})}
                        className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    ) : (
                      <span>{storeData.phone}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-600">
                    <FaEnvelope className="text-primary-600 flex-shrink-0" />
                    {editing ? (
                      <input
                        type="email"
                        value={storeData.email}
                        onChange={(e) => setStoreData({...storeData, email: e.target.value})}
                        className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    ) : (
                      <span>{storeData.email}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-600">
                    <FaGlobe className="text-primary-600 flex-shrink-0" />
                    {editing ? (
                      <input
                        type="text"
                        value={storeData.website}
                        onChange={(e) => setStoreData({...storeData, website: e.target.value})}
                        className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    ) : (
                      <span>{storeData.website}</span>
                    )}
                  </div>
                </div>

                {/* Social Media */}
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Social Media</h4>
                  <div className="flex space-x-4">
                    <a href={storeData.socialMedia.facebook} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:text-blue-700 text-2xl">
                      <FaFacebook />
                    </a>
                    <a href={storeData.socialMedia.twitter} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-400 hover:text-blue-500 text-2xl">
                      <FaTwitter />
                    </a>
                    <a href={storeData.socialMedia.instagram} target="_blank" rel="noopener noreferrer" 
                       className="text-pink-600 hover:text-pink-700 text-2xl">
                      <FaInstagram />
                    </a>
                    <a href={storeData.socialMedia.youtube} target="_blank" rel="noopener noreferrer" 
                       className="text-red-600 hover:text-red-700 text-2xl">
                      <FaYoutube />
                    </a>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
                <div className="space-y-2">
                  {Object.entries(storeData.businessHours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between items-center">
                      <span className="capitalize font-medium w-24">{day.slice(0,3)}</span>
                      {editing ? (
                        <input
                          type="text"
                          value={hours}
                          onChange={(e) => setStoreData({
                            ...storeData,
                            businessHours: {...storeData.businessHours, [day]: e.target.value}
                          })}
                          className="w-40 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      ) : (
                        <span className="text-gray-600">{hours}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Policies */}
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="text-lg font-semibold mb-2">Shipping Policy</h3>
                {editing ? (
                  <textarea
                    value={storeData.shippingPolicy}
                    onChange={(e) => setStoreData({...storeData, shippingPolicy: e.target.value})}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                ) : (
                  <p className="text-gray-600 text-sm leading-relaxed">{storeData.shippingPolicy}</p>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Return Policy</h3>
                {editing ? (
                  <textarea
                    value={storeData.returnPolicy}
                    onChange={(e) => setStoreData({...storeData, returnPolicy: e.target.value})}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                ) : (
                  <p className="text-gray-600 text-sm leading-relaxed">{storeData.returnPolicy}</p>
                )}
              </div>
            </div>

            {/* Certifications */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Certifications</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {storeData.certifications.map((cert, index) => (
                  <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                    <span>{cert}</span>
                    {editing && (
                      <button onClick={() => handleRemoveCertification(index)} className="ml-1 text-red-500 hover:text-red-700">
                        <FaTimes className="text-xs" />
                      </button>
                    )}
                  </span>
                ))}
              </div>
              {editing && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newCert}
                    onChange={(e) => setNewCert(e.target.value)}
                    placeholder="Add certification..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCertification()}
                  />
                  <button
                    onClick={handleAddCertification}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    <FaPlus />
                  </button>
                </div>
              )}
            </div>

            {/* Payment Methods */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Payment Methods</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {storeData.paymentMethods.map((method, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                    <span>{method}</span>
                    {editing && (
                      <button onClick={() => handleRemovePayment(index)} className="ml-1 text-red-500 hover:text-red-700">
                        <FaTimes className="text-xs" />
                      </button>
                    )}
                  </span>
                ))}
              </div>
              {editing && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newPayment}
                    onChange={(e) => setNewPayment(e.target.value)}
                    placeholder="Add payment method..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddPayment()}
                  />
                  <button
                    onClick={handleAddPayment}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    <FaPlus />
                  </button>
                </div>
              )}
            </div>

            {/* Preview Note */}
            {!editing && (
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <FaEdit className="inline mr-2" />
                  Click the "Edit Store" button to make changes to your store information.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerStore;