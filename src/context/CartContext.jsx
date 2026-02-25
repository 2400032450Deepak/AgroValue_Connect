import React, { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from "../context/AuthContext";

// Create and export the context
export const CartContext = createContext();

// Custom hook for using cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [guestCart, setGuestCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [savedItems, setSavedItems] = useState([]);
  
  // Use a ref to track if we're currently adding to prevent double additions
  const isAddingRef = useRef(false);

  // Load cart based on authentication status
  useEffect(() => {
    const loadCart = () => {
      if (isAuthenticated && user) {
        // Load user's cart from localStorage (user-specific)
        const savedCart = localStorage.getItem(`cart_${user.id}`);
        if (savedCart) {
          try {
            const parsedCart = JSON.parse(savedCart);
            setCart(parsedCart);
          } catch (e) {
            console.error('Error parsing cart:', e);
            setCart([]);
          }
        }
        
        const savedWishlist = localStorage.getItem(`wishlist_${user.id}`);
        if (savedWishlist) {
          try {
            setWishlist(JSON.parse(savedWishlist));
          } catch (e) {
            console.error('Error parsing wishlist:', e);
            setWishlist([]);
          }
        }
      } else {
        // Load guest cart
        const savedGuestCart = localStorage.getItem('guest_cart');
        if (savedGuestCart) {
          try {
            setGuestCart(JSON.parse(savedGuestCart));
          } catch (e) {
            console.error('Error parsing guest cart:', e);
            setGuestCart([]);
          }
        }
      }
    };

    loadCart();
  }, [isAuthenticated, user]);

  // Update cart totals whenever cart changes
  useEffect(() => {
  const currentCart = isAuthenticated ? cart : guestCart;

  if (!Array.isArray(currentCart)) return;

  const count = currentCart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const total = currentCart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  setCartCount(count);
  setCartTotal(total);
}, [cart, guestCart, isAuthenticated]);

  // Save cart based on authentication status
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
    } else {
      localStorage.setItem('guest_cart', JSON.stringify(guestCart));
    }
  }, [cart, guestCart, isAuthenticated, user]);

  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(wishlist));
    }
  }, [wishlist, isAuthenticated, user]);

  const addToCart = useCallback((product, quantity = 1) => {
    // Prevent double-add
    if (isAddingRef.current) {
      console.log('Already adding to cart, preventing duplicate');
      return false;
    }
    
    if (!product || !product.id) {
      toast.error('Invalid product');
      return false;
    }

    // Check if user is authenticated
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart', {
        icon: '🔒',
        duration: 4000,
      });
      return false;
    }

    // Set adding flag
    isAddingRef.current = true;

    // Use setTimeout to ensure state updates don't happen too quickly
    setTimeout(() => {
      setCart(prevCart => {
        // Check if product already exists in cart
        const existingItemIndex = prevCart.findIndex(item => item.id === product.id);
        
        if (existingItemIndex >= 0) {
          // Update existing item
          const updatedCart = [...prevCart];
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            quantity: (updatedCart[existingItemIndex].quantity || 1) + quantity
          };
          // toast.success(`Updated ${product.name} quantity in cart`);
          return updatedCart;
        } else {
          // Add new item
          // toast.success(`Added ${product.name} to cart`);
          return [...prevCart, { ...product, quantity }];
        }
      });
      
      // Reset adding flag after a delay
      setTimeout(() => {
        isAddingRef.current = false;
      }, 300);
    }, 0);
    
    return true;
  }, [isAuthenticated]);

  const addToGuestCart = useCallback((product, quantity = 1) => {
    if (!product || !product.id) return false;

    setGuestCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: (updatedCart[existingItemIndex].quantity || 1) + quantity
        };
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
    
    // toast.success(`Added ${product.name} to guest cart`);
    return true;
  }, []);

  const removeFromCart = useCallback((productId) => {
    if (!productId) return;

    if (!isAuthenticated) {
      setGuestCart(prev => {
        const product = prev.find(item => item.id === productId);
        if (product) {
          toast.success(`Removed ${product.name} from cart`);
        }
        return prev.filter(item => item.id !== productId);
      });
      return;
    }

    setCart(prev => {
      const product = prev.find(item => item.id === productId);
      if (product) {
        // toast.success(`Removed ${product.name} from cart`);
      }
      return prev.filter(item => item.id !== productId);
    });
  }, [isAuthenticated]);

  const saveForLater = useCallback((productId) => {
  if (!productId) return;

  if (!isAuthenticated) {
    setGuestCart(prev => {
      const item = prev.find(p => p.id === productId);
      if (item) {
        setSavedItems(s => [...s, item]);
      }
      return prev.filter(p => p.id !== productId);
    });
    return;
  }

  setCart(prev => {
    const item = prev.find(p => p.id === productId);
    if (item) {
      setSavedItems(s => [...s, item]);
    }
    return prev.filter(p => p.id !== productId);
  });
}, [isAuthenticated]);

const moveToCartFromSaved = useCallback((productId) => {
  const item = savedItems.find(p => p.id === productId);
  if (!item) return;

  if (isAuthenticated) {
    setCart(prev => [...prev, item]);
  } else {
    setGuestCart(prev => [...prev, item]);
  }

  setSavedItems(prev => prev.filter(p => p.id !== productId));
}, [savedItems, isAuthenticated]);


  const updateQuantity = useCallback((productId, quantity) => {
    if (!productId) return;

    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    if (!isAuthenticated) {
      setGuestCart(prev =>
        prev.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
      return;
    }

    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, [isAuthenticated, removeFromCart]);

  const clearCart = useCallback(() => {
    if (!isAuthenticated) {
      setGuestCart([]);
      localStorage.removeItem('guest_cart');
      // toast.success('Guest cart cleared');
      return;
    }

    setCart([]);
    // toast.success('Cart cleared');
  }, [isAuthenticated]);

  const addToWishlist = useCallback((product) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to wishlist', {
        icon: '🔒',
        duration: 4000,
      });
      return false;
    }

    setWishlist(prev => {
      if (prev.some(item => item.id === product.id)) {
        toast.error(`${product.name} is already in wishlist`);
        return prev;
      }
      toast.success(`Added ${product.name} to wishlist`);
      return [...prev, product];
    });
    return true;
  }, [isAuthenticated]);


  const removeFromWishlist = useCallback((productId) => {
    if (!isAuthenticated) return;

    setWishlist(prev => {
      const product = prev.find(item => item.id === productId);
      if (product) {
        toast.success(`Removed ${product.name} from wishlist`);
      }
      return prev.filter(item => item.id !== productId);
    });
  }, [isAuthenticated]);

  const activeCart = isAuthenticated ? cart : guestCart;
 const value = {
  cart: activeCart,
  wishlist,
  savedItems,
  addToCart,
  addToGuestCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  addToWishlist,
  removeFromWishlist,
  saveForLater,
  moveToCartFromSaved,
  cartTotal,
  cartCount
};

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};