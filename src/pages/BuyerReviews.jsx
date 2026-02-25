import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaStarHalfAlt, FaRegStar, FaEdit, FaTrash } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';

const BuyerReviews = () => {
  // Sample user reviews
  const reviews = [
    {
      id: 1,
      productName: 'Organic Wild Honey',
      productImage: 'https://media.istockphoto.com/id/842769074/photo/sweet-honeycomb-and-wooden-honey-dripping.jpg?s=612x612&w=0&k=20&c=GJwPKmbX02jYByrjIWLOf8xTHWqQEy3vN6cYajM6p7o=',
      farmer: 'Rajesh Kumar',
      rating: 5,
      date: '2024-02-15',
      comment: 'Excellent quality honey! Very pure and authentic taste. Will definitely buy again.',
      helpful: 12
    },
    {
      id: 2,
      productName: 'Handmade Mango Pickle',
      productImage: 'https://avakaayapickleshouse.com/wp-content/uploads/2024/10/Mango-pickle-6_2_11zon.webp',
      farmer: 'Priya Sharma',
      rating: 4,
      date: '2024-02-10',
      comment: 'Good taste, reminds me of homemade pickles. Could be slightly spicier.',
      helpful: 8
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar role="buyer" />
      <div className="ml-64 p-8">
        <h1 className="text-3xl font-bold mb-8">My Reviews</h1>

        {reviews.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <FaStar className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Reviews Yet</h3>
            <p className="text-gray-600">You haven't written any reviews. Share your experience with other buyers!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={review.productImage}
                    alt={review.productName}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{review.productName}</h3>
                        <p className="text-sm text-gray-600">by {review.farmer}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                          <FaEdit />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                          <FaTrash />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mt-2">
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
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                    </div>

                    <p className="text-gray-700 mt-3">{review.comment}</p>

                    <div className="flex items-center mt-4 text-sm text-gray-500">
                      <button className="hover:text-primary-600 transition">
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerReviews;