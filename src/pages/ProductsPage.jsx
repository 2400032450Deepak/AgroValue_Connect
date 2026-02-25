import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, FaFilter, FaTh, FaList, FaChevronDown,
  FaImage, FaStar
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import HelmetTags from '../components/SEO/HelmetTags';
import ImageWithFallback from '../components/ImageWithFallback';
import toast from 'react-hot-toast';

// Use reliable Unsplash image as fallback
const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1587049352851-8d4e8915a7c4?w=300&h=300&fit=crop';

const ProductsPage = () => {
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 100],
    organic: false,
    inStock: false,
    freeShipping: false
  });

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'honey', name: 'Honey & Syrups' },
    { id: 'pickles', name: 'Pickles & Preserves' },
    { id: 'oils', name: 'Cold-Pressed Oils' },
    { id: 'spices', name: 'Spices & Masalas' },
    { id: 'dryfruits', name: 'Dry Fruits & Nuts' },
    { id: 'jaggery', name: 'Jaggery & Sweeteners' },
    { id: 'grains', name: 'Organic Grains' }
  ];

  useEffect(() => {
    // Simulate API call with reliable image URLs
    setTimeout(() => {
      setProducts([
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
          inStock: true,
          freeShipping: true
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
          inStock: true,
          freeShipping: true
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
          inStock: true,
          freeShipping: false
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
          inStock: true,
          freeShipping: true
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
          inStock: true,
          freeShipping: false
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
          tags: ['raw', 'pulses', 'premium'],
          inStock: true,
          freeShipping: true
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
          inStock: true,
          freeShipping: true
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
          inStock: true,
          freeShipping: false
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProducts = products
    .filter(product => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !product.farmer.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (filters.organic && !product.isOrganic) return false;
      if (filters.inStock && !product.inStock) return false;
      if (filters.freeShipping && !product.freeShipping) return false;
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
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

  return (
    <>
      <HelmetTags 
        title="Farm Fresh Products | AgroValue Connect"
        description="Browse our collection of value-added farm products directly from farmers. Organic honey, pickles, oils, spices and more."
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* <Navbar /> */}

        {/* Header */}
        <div className="bg-primary-700 text-white py-12 mt-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Farm Fresh Products</h1>
            <p className="text-xl opacity-90">Discover value-added products directly from farmers</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products or farmers..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg border transition duration-300 ${
                    showFilters 
                      ? 'bg-primary-600 text-white border-primary-600' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <FaFilter />
                  <span>Filters</span>
                </button>
              </div>
            </div>

            {/* Filters Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-6 border-t overflow-hidden"
                >
                  <div className="grid md:grid-cols-4 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Price Range</h4>
                      <div className="space-y-2">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={filters.priceRange[1]}
                          onChange={(e) => setFilters({...filters, priceRange: [0, parseInt(e.target.value)]})}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>$0</span>
                          <span>${filters.priceRange[1]}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Product Type</h4>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={filters.organic}
                            onChange={(e) => setFilters({...filters, organic: e.target.checked})}
                            className="rounded text-primary-600"
                          />
                          <span>Organic Only</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={filters.inStock}
                            onChange={(e) => setFilters({...filters, inStock: e.target.checked})}
                            className="rounded text-primary-600"
                          />
                          <span>In Stock</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={filters.freeShipping}
                            onChange={(e) => setFilters({...filters, freeShipping: e.target.checked})}
                            className="rounded text-primary-600"
                          />
                          <span>Free Shipping</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Categories</h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {categories.slice(1).map(cat => (
                          <label key={cat.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              className="rounded text-primary-600"
                              checked={selectedCategory === cat.id}
                              onChange={() => setSelectedCategory(cat.id)}
                            />
                            <span>{cat.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Rating</h4>
                      <div className="space-y-2">
                        {[4, 3, 2, 1].map(rating => (
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
                    <button
                      onClick={() => setFilters({
                        priceRange: [0, 100],
                        organic: false,
                        inStock: false,
                        freeShipping: false
                      })}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition duration-300"
                    >
                      Apply Filters
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition duration-300 ${
                  selectedCategory === cat.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              <span className="font-semibold">{filteredProducts.length}</span> products found
            </p>
          </div>

          {/* Products Grid - Only Grid View Now */}
          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="large" />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* No Results */}
          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <FaImage className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductsPage;