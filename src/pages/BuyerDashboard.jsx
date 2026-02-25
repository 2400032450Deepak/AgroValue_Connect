import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, FaFilter, FaShoppingCart, FaHeart, 
  FaRegHeart, FaStar, FaMapMarkerAlt, FaTruck,
  FaCheckCircle, FaClock, FaBox, FaGlobe,
  FaLeaf, FaAward, FaStore, FaComment
} from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';
import LocationSearch from "../components/LocationSearch";
import { useLocation } from "react-router-dom";
import BuyerReviews from './BuyerReviews';
import toast from 'react-hot-toast';

const BuyerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [cartItems, setCartItems] = useState(3);
  const [location, setLocation] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [tempLocation, setTempLocation] = useState(null);
  const routerLocation = useLocation();
  const navigate = useNavigate();

  // Load saved location from localStorage on mount
  useEffect(() => {
    const savedLocation = localStorage.getItem('deliveryLocation');
    if (savedLocation) {
      setLocation(JSON.parse(savedLocation));
    }
  }, []);

  const categories = [
    { id: 'all', name: 'All Products', icon: FaBox },
    { id: 'honey', name: 'Honey', icon: FaLeaf },
    { id: 'pickles', name: 'Pickles', icon: FaLeaf },
    { id: 'oils', name: 'Oils', icon: FaLeaf },
    { id: 'spices', name: 'Spices', icon: FaLeaf },
    { id: 'dryfruits', name: 'Dry Fruits', icon: FaLeaf },
    { id: 'organic', name: 'Organic', icon: FaAward }
  ];

  const products = [
  {
    id: 1,
    name: 'Organic Wild Honey',
    farmer: 'Rajesh Kumar',
    location: 'Uttarakhand, India',
    price: 12.99,
    originalPrice: 15.99,
    rating: 4.8,
    reviews: 128,
    image: 'https://media.istockphoto.com/id/842769074/photo/sweet-honeycomb-and-wooden-honey-dripping.jpg?s=612x612&w=0&k=20&c=GJwPKmbX02jYByrjIWLOf8xTHWqQEy3vN6cYajM6p7o=',
    isOrganic: true,
    isNew: true,
    discount: 20,
    category: 'honey',
    tags: ['raw', 'unfiltered', 'natural'],
    shipping: 'Free shipping',
    minOrder: 1,
    inStock: 150
  },
  {
    id: 2,
    name: 'Handcrafted Mango Pickle',
    farmer: 'Priya Sharma',
    location: 'Andhra Pradesh, India',
    price: 8.99,
    rating: 4.9,
    reviews: 256,
    image: 'https://avakaayapickleshouse.com/wp-content/uploads/2024/10/Mango-pickle-6_2_11zon.webp',
    isOrganic: true,
    category: 'pickles',
    tags: ['traditional', 'spicy', 'homemade'],
    shipping: 'Free shipping',
    minOrder: 2,
    inStock: 75
  },
  {
    id: 3,
    name: 'Cold-Pressed Almond Oil',
    farmer: 'Amit Patel',
    location: 'California, USA',
    price: 15.99,
    rating: 4.7,
    reviews: 89,
    image: 'https://healthyroots.com/cdn/shop/files/ColdPressedAlmondoils.jpg?v=1763794735',
    isOrganic: false,
    isNew: true,
    category: 'oils',
    tags: ['virgin', 'chemical-free'],
    shipping: '$5 shipping',
    minOrder: 1,
    inStock: 30
  },
  {
    id: 4,
    name: 'Traditional Jaggery',
    farmer: 'Sunita Devi',
    location: 'Uttar Pradesh, India',
    price: 6.99,
    originalPrice: 8.99,
    rating: 4.6,
    reviews: 167,
    image: 'https://img.freepik.com/free-vector/organic-jaggery-powder-blocks-with-fresh-sugar-cane-color-background-realistic-vector-illustration_1284-78025.jpg',
    isOrganic: true,
    discount: 15,
    category: 'jaggery',
    tags: ['organic', 'chemical-free'],
    shipping: 'Free shipping',
    minOrder: 3,
    inStock: 200
  },
  {
    id: 5,
    name: 'Spice Mix - Garam Masala',
    farmer: 'Meera Singh',
    location: 'Rajasthan, India',
    price: 7.99,
    rating: 4.7,
    reviews: 198,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop',
    isOrganic: true,
    category: 'spices',
    tags: ['authentic', 'fresh'],
    shipping: '$3 shipping',
    minOrder: 2,
    inStock: 120
  },
  {
    id: 6,
    name: 'Premium Chana Dal',
    farmer: 'Krishna Reddy',
    location: 'Karnataka, India',
    price: 12.99,
    rating: 4.7,
    reviews: 82,
    image: 'https://m.media-amazon.com/images/I/51vdr3+AsWL._AC_UF894,1000_QL80_.jpg',
    isOrganic: true,
    category: 'pulses',
    tags: ['authentic', 'raw'],
    shipping: '$2 shipping',
    minOrder: 50,
    inStock: 1000
  },
  {
    id: 7,
    name: 'Organic Basmati Rice',
    farmer: 'Harpreet Singh',
    location: 'Punjab, India',
    price: 24.99,
    rating: 4.8,
    reviews: 145,
    image: 'https://www.greendna.in/cdn/shop/products/basmati6_945x.jpg?v=1742283085',
    isOrganic: true,
    category: 'grains',
    tags: ['aged', 'aromatic'],
    shipping: 'Free shipping',
    minOrder: 1,
    inStock: 500
  },
  {
    id: 8,
    name: 'Wood Pressed Groundnut Oil',
    farmer: 'Venkatesh Rao',
    location: 'Tamil Nadu, India',
    price: 19.99,
    rating: 4.6,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop',
    isOrganic: true,
    category: 'oils',
    tags: ['cold-pressed', 'chemical-free'],
    shipping: '$5 shipping',
    minOrder: 1,
    inStock: 200
  }
];

  const filteredProducts = products
    .filter(product => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !product.farmer.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        default:
          return b.reviews - a.reviews;
      }
    });

  const recommendations = [
    {
      name: "Based on your interests",
      products: products.slice(0, 3)
    },
    {
      name: "Farmers near you",
      products: products.slice(2, 5)
    },
    {
      name: "Trending now",
      products: [products[1], products[3], products[4]]
    }
  ];

  const handleLocationSelect = (loc) => {
    setTempLocation(loc);
  };

  const handleSaveLocation = () => {
    if (tempLocation) {
      setLocation(tempLocation);
      localStorage.setItem('deliveryLocation', JSON.stringify(tempLocation));
      setShowLocationModal(false);
      setTempLocation(null);
      toast.success('Delivery location saved successfully!');
    }
  };

  const handleCancelLocation = () => {
    setShowLocationModal(false);
    setTempLocation(null);
  };

  // Handle /buyer/reviews route without disturbing dashboard
  if (routerLocation.pathname === "/buyer/reviews") {
    return <BuyerReviews />;
  }

  return (
    <>
      {/* Location Modal */}
      <AnimatePresence>
        {showLocationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={handleCancelLocation}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white w-full max-w-lg rounded-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">
                Select Delivery Location 🌍
              </h2>

              <LocationSearch onSelect={handleLocationSelect} />

              {tempLocation && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-medium text-green-800">Selected Location:</p>
                  <p className="text-sm text-gray-600">{tempLocation.display_name}</p>
                </div>
              )}

              <div className="flex justify-end mt-6 space-x-3">
                <button
                  onClick={handleCancelLocation}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSaveLocation}
                  disabled={!tempLocation}
                  className={`px-6 py-2 rounded-lg font-semibold transition ${
                    tempLocation 
                      ? 'bg-primary-600 text-white hover:bg-primary-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Save Location
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="min-h-screen bg-gray-50">
        <Sidebar role="buyer" />
        
        <div className="ml-64 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Buyer Dashboard</h1>
              <p className="text-gray-600">Discover fresh farm products from around the world</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowLocationModal(true)}
                  className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow hover:shadow-md transition duration-300"
                >
                  <FaMapMarkerAlt className="text-primary-600" />
                  <span className="max-w-[200px] truncate">
                    {location 
                        ? location.display_name?.split(',')[0] || 'Location set' 
                        : "Select Delivery Location"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Hero Search Section */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 mb-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Find the finest farm products</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products, farmers, or categories..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="bg-secondary-500 px-8 py-4 rounded-xl font-semibold hover:bg-secondary-600 transition duration-300 flex items-center justify-center space-x-2">
                <FaSearch />
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Categories</h3>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition duration-300"
              >
                <FaFilter />
                <span>Filters</span>
              </button>
            </div>
            
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl whitespace-nowrap transition duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-primary-50'
                    }`}
                  >
                    <Icon />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-xl shadow-lg p-6 mb-8 overflow-hidden"
              >
                <div className="grid md:grid-cols-4 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Price Range</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded text-primary-600" />
                        <span>Under $10</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded text-primary-600" />
                        <span>$10 - $25</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded text-primary-600" />
                        <span>$25 - $50</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded text-primary-600" />
                        <span>$50+</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Certifications</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded text-primary-600" />
                        <span>Organic</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded text-primary-600" />
                        <span>Fair Trade</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded text-primary-600" />
                        <span>Non-GMO</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded text-primary-600" />
                        <span>Rainforest Alliance</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Shipping</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded text-primary-600" />
                        <span>Free Shipping</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded text-primary-600" />
                        <span>Express Delivery</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded text-primary-600" />
                        <span>International</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Rating</h4>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map(rating => (
                        <label key={rating} className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded text-primary-600" />
                          <div className="flex items-center">
                            {[...Array(rating)].map((_, i) => (
                              <FaStar key={i} className="text-yellow-400 text-sm" />
                            ))}
                            <span className="ml-1">& up</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6 pt-6 border-t">
                  <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                    Clear All
                  </button>
                  <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition duration-300">
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sort Options */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              <span className="font-semibold">{filteredProducts.length}</span> products found
            </p>
            
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Personalized Recommendations */}
          <section className="mb-12">
            <h3 className="text-2xl font-bold mb-6">Recommended for You</h3>
            
            <div className="space-y-8">
              {recommendations.map((rec, index) => (
                <div key={index}>
                  <h4 className="text-lg font-semibold mb-4 text-gray-700">{rec.name}</h4>
                  <div className="grid md:grid-cols-3 gap-6">
                    {rec.products.map((product) => (
                      <div key={product.id} className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
                        <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="flex-1">
                          <h5 className="font-semibold">{product.name}</h5>
                          <p className="text-sm text-gray-600">{product.farmer}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-bold text-primary-600">${product.price}</span>
                            <Link 
                              to={`/product/${product.id}`} 
                              className="text-primary-600 hover:text-primary-700"
                            >
                              <FaShoppingCart />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Farmer Spotlight */}
          <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold mb-6">Featured Farmers</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Rajesh Kumar',
                  location: 'Uttarakhand, India',
                  products: 12,
                  rating: 4.9,
                  image: 'https://randomuser.me/api/portraits/men/1.jpg',
                  specialty: 'Organic Honey'
                },
                {
                  name: 'Priya Sharma',
                  location: 'Andhra Pradesh, India',
                  products: 8,
                  rating: 4.8,
                  image: 'https://randomuser.me/api/portraits/women/2.jpg',
                  specialty: 'Traditional Pickles'
                },
                {
                  name: 'Amit Patel',
                  location: 'California, USA',
                  products: 15,
                  rating: 4.7,
                  image: 'https://randomuser.me/api/portraits/men/3.jpg',
                  specialty: 'Cold-Pressed Oils'
                }
              ].map((farmer, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-gray-50 rounded-xl p-6 text-center"
                >
                  <img
                    src={farmer.image}
                    alt={farmer.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h4 className="font-semibold text-lg">{farmer.name}</h4>
                  <p className="text-gray-600 text-sm mb-2">{farmer.location}</p>
                  <p className="text-primary-600 font-medium mb-3">{farmer.specialty}</p>
                  
                  <div className="flex justify-center items-center space-x-2 mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < Math.floor(farmer.rating) ? 'text-yellow-400' : 'text-gray-300'} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{farmer.rating}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>{farmer.products} Products</span>
                    <span>⭐ Top Rated</span>
                  </div>
                  
                  <button className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition duration-300">
                    Visit Store
                  </button>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Recently Viewed */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Recently Viewed</h3>
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {products.slice(0, 5).map((product) => (
                <Link 
                  key={product.id} 
                  to={`/product/${product.id}`}
                  className="shrink-0 w-48 bg-white rounded-lg shadow p-3 hover:shadow-md transition"
                >
                  <img src={product.image} alt={product.name} className="w-full h-24 object-cover rounded-lg mb-2" />
                  <h5 className="font-medium text-sm">{product.name}</h5>
                  <p className="text-primary-600 font-semibold">${product.price}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default BuyerDashboard;