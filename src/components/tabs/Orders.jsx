import React, { useState, useEffect } from 'react';
import { getShopOrders } from '../../services/api';

const Orders = ({ shopId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (shopId) {
      fetchOrders();
    }
  }, [shopId]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getShopOrders(shopId);
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'shipped': 'bg-blue-100 text-blue-800',
      'delivered': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">คำสั่งซื้อ</h2>
      {loading ? (
        <div className="text-center py-8">กำลังโหลด...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Order ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">สถานะ</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">จำนวนเงิน</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">วันที่</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{order.id}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold">฿{order.amount}</td>
                  <td className="px-4 py-3 text-sm">{new Date(order.date).toLocaleDateString('th-TH')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
