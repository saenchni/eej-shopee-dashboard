import React, { useState, useEffect } from 'react';
import { FiRefreshCw, FiZap, FiBarChart2, FiBox, FiShoppingCart, FiTrendingUp } from 'react-icons/fi';
import Overview from './tabs/Overview';
import Products from './tabs/Products';
import Orders from './tabs/Orders';
import Sales from './tabs/Sales';
import AIAnalytics from './tabs/AIAnalytics';
import { useShopStore } from '../store/shopStore';

const ShopeeCenter = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const { shopData, fetchShopData, syncData, generateAIInsights } = useShopStore();

  useEffect(() => {
    const shopId = new URLSearchParams(window.location.search).get('shopId');
    if (shopId) {
      fetchShopData(shopId);
    }
  }, []);

  const handleSync = async () => {
    setLoading(true);
    try {
      await syncData(shopData.shopId);
      alert('✅ ซิงก์ข้อมูลสำเร็จ');
    } catch (error) {
      alert('❌ เกิดข้อผิดพลาด: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAIInsights = async () => {
    setLoading(true);
    try {
      await generateAIInsights(shopData.shopId);
      alert('✅ AI Insights สร้างสำเร็จ');
    } catch (error) {
      alert('❌ เกิดข้อผิดพลาด: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'ภาพรวม', icon: FiBarChart2 },
    { id: 'products', label: 'สินค้า', icon: FiBox },
    { id: 'orders', label: 'คำสั่งซื้อ', icon: FiShoppingCart },
    { id: 'sales', label: 'ยอดขาย', icon: FiTrendingUp },
    { id: 'ai-analytics', label: 'AI Analytics', icon: FiZap },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">🏪 Shopee Center</h1>
              <p className="text-gray-600 mt-2">Shop ID: {shopData?.shopId || 'Loading...'}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSync}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <FiRefreshCw className={loading ? 'animate-spin' : ''} />
                ซิงก์ข้อมูล
              </button>
              <button
                onClick={handleAIInsights}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                <FiZap />
                AI Insights
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-4 border-b-2 transition ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600 font-semibold'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon size={20} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' && <Overview data={shopData} />}
        {activeTab === 'products' && <Products shopId={shopData?.shopId} />}
        {activeTab === 'orders' && <Orders shopId={shopData?.shopId} />}
        {activeTab === 'sales' && <Sales shopId={shopData?.shopId} />}
        {activeTab === 'ai-analytics' && <AIAnalytics shopId={shopData?.shopId} />}
      </div>
    </div>
  );
};

export default ShopeeCenter;
