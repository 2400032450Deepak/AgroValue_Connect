import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom'; 
import { 
  FaStar, FaShoppingCart, FaHeart, FaRegHeart, 
  FaShare, FaEye, FaLock, FaSpinner
} from 'react-icons/fa';
import { useCart } from '../hooks/useCart';
import { useAuth } from "../context/AuthContext";
import toast from 'react-hot-toast';
import ImageWithFallback from './ImageWithFallback';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product, onAddToCart, onAddToWishlist }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  // Check user role
  const isFarmer = user?.role === 'farmer';
  const isAdmin = user?.role === 'admin';
  const isBuyer = user?.role === 'buyer';

  // Determine if user can buy (only buyers can purchase)
  const canBuy = isAuthenticated && isBuyer;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart', {
        icon: '🔒',
        duration: 4000,
      });
      navigate('/login?redirect=/cart');
      return;
    }

    if (!isBuyer) {
      toast.error('Only buyers can add items to cart', {
        icon: '⚠️',
        duration: 4000,
      });
      return;
    }

    if (isAddingToCart) return;
    
    setIsAddingToCart(true);
    
    try {
      const success = addToCart(product, 1);
      
      if (success) {
        toast.success(`Added ${product.name} to cart`);
        if (onAddToCart) onAddToCart(product);
      }
    } catch (error) {
      toast.error('Failed to add to cart');
    } finally {
      setTimeout(() => setIsAddingToCart(false), 500);
    }
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Please login to add items to wishlist");
      navigate('/login?redirect=/wishlist');
      return;
    }

    if (!isBuyer) {
      toast.error('Only buyers can add items to wishlist', {
        icon: '⚠️',
        duration: 4000,
      });
      return;
    }

    if (wishlist.some(p => p.id === product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleViewDetails = (e) => {
    e.preventDefault();
    navigate(`/product/${product.id}`);
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const url = `${window.location.origin}/product/${product.id}`;
    navigator.clipboard.writeText(url);
    toast.success('Product link copied to clipboard!');
  };

  // Determine button text based on user role
  const getButtonText = () => {
    if (!isAuthenticated) return 'Login to Buy';
    if (isFarmer) return 'View Only (Farmer)';
    if (isAdmin) return 'View Only (Admin)';
    return 'Add to Cart';
  };

  // Determine if button should be disabled
  const isButtonDisabled = !isAuthenticated || isAddingToCart || !isBuyer;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleViewDetails}
    >
      {/* Product Image */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {product.isOrganic && (
            <motion.span
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-primary-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg"
            >
              🌱 Organic
            </motion.span>
          )}
          {product.isNew && (
            <motion.span
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-secondary-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg"
            >
              ✨ New
            </motion.span>
          )}
          {product.discount && (
            <motion.span
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg"
            >
              🔥 {product.discount}% OFF
            </motion.span>
          )}
          {/* Role badge */}
          {isFarmer && (
            <motion.span
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-gray-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg"
            >
              🚜 Farmer View
            </motion.span>
          )}
          {isAdmin && (
            <motion.span
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg"
            >
              👑 Admin View
            </motion.span>
          )}
        </div>

        {/* Quick Actions - Hide for non-buyers */}
        {isBuyer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 right-4 flex space-x-2"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white p-2 rounded-full shadow-lg hover:bg-primary-50 transition-colors duration-300 disabled:opacity-50"
              onClick={handleLike}
              aria-label="Wishlist toggle"
            >
              {wishlist.some(p => p.id === product.id) ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-gray-600" />
              )}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white p-2 rounded-full shadow-lg hover:bg-primary-50 transition-colors duration-300"
              onClick={handleShare}
              aria-label="Share product"
            >
              <FaShare className="text-gray-600" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white p-2 rounded-full shadow-lg hover:bg-primary-50 transition-colors duration-300"
              onClick={handleViewDetails}
              aria-label="View details"
            >
              <FaEye className="text-gray-600" />
            </motion.button>
          </motion.div>
        )}

        {/* Auth Required Overlay */}
        {!isAuthenticated && isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              navigate('/login?redirect=/products');
            }}
          >
            <div className="text-white text-center">
              <FaLock className="text-3xl mx-auto mb-2" />
              <p className="text-sm font-medium">Login to purchase</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary-600 transition-colors duration-300 line-clamp-1">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 flex items-center">
              <span className="font-medium text-primary-600">{product.farmer}</span>
              <span className="mx-2">•</span>
              <span>{product.location}</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary-600">${product.price?.toFixed(2)}</p>
            {product.originalPrice && (
              <p className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</p>
            )}
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
           ({typeof product.reviews === 'number' ? product.reviews : (product.reviews?.length || 0)} reviews)
          </span>
        </div>

        {/* Tags/Categories */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {product.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
            {product.tags.length > 3 && (
              <span className="text-xs text-gray-500">+{product.tags.length - 3}</span>
            )}
          </div>
        )}

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: canBuy && !isAddingToCart ? 1.02 : 1 }}
          whileTap={{ scale: canBuy && !isAddingToCart ? 0.98 : 1 }}
          className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition duration-300 shadow-lg ${
            !isAuthenticated 
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : isFarmer || isAdmin
                ? 'bg-gray-500 text-white cursor-not-allowed'
                : isAddingToCart
                  ? 'bg-primary-400 text-white cursor-wait'
                  : 'bg-primary-600 text-white hover:bg-primary-700 hover:shadow-xl'
          }`}
          onClick={handleAddToCart}
          disabled={isButtonDisabled}
          aria-label="Add to cart"
        >
          {isAddingToCart ? (
            <>
              <FaSpinner className="animate-spin" />
              <span>Adding...</span>
            </>
          ) : (
            <>
              <FaShoppingCart />
              <span>{getButtonText()}</span>
            </>
          )}
        </motion.button>

        {/* Auth Message */}
        {!isAuthenticated && (
          <p className="text-xs text-center text-gray-500 mt-2">
            <FaLock className="inline mr-1" />
            Please <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate('/login?redirect=/products');
              }} 
              className="text-primary-600 hover:underline"
            >
              login
            </button> to purchase
          </p>
        )}

        {/* Role-based message */}
        {(isFarmer || isAdmin) && isAuthenticated && (
          <p className="text-xs text-center text-gray-500 mt-2">
            <span className="text-gray-400">You are viewing as {isFarmer ? 'farmer' : 'admin'}. </span>
            <Link to="/register?role=buyer" className="text-primary-600 hover:underline">
              Switch to buyer account
            </Link>
          </p>
        )}

        {/* Farmer Verification */}
        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Verified Farmer</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>Free Shipping</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;