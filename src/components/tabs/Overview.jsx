import React from 'react';
import { FiDollarSign, FiPackage, FiShoppingCart, FiTrendingUp } from 'react-icons/fi';

const Overview = ({ data }) => {
  const stats = [
    { label: 'รายได้รวม', value: data?.totalRevenue || '0', icon: FiDollarSign, color: 'bg-green-100 text-green-600' },
    { label: 'สินค้า', value: data?.productCount || '0', icon: FiPackage, color: 'bg-blue-100 text-blue-600' },
    { label: 'ออเดอร์', value: data?.totalOrders || '0', icon: FiShoppingCart, color: 'bg-orange-100 text-orange-600' },
    { label: 'ยอดขายเฉลี่ย', value: data?.avgOrderValue || '0', icon: FiTrendingUp, color: 'bg-purple-100 text-purple-600' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">ภาพรวมร้านค้า</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-lg shadow p-6">
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                <Icon size={24} />
              </div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Overview;
