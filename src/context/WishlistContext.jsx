import React, { createContext, useContext, useState, useEffect } from "react";
import toast from 'react-hot-toast';

// Create context
export const WishlistContext = createContext();

// Custom hook for using wishlist context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage on initial mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Error parsing wishlist:', error);
        setWishlist([]);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product) => {
    setWishlist(prev => {
      // Check if product already exists in wishlist
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        toast.error(`${product.name} is already in wishlist`);
        return prev;
      }
      toast.success(`Added ${product.name} to wishlist`);
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist(prev => {
      const product = prev.find(p => p.id === id);
      if (product) {
        toast.success(`Removed ${product.name} from wishlist`);
      }
      return prev.filter(p => p.id !== id);
    });
  };

  const clearWishlist = () => {
    if (wishlist.length === 0) return;
    setWishlist([]);
    // toast.success('Wishlist cleared');
  };

  const isInWishlist = (id) => {
    return wishlist.some(p => p.id === id);
  };

  const wishlistCount = wishlist.length;

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    wishlistCount
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};