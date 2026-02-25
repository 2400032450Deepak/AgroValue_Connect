// API Endpoints
import { FaLeaf } from 'react-icons/fa';
export const API_ENDPOINTS = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email'
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE: '/users/update',
    DELETE: '/users/delete',
    FARMERS: '/users/farmers',
    BUYERS: '/users/buyers'
  },
  PRODUCTS: {
    LIST: '/products',
    DETAIL: '/products/:id',
    CREATE: '/products',
    UPDATE: '/products/:id',
    DELETE: '/products/:id',
    REVIEW: '/products/:id/reviews',
    CATEGORIES: '/products/categories'
  },
  ORDERS: {
    LIST: '/orders',
    DETAIL: '/orders/:id',
    CREATE: '/orders',
    UPDATE: '/orders/:id',
    CANCEL: '/orders/:id/cancel',
    TRACK: '/orders/:id/track'
  },
  PAYMENTS: {
    CREATE: '/payments/create',
    VERIFY: '/payments/verify',
    REFUND: '/payments/refund'
  },
  CART: {
    GET: '/cart',
    ADD: '/cart/add',
    UPDATE: '/cart/update',
    REMOVE: '/cart/remove',
    CLEAR: '/cart/clear'
  },
  WISHLIST: {
    GET: '/wishlist',
    ADD: '/wishlist/add',
    REMOVE: '/wishlist/remove'
  }
};

// App Constants
export const APP_CONSTANTS = {
  APP_NAME: 'AgroValue Connect',
  APP_DESCRIPTION: 'Empowering farmers to create value-added products and connect with global buyers',
  APP_VERSION: '1.0.0',
  COMPANY_NAME: 'AgroValue Connect Inc.',
  SUPPORT_EMAIL: 'support@agrovalueconnect.com',
  SUPPORT_PHONE: '+1 (555) 123-4567',
  ADDRESS: '123 Agriculture Street, New York, NY 10001, USA',
  SOCIAL_LINKS: {
    FACEBOOK: 'https://facebook.com/agrovalueconnect',
    TWITTER: 'https://twitter.com/agrovalueconnect',
    LINKEDIN: 'https://linkedin.com/company/agrovalueconnect',
    INSTAGRAM: 'https://instagram.com/agrovalueconnect'
  }
};

// Reliable placeholder image URLs
export const PLACEHOLDER_IMAGES = {
  PRODUCT: 'https://images.unsplash.com/photo-1587049352851-8d4e8915a7c4?w=300&h=300&fit=crop', // Fallback to a default product image
  AVATAR: 'https://randomuser.me/api/portraits/lego/1.jpg',
  NO_IMAGE: 'https://images.unsplash.com/photo-1587049352851-8d4e8915a7c4?w=300&h=300&fit=crop' // Default product image as fallback
};

// User Roles
export const USER_ROLES = {
  FARMER: 'farmer',
  BUYER: 'buyer',
  ADMIN: 'admin'
};

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
  DISPUTED: 'disputed'
};

// Payment Methods
export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  PAYPAL: 'paypal',
  APPLE_PAY: 'apple_pay',
  GOOGLE_PAY: 'google_pay',
  BANK_TRANSFER: 'bank_transfer'
};

// Product Categories
export const PRODUCT_CATEGORIES = [
  { id: 'honey', name: 'Honey & Syrups', icon: 'FaLeaf' },
  { id: 'pickles', name: 'Pickles & Preserves', icon: 'FaLeaf' },
  { id: 'oils', name: 'Cold-Pressed Oils', icon: 'FaLeaf' },
  { id: 'spices', name: 'Spices & Masalas', icon: 'FaLeaf' },
  { id: 'dryfruits', name: 'Dry Fruits & Nuts', icon: 'FaLeaf' },
  { id: 'jaggery', name: 'Jaggery & Sweeteners', icon: 'FaLeaf' },
  { id: 'grains', name: 'Organic Grains', icon: 'FaLeaf' }
];

// Sort Options
export const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' }
];

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  LIMIT_OPTIONS: [12, 24, 48, 96]
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  CART: 'cart',
  WISHLIST: 'wishlist',
  THEME: 'theme',
  LANGUAGE: 'language'
};

// Validation Rules
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 50,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  PHONE_REGEX: /^\+?[1-9]\d{1,14}$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  ZIP_CODE_REGEX: /^\d{5}(-\d{4})?$/
};

// Toast Messages
export const TOAST_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in!',
  LOGOUT_SUCCESS: 'Successfully logged out!',
  REGISTER_SUCCESS: 'Registration successful! Please verify your email.',
  PROFILE_UPDATE_SUCCESS: 'Profile updated successfully!',
  PASSWORD_CHANGE_SUCCESS: 'Password changed successfully!',
  ORDER_PLACED_SUCCESS: 'Order placed successfully!',
  CART_ADD_SUCCESS: 'Item added to cart!',
  CART_REMOVE_SUCCESS: 'Item removed from cart!',
  WISHLIST_ADD_SUCCESS: 'Item added to wishlist!',
  WISHLIST_REMOVE_SUCCESS: 'Item removed from wishlist!',
  REVIEW_SUBMIT_SUCCESS: 'Thank you for your review!',
  ERROR_GENERIC: 'Something went wrong. Please try again.',
  ERROR_NETWORK: 'Network error. Please check your connection.',
  ERROR_UNAUTHORIZED: 'Please login to continue.',
  ERROR_FORBIDDEN: 'You do not have permission to perform this action.'
};

// Currency
export const CURRENCY = {
  CODE: 'USD',
  SYMBOL: '$',
  LOCALE: 'en-US'
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  DISPLAY_WITH_TIME: 'MMM DD, YYYY h:mm A',
  API: 'YYYY-MM-DD',
  API_WITH_TIME: 'YYYY-MM-DD HH:mm:ss'
};

// Theme
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
};

// Languages
export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'hi', name: 'हिन्दी' }
];