import { useContext } from 'react';
import { useWishlist } from '../context/WishlistContext';

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export default useWishlist;