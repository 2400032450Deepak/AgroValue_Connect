import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaHeart, FaTrash, FaShoppingCart, 
  FaArrowLeft, FaRegHeart 
} from 'react-icons/fa';
import { useCart } from '../hooks/useCart';
import { useAuth } from "../context/AuthContext";
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';
import { useWishlist } from '../context/WishlistContext';

// Temporary wishlist data until we implement proper wishlist context
const WishlistPage = () => {
  const { wishlist, removeFromWishlist, clearWishlist, addToWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  // const { wishlist, setWishlist } = useWishlist();
  
  

 const handleRemoveFromWishlist = (productId) => {
  removeFromWishlist(productId);
  // toast.success('Removed from wishlist');
};

  const handleMoveToCart = (product) => {
  try {
    // Add to cart
    addToCart(product, 1);
    
    // Remove from wishlist
    removeFromWishlist(product.id);
    
    toast.success(`Added ${product.name} to cart`);
  } catch (error) {
    console.error('Error moving to cart:', error);
    toast.error('Failed to move item to cart');
  }
};

  const handleClearWishlist = () => {
    if (!wishlist || wishlist.length === 0) return;
   clearWishlist();
    toast.success('Wishlist cleared');
  };

  if (!isAuthenticated) {
    return (
      <>
        
        <div className="min-h-screen bg-gray-50 pt-24">
          <div className="max-w-7xl mx-auto px-4 py-16 text-center">
            <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHeart className="text-3xl text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Login to View Wishlist</h2>
              <p className="text-gray-600 mb-8">Please login to see your saved items</p>
              <Link
                to="/login"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition duration-300"
              >
                Login Now
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (wishlist.length === 0) {
    return (
      <>
        
        <div className="min-h-screen bg-gray-50 pt-24">
          <div className="max-w-7xl mx-auto px-4 py-16 text-center">
            <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaRegHeart className="text-3xl text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Wishlist is Empty</h2>
              <p className="text-gray-600 mb-8">Save items you love to your wishlist</p>
              <Link
                to="/products"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition duration-300"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
              <p className="text-gray-600 mt-1">{wishlist.length} items saved</p>
            </div>
            
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <button
                onClick={handleClearWishlist}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition duration-300"
              >
                <FaTrash />
                <span>Clear All</span>
              </button>
              <Link
                to="/products"
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition duration-300"
              >
                <span>Continue Shopping</span>
                <FaArrowLeft className="rotate-180" />
              </Link>
            </div>
          </div>

          {/* Wishlist Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden relative group"
              >
                {/* Product Image */}
                <Link to={`/product/${product.id}`} className="block relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-semibold bg-red-500 px-3 py-1 rounded-full text-sm">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </Link>

                {/* Product Info */}
                <div className="p-4">
                  <Link to={`/product/${product.id}`} className="block">
                    <h3 className="font-semibold text-gray-800 mb-1 hover:text-primary-600 transition">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">by {product.farmer}</p>
                    <div className="flex items-center mb-3">
                      <div className="flex text-yellow-400 text-sm">
                        {[...Array(5)].map((_, i) => (
                          <FaHeart
                            key={i}
                            className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-2">({product.reviews})</span>
                    </div>
                  </Link>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-primary-600">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through ml-2">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleMoveToCart(product)}
                        disabled={!product.inStock}
                        className={`p-2 rounded-lg transition duration-300 ${
                          product.inStock
                            ? 'bg-primary-600 text-white hover:bg-primary-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        title={product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      >
                        <FaShoppingCart />
                      </button>
                      <button
                        onClick={() => handleRemoveFromWishlist(product.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition duration-300"
                        title="Remove from Wishlist"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WishlistPage;