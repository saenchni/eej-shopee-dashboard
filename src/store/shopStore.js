import { create } from 'zustand';
import { getAIInsights, syncShopData, getAIAnalytics } from '../services/api';

const useShopStore = create((set) => ({
  shopData: null,
  analytics: null,
  loading: false,
  error: null,

  fetchShopData: async (shopId) => {
    set({ loading: true });
    try {
      // Fetch from Firestore or API
      const data = {
        shopId,
        shopName: 'My Shop',
        totalRevenue: '50,000',
        productCount: 45,
        totalOrders: 120,
        avgOrderValue: '420',
      };
      set({ shopData: data, error: null });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  syncData: async (shopId) => {
    set({ loading: true });
    try {
      const result = await syncShopData(shopId);
      set({ error: null });
      return result;
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  generateAIInsights: async (shopId) => {
    set({ loading: true });
    try {
      const result = await getAIInsights(shopId);
      const analytics = await getAIAnalytics(shopId);
      set({ analytics, error: null });
      return result;
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));

export { useShopStore };
