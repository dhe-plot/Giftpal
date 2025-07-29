import axios from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('giftpal_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors and token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('giftpal_token');
      localStorage.removeItem('giftpal_user');
      window.location.href = '/sign-in';
    }
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Logout user
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  // Get current user profile
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await api.put('/auth/profile', profileData);
    return response.data;
  },

  // Refresh token
  refreshToken: async () => {
    const response = await api.post('/auth/refresh');
    return response.data;
  },

  // Request password reset
  requestPasswordReset: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    const response = await api.post('/auth/reset-password', { token, newPassword });
    return response.data;
  },
};

// Seller API endpoints
export const sellerAPI = {
  // Register as seller
  register: async (sellerData) => {
    const response = await api.post('/sellers/register', sellerData);
    return response.data;
  },

  // Get seller profile
  getProfile: async (sellerId) => {
    const response = await api.get(`/sellers/${sellerId}`);
    return response.data;
  },

  // Update seller profile
  updateProfile: async (sellerId, profileData) => {
    const response = await api.put(`/sellers/${sellerId}`, profileData);
    return response.data;
  },

  // Get seller dashboard data
  getDashboard: async () => {
    const response = await api.get('/sellers/dashboard');
    return response.data;
  },

  // Get seller analytics
  getAnalytics: async (timeframe = '30d') => {
    const response = await api.get(`/sellers/analytics?timeframe=${timeframe}`);
    return response.data;
  },

  // Upload seller documents
  uploadDocuments: async (formData) => {
    const response = await api.post('/sellers/documents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// Product API endpoints
export const productAPI = {
  // Get all products with filters
  getProducts: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await api.get(`/products?${params}`);
    return response.data;
  },

  // Get single product
  getProduct: async (productId) => {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  },

  // Create new product (seller only)
  createProduct: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  // Update product (seller only)
  updateProduct: async (productId, productData) => {
    const response = await api.put(`/products/${productId}`, productData);
    return response.data;
  },

  // Delete product (seller only)
  deleteProduct: async (productId) => {
    const response = await api.delete(`/products/${productId}`);
    return response.data;
  },

  // Upload product images
  uploadImages: async (productId, formData) => {
    const response = await api.post(`/products/${productId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Search products
  searchProducts: async (query, filters = {}) => {
    const params = new URLSearchParams({ q: query, ...filters });
    const response = await api.get(`/products/search?${params}`);
    return response.data;
  },

  // Get featured products
  getFeaturedProducts: async () => {
    const response = await api.get('/products/featured');
    return response.data;
  },

  // Get trending products
  getTrendingProducts: async () => {
    const response = await api.get('/products/trending');
    return response.data;
  },
};

// Order API endpoints
export const orderAPI = {
  // Create new order
  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  // Get user orders
  getOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },

  // Get single order
  getOrder: async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  // Update order status (seller only)
  updateOrderStatus: async (orderId, status) => {
    const response = await api.put(`/orders/${orderId}/status`, { status });
    return response.data;
  },

  // Cancel order
  cancelOrder: async (orderId) => {
    const response = await api.put(`/orders/${orderId}/cancel`);
    return response.data;
  },

  // Process payment
  processPayment: async (paymentData) => {
    const response = await api.post('/orders/payment', paymentData);
    return response.data;
  },
};

// Placeholder API endpoints
export const placeholderAPI = {
  // Get available placeholders
  getPlaceholders: async () => {
    const response = await api.get('/placeholders');
    return response.data;
  },

  // Update placeholder values
  updatePlaceholders: async (placeholderData) => {
    const response = await api.put('/placeholders', placeholderData);
    return response.data;
  },

  // Reset placeholders to defaults
  resetPlaceholders: async () => {
    const response = await api.post('/placeholders/reset');
    return response.data;
  },
};

// Admin API endpoints (admin only)
export const adminAPI = {
  // Get admin dashboard
  getDashboard: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },

  // Get all users
  getUsers: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await api.get(`/admin/users?${params}`);
    return response.data;
  },

  // Get all sellers
  getSellers: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await api.get(`/admin/sellers?${params}`);
    return response.data;
  },

  // Approve/reject seller
  updateSellerStatus: async (sellerId, status) => {
    const response = await api.put(`/admin/sellers/${sellerId}/status`, { status });
    return response.data;
  },

  // Get system analytics
  getAnalytics: async (timeframe = '30d') => {
    const response = await api.get(`/admin/analytics?timeframe=${timeframe}`);
    return response.data;
  },
};

// Utility functions
export const apiUtils = {
  // Check if API is healthy
  healthCheck: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL.replace('/api', '')}/health`);
      return response.data;
    } catch (error) {
      throw new Error('API health check failed');
    }
  },

  // Handle API errors
  handleError: (error) => {
    if (error.response) {
      // Server responded with error status
      return {
        message: error.response.data?.message || 'An error occurred',
        status: error.response.status,
        errors: error.response.data?.errors || [],
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        message: 'Network error - please check your connection',
        status: 0,
        errors: [],
      };
    } else {
      // Something else happened
      return {
        message: error.message || 'An unexpected error occurred',
        status: 0,
        errors: [],
      };
    }
  },
};

export default api;
