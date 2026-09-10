import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Shopee OAuth
export const getShopeeAuthUrl = async () => {
  const response = await api.get('/api/shopee/auth-url');
  return response.data;
};

// Sync Data
export const syncShopData = async (shopId) => {
  const response = await api.post('/api/shopee/sync', { shopId });
  return response.data;
};

// AI Insights
export const getAIInsights = async (shopId) => {
  const response = await api.get(`/api/shopee/ai-insights/${shopId}`);
  return response.data;
};

// Get Shop Products
export const getShopProducts = async (shopId) => {
  const response = await api.get(`/api/shop/${shopId}/products`);
  return response.data;
};

// Get Shop Orders
export const getShopOrders = async (shopId) => {
  const response = await api.get(`/api/shop/${shopId}/orders`);
  return response.data;
};

// Get Sales Analytics
export const getShopSalesAnalytics = async (shopId) => {
  const response = await api.get(`/api/shop/${shopId}/sales`);
  return response.data;
};

// Get AI Analytics
export const getAIAnalytics = async (shopId) => {
  const response = await api.get(`/api/shop/${shopId}/ai-analytics`);
  return response.data;
};

export default api;
