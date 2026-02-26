'use client';

// FaPackage এবং FaPending নামে কোনো আইকন নেই, তাই সঠিক নামগুলো ব্যবহার করা হয়েছে
import { 
  FaBox, 
  FaShoppingCart, 
  FaUsers, 
  FaMoneyBillWave, 
  FaArrowUp, 
  FaArrowDown, 
  FaEye, 
  FaEdit, 
  FaTrash,
  FaClock // FaPending এর বিকল্প হিসেবে এটি ব্যবহার করতে পারেন
} from 'react-icons/fa';
import Link from 'next/link';

const stats = [
  { title: 'Total Revenue', value: '৳12,45,000', change: '+12.5%', icon: FaMoneyBillWave, color: 'bg-green-100 text-green-600' },
  { title: 'Total Orders', value: '1,245', change: '+8.2%', icon: FaShoppingCart, color: 'bg-blue-100 text-blue-600' },
  { title: 'Total Products', value: '856', change: '+3.1%', icon: FaBox, color: 'bg-purple-100 text-purple-600' },
  { title: 'Total Customers', value: '5,234', change: '+15.3%', icon: FaUsers, color: 'bg-orange-100 text-orange-600' },
];

const recentOrders = [
  { id: '#SM12345', customer: 'Rahul Ahmed', product: 'Wireless Headphones', amount: 2499, status: 'Pending', date: '2024-01-20' },
  { id: '#SM12344', customer: 'Sumon Khan', product: 'Smart Watch', amount: 1999, status: 'Processing', date: '2024-01-20' },
  { id: '#SM12343', customer: 'Alia Rahman', product: 'Leather Wallet', amount: 799, status: 'Shipped', date: '2024-01-19' },
  { id: '#SM12342', customer: 'Munna Mia', product: 'Bluetooth Speaker', amount: 1299, status: 'Delivered', date: '2024-01-19' },
  { id: '#SM12341', customer: 'Jewel Rana', product: 'USB Hub', amount: 699, status: 'Delivered', date: '2024-01-18' },
];

const topProducts = [
  { name: 'Wireless Headphones Pro', sold: 234, revenue: 584766 },
  { name: 'Smart Watch Band 5', sold: 189, revenue: 377811 },
  { name: 'Bluetooth Speaker Mini', sold: 156, revenue: 202644 },
  { name: 'Premium Leather Wallet', sold: 123, revenue: 98277 },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="text-xl" />
              </div>
              <span className={`flex items-center text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change.startsWith('+') ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
            <Link href="/admin/orders" className="text-blue-600 hover:underline text-sm">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-6 text-sm font-semibold text-gray-600">Order</th>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-gray-600">Customer</th>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-gray-600">Amount</th>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <span className="font-medium text-blue-600">{order.id}</span>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{order.customer}</td>
                    <td className="py-4 px-6 font-semibold">৳{order.amount}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-bold text-gray-900">Top Selling Products</h2>
            <Link href="/admin/products" className="text-blue-600 hover:underline text-sm">
              View All
            </Link>
          </div>
          <div className="p-6 space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">📦</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sold} sold</p>
                  </div>
                </div>
                <p className="font-semibold text-blue-600">৳{product.revenue.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
