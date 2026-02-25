import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaStar, FaStarHalfAlt, FaRegStar, FaUser,
  FaThumbsUp, FaReply, FaFlag, FaCheckCircle,
  FaFilter, FaSearch, FaChartLine
} from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import { useFarmerData } from '../hooks/useFarmerData';
import toast from 'react-hot-toast';

const FarmerReviews = () => {
  const { products } = useFarmerData();
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Sample reviews data (in real app, this would come from API/storage)
  const [reviews, setReviews] = useState([
    {
      id: 1,
      productId: 1,
      productName: 'Organic Wild Honey',
      user: 'John Smith',
      rating: 5,
      date: '2024-02-15',
      comment: 'Excellent quality honey! Very pure and authentic taste. Will definitely buy again.',
      verified: true,
      helpful: 12,
      replies: []
    },
    {
      id: 2,
      productId: 1,
      productName: 'Organic Wild Honey',
      user: 'Maria Garcia',
      rating: 4,
      date: '2024-02-10',
      comment: 'Good product, delivery was fast. Would recommend.',
      verified: true,
      helpful: 8,
      replies: []
    },
    {
      id: 3,
      productId: 2,
      productName: 'Handmade Mango Pickle',
      user: 'Ahmed Hassan',
      rating: 5,
      date: '2024-02-08',
      comment: 'Just like homemade! Perfect spice level. My family loved it.',
      verified: true,
      helpful: 15,
      replies: []
    },
    {
      id: 4,
      productId: 3,
      productName: 'Cold-Pressed Almond Oil',
      user: 'Sarah Johnson',
      rating: 4,
      date: '2024-02-05',
      comment: 'Good quality oil, but packaging could be better.',
      verified: true,
      helpful: 5,
      replies: []
    },
    {
      id: 5,
      productId: 2,
      productName: 'Handmade Mango Pickle',
      user: 'Priya Patel',
      rating: 5,
      date: '2024-02-03',
      comment: 'Best pickle I\'ve had outside of India! Authentic taste.',
      verified: true,
      helpful: 22,
      replies: []
    }
  ]);

  // Filter and sort reviews
  const filteredReviews = reviews
    .filter(review => {
      const matchesProduct = selectedProduct === 'all' || review.productId === parseInt(selectedProduct);
      const matchesSearch = review.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           review.comment.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesProduct && matchesSearch;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        case 'helpful':
          return b.helpful - a.helpful;
        default:
          return 0;
      }
    });

  const averageRating = (productId) => {
    const productReviews = reviews.filter(r => r.productId === productId);
    if (productReviews.length === 0) return 0;
    const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / productReviews.length).toFixed(1);
  };

  const getProductStats = (productId) => {
    const productReviews = reviews.filter(r => r.productId === productId);
    const avgRating = productReviews.length > 0 
      ? (productReviews.reduce((acc, r) => acc + r.rating, 0) / productReviews.length).toFixed(1)
      : 0;
    
    return {
      total: productReviews.length,
      average: avgRating,
      fiveStar: productReviews.filter(r => r.rating === 5).length,
      fourStar: productReviews.filter(r => r.rating === 4).length,
      threeStar: productReviews.filter(r => r.rating === 3).length,
      twoStar: productReviews.filter(r => r.rating === 2).length,
      oneStar: productReviews.filter(r => r.rating === 1).length
    };
  };

  const handleHelpful = (reviewId) => {
    setReviews(prev => prev.map(r => 
      r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r
    ));
    toast.success('Thanks for your feedback!');
  };

  const handleReply = (reviewId) => {
    // In a real app, this would open a reply modal
    toast.success('Reply feature coming soon!');
  };

  const handleReport = (reviewId) => {
    toast.success('Review reported to admin');
  };

  // Overall stats
  const totalReviews = reviews.length;
  const averageRatingOverall = (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1);
  const fiveStarCount = reviews.filter(r => r.rating === 5).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar role="farmer" />
      
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Product Reviews</h1>
            <p className="text-gray-600">See what customers are saying about your products</p>
          </div>
          
          <div className="bg-white px-6 py-3 rounded-xl shadow-sm">
            <span className="text-2xl font-bold text-primary-600 mr-2">{averageRatingOverall}</span>
            <span className="text-gray-500">/ 5.0</span>
            <span className="ml-4 text-sm text-gray-500">({totalReviews} reviews)</span>
          </div>
        </div>

        {/* Rating Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 col-span-2">
            <h3 className="font-semibold mb-4">Rating Distribution</h3>
            {[5,4,3,2,1].map(rating => {
              const count = reviews.filter(r => r.rating === rating).length;
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              return (
                <div key={rating} className="flex items-center space-x-2 mb-2">
                  <span className="text-sm w-12">{rating} star</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-yellow-400 rounded-full" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12">{count}</span>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Reviews</span>
                <span className="font-bold">{totalReviews}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">5-Star Reviews</span>
                <span className="font-bold text-green-600">{fiveStarCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Response Rate</span>
                <span className="font-bold">85%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold mb-4">Product Performance</h3>
            <div className="space-y-2">
              {products.slice(0, 3).map(p => {
                const stats = getProductStats(p.id);
                return (
                  <div key={p.id} className="flex justify-between items-center">
                    <span className="text-sm truncate max-w-[120px]">{p.name}</span>
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 text-xs mr-1" />
                      <span className="text-sm font-medium">{stats.average}</span>
                      <span className="text-xs text-gray-500 ml-1">({stats.total})</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search reviews by customer or comment..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 min-w-[200px]"
            >
              <option value="all">All Products</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} (⭐ {averageRating(p.id)})
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 min-w-[150px]"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
              <option value="helpful">Most Helpful</option>
            </select>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{review.productName}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => {
                        if (i < Math.floor(review.rating)) {
                          return <FaStar key={i} className="text-yellow-400" />;
                        } else if (i === Math.floor(review.rating) && review.rating % 1 !== 0) {
                          return <FaStarHalfAlt key={i} className="text-yellow-400" />;
                        } else {
                          return <FaRegStar key={i} className="text-gray-300" />;
                        }
                      })}
                    </div>
                    <span className="text-sm text-gray-500">{review.rating}.0</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mt-2 md:mt-0">
                  {new Date(review.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>

              <div className="flex items-start space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaUser className="text-primary-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{review.user}</span>
                    {review.verified && (
                      <span className="flex items-center text-green-600 text-xs">
                        <FaCheckCircle className="mr-1" />
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 mt-2">{review.comment}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <button
                  onClick={() => handleHelpful(review.id)}
                  className="flex items-center space-x-2 text-gray-500 hover:text-primary-600 transition"
                >
                  <FaThumbsUp />
                  <span>Helpful ({review.helpful})</span>
                </button>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleReply(review.id)}
                    className="flex items-center space-x-1 text-gray-500 hover:text-primary-600 transition"
                  >
                    <FaReply />
                    <span>Reply</span>
                  </button>
                  <button
                    onClick={() => handleReport(review.id)}
                    className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition"
                  >
                    <FaFlag />
                    <span>Report</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {filteredReviews.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              <FaStar className="text-5xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No reviews found</p>
              <p className="text-sm text-gray-400 mt-2">Try adjusting your filters</p>
            </div>
          )}
        </div>

        {/* Analytics Link */}
        <div className="mt-8 text-center">
          <Link
            to="/farmer/analytics"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold"
          >
            <FaChartLine />
            <span>View Detailed Analytics</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FarmerReviews;