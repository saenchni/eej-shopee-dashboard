import React, { useState, useEffect } from 'react';
import { getShopSalesAnalytics } from '../../services/api';

const Sales = ({ shopId }) => {
  const [salesData, setSalesData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (shopId) {
      fetchSalesData();
    }
  }, [shopId]);

  const fetchSalesData = async () => {
    try {
      setLoading(true);
      const data = await getShopSalesAnalytics(shopId);
      setSalesData(data);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">ยอดขาย</h2>
      {loading ? (
        <div className="text-center py-8">กำลังโหลด...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ยอดขายรายวัน</h3>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">📊 Chart Component Here</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">สรุปยอดขาย</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="text-gray-600">ยอดขายรวม</span>
                <span className="text-2xl font-bold text-green-600">฿{salesData?.totalSales || 0}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="text-gray-600">จำนวนออเดอร์</span>
                <span className="text-2xl font-bold text-blue-600">{salesData?.orderCount || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">ยอดเฉลี่ยต่อออเดอร์</span>
                <span className="text-2xl font-bold text-purple-600">฿{salesData?.avgOrderValue || 0}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sales;
