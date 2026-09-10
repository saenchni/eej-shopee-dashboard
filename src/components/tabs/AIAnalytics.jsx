import React, { useState, useEffect } from 'react';
import { FiTrendingUp, FiZap } from 'react-icons/fi';
import { getAIAnalytics } from '../../services/api';

const AIAnalytics = ({ shopId }) => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (shopId) {
      fetchAIAnalytics();
    }
  }, [shopId]);

  const fetchAIAnalytics = async () => {
    try {
      setLoading(true);
      const data = await getAIAnalytics(shopId);
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching AI analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FiZap className="text-purple-600" />
        AI Analytics
      </h2>
      {loading ? (
        <div className="text-center py-8">กำลังโหลด...</div>
      ) : (
        <div className="space-y-6">
          {/* Insights */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow p-6 text-white">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FiTrendingUp /> ข้อมูลเชิงลึก
            </h3>
            <p className="text-lg whitespace-pre-line">{analytics?.insights || 'ไม่มีข้อมูล'}</p>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">สินค้าขายดี</h3>
            <div className="space-y-3">
              {analytics?.topProducts?.map((product, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span className="font-semibold text-gray-900">{idx + 1}. {product.name}</span>
                  <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    {product.quantity} ชิ้น
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 คำแนะนำ</h3>
            <div className="space-y-3">
              {analytics?.recommendations?.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-amber-50 rounded border border-amber-200">
                  <span className="text-xl">✨</span>
                  <p className="text-gray-700">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAnalytics;
