import axios from 'axios';
import { API_ENDPOINTS, STORAGE_KEYS, TOAST_MESSAGES } from './constants';
import toast from 'react-hot-toast';

// Create axios instance
const api = axios.create({
  baseURL: API_ENDPOINTS.BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
        const response = await axios.post(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`, {
          refreshToken
        });

        const { token } = response.data;
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);

        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed - logout user
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        
        // Redirect to login
        window.location.href = '/login';
        toast.error('Session expired. Please login again.');
        
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    const message = error.response?.data?.message || TOAST_MESSAGES.ERROR_GENERIC;
    toast.error(message);

    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email, password) => {
    return api.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
  },

  register: (userData) => {
    return api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
  },

  logout: () => {
    return api.post(API_ENDPOINTS.AUTH.LOGOUT);
  },

  forgotPassword: (email) => {
    return api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  },

  resetPassword: (token, password) => {
    return api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { token, password });
  },

  verifyEmail: (token) => {
    return api.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, { token });
  }
};

// Users API
export const usersAPI = {
  getProfile: () => {
    return api.get(API_ENDPOINTS.USERS.PROFILE);
  },

  updateProfile: (data) => {
    return api.put(API_ENDPOINTS.USERS.UPDATE, data);
  },

  deleteAccount: () => {
    return api.delete(API_ENDPOINTS.USERS.DELETE);
  },

  getFarmers: (params) => {
    return api.get(API_ENDPOINTS.USERS.FARMERS, { params });
  },

  getBuyers: (params) => {
    return api.get(API_ENDPOINTS.USERS.BUYERS, { params });
  }
};

// Products API
export const productsAPI = {
  getProducts: (params) => {
    return api.get(API_ENDPOINTS.PRODUCTS.LIST, { params });
  },

  getProductById: (id) => {
    return api.get(API_ENDPOINTS.PRODUCTS.DETAIL.replace(':id', id));
  },

  createProduct: (data) => {
    return api.post(API_ENDPOINTS.PRODUCTS.CREATE, data);
  },

  updateProduct: (id, data) => {
    return api.put(API_ENDPOINTS.PRODUCTS.UPDATE.replace(':id', id), data);
  },

  deleteProduct: (id) => {
    return api.delete(API_ENDPOINTS.PRODUCTS.DELETE.replace(':id', id));
  },

  getReviews: (productId, params) => {
    return api.get(API_ENDPOINTS.PRODUCTS.REVIEW.replace(':id', productId), { params });
  },

  addReview: (productId, data) => {
    return api.post(API_ENDPOINTS.PRODUCTS.REVIEW.replace(':id', productId), data);
  },

  getCategories: () => {
    return api.get(API_ENDPOINTS.PRODUCTS.CATEGORIES);
  }
};

// Orders API
export const ordersAPI = {
  getOrders: (params) => {
    return api.get(API_ENDPOINTS.ORDERS.LIST, { params });
  },

  getOrderById: (id) => {
    return api.get(API_ENDPOINTS.ORDERS.DETAIL.replace(':id', id));
  },

  createOrder: (data) => {
    return api.post(API_ENDPOINTS.ORDERS.CREATE, data);
  },

  updateOrder: (id, data) => {
    return api.put(API_ENDPOINTS.ORDERS.UPDATE.replace(':id', id), data);
  },

  cancelOrder: (id) => {
    return api.post(API_ENDPOINTS.ORDERS.CANCEL.replace(':id', id));
  },

  trackOrder: (id) => {
    return api.get(API_ENDPOINTS.ORDERS.TRACK.replace(':id', id));
  }
};

// Payments API
export const paymentsAPI = {
  createPayment: (data) => {
    return api.post(API_ENDPOINTS.PAYMENTS.CREATE, data);
  },

  verifyPayment: (data) => {
    return api.post(API_ENDPOINTS.PAYMENTS.VERIFY, data);
  },

  requestRefund: (orderId, data) => {
    return api.post(API_ENDPOINTS.PAYMENTS.REFUND, { orderId, ...data });
  }
};

// Cart API
export const cartAPI = {
  getCart: () => {
    return api.get(API_ENDPOINTS.CART.GET);
  },

  addToCart: (productId, quantity) => {
    return api.post(API_ENDPOINTS.CART.ADD, { productId, quantity });
  },

  updateCartItem: (itemId, quantity) => {
    return api.put(API_ENDPOINTS.CART.UPDATE, { itemId, quantity });
  },

  removeFromCart: (itemId) => {
    return api.delete(API_ENDPOINTS.CART.REMOVE, { data: { itemId } });
  },

  clearCart: () => {
    return api.delete(API_ENDPOINTS.CART.CLEAR);
  }
};

// Wishlist API
export const wishlistAPI = {
  getWishlist: () => {
    return api.get(API_ENDPOINTS.WISHLIST.GET);
  },

  addToWishlist: (productId) => {
    return api.post(API_ENDPOINTS.WISHLIST.ADD, { productId });
  },

  removeFromWishlist: (productId) => {
    return api.delete(API_ENDPOINTS.WISHLIST.REMOVE, { data: { productId } });
  }
};

// File upload
export const uploadAPI = {
  uploadImage: (file, onProgress) => {
    const formData = new FormData();
    formData.append('image', file);

    return api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        }
      }
    });
  },

  uploadMultipleImages: (files, onProgress) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });

    return api.post('/upload/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        }
      }
    });
  }
};

export default api;