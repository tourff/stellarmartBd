'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FaUser, FaBox, FaHeart, FaMapMarkerAlt, 
  FaCreditCard, FaCog, FaSignOutAlt, FaAngleRight 
} from 'react-icons/fa';

// ১. আপনার প্রজেক্টের বর্তমান পাথ এবং হুকের নাম (useAuthStore) অনুযায়ী আপডেট করা হয়েছে
import { useAuthStore } from '@/lib/hooks/authStore'; 

const menuItems = [
  { icon: FaUser, label: 'My Profile', href: '/dashboard/profile' },
  { icon: FaBox, label: 'My Orders', href: '/dashboard/orders' },
  { icon: FaHeart, label: 'Wishlist', href: '/dashboard/wishlist' },
  { icon: FaMapMarkerAlt, label: 'Addresses', href: '/dashboard/addresses' },
  { icon: FaCreditCard, label: 'Payment Methods', href: '/dashboard/payments' },
  { icon: FaCog, label: 'Settings', href: '/dashboard/settings' },
];

const recentOrders = [
  { id: 'SM12345', date: '2024-01-15', items: 3, total: 4599, status: 'Delivered' },
  { id: 'SM12344', date: '2024-01-10', items: 1, total: 1299, status: 'Processing' },
  { id: 'SM12343', date: '2024-01-05', items: 2, total: 2899, status: 'Shipped' },
];

export default function DashboardPage() {
  // ২. useAuthStore থেকে ডেটা এবং ফাংশন নেওয়া হচ্ছে
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white mb-10 shadow-xl shadow-blue-500/20">
          <div className="flex items-center justify-between">
            <div className="animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">
                স্বাগতম, {user?.name || 'Customer'}! 👋
              </h1>
              <p className="text-blue-100 font-medium opacity-90">আপনার অ্যাকাউন্ট ম্যানেজ করুন এবং অর্ডার ট্র্যাক করুন</p>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 transform rotate-12">
                <FaUser className="text-5xl text-white/80" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Sidebar Menu */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 border border-gray-100 sticky top-24">
              <div className="flex flex-col items-center text-center pb-8 mb-8 border-b border-gray-50">
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl font-bold mb-4 uppercase">
                  {user?.name?.charAt(0) || 'C'}
                </div>
                <h2 className="font-black text-gray-900 text-lg leading-tight">{user?.name || 'Customer'}</h2>
                <p className="text-sm text-gray-400 font-medium">{user?.email || 'customer@email.com'}</p>
              </div>

              <nav className="space-y-2">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex items-center gap-4 px-4 py-3.5 text-gray-500 hover:bg-blue-50 hover:text-blue-600 rounded-2xl transition-all duration-300 group font-bold text-sm"
                  >
                    <item.icon className="text-lg group-hover:scale-110 transition-transform" />
                    <span className="flex-1">{item.label}</span>
                    <FaAngleRight className="text-[10px] opacity-0 group-hover:opacity-100 translate-x-[-5px] group-hover:translate-x-0 transition-all" />
                  </Link>
                ))}
                
                <button
                  onClick={() => logout && logout()} 
                  className="flex items-center gap-4 px-4 py-3.5 text-red-500 hover:bg-red-50 rounded-2xl transition-all duration-300 w-full font-bold text-sm mt-4"
                >
                  <FaSignOutAlt className="text-lg" />
                  <span className="flex-1 text-left">Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Dashboard Content */}
          <div className="lg:col-span-9 space-y-10">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Orders', val: '12', icon: FaBox, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'In Wishlist', val: '08', icon: FaHeart, color: 'text-pink-600', bg: 'bg-pink-50' },
                { label: 'Addresses', val: '03', icon: FaMapMarkerAlt, color: 'text-green-600', bg: 'bg-green-50' },
                { label: 'Payment', val: '02', icon: FaCreditCard, color: 'text-purple-600', bg: 'bg-purple-50' },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col gap-4">
                    <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center text-xl`}>
                      <stat.icon />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{stat.label}</p>
                      <p className="text-2xl font-black text-gray-900">{stat.val}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
              <div className="p-8 flex items-center justify-between border-b border-gray-50">
                <h2 className="text-xl font-black text-gray-900 tracking-tight">Recent Orders</h2>
                <Link href="/dashboard/orders" className="px-4 py-2 bg-gray-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-600 hover:text-white transition-all">
                  View All Orders
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50/50">
                      <th className="py-4 px-8 text-[10px] font-black uppercase text-gray-400 tracking-widest">Order ID</th>
                      <th className="py-4 px-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Date</th>
                      <th className="py-4 px-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Items</th>
                      <th className="py-4 px-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Total</th>
                      <th className="py-4 px-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Status</th>
                      <th className="py-4 px-8 text-right text-[10px] font-black uppercase text-gray-400 tracking-widest">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="py-5 px-8">
                          <span className="font-bold text-blue-600">#{order.id}</span>
                        </td>
                        <td className="py-5 px-4 text-sm font-medium text-gray-600">{order.date}</td>
                        <td className="py-5 px-4 text-sm font-medium text-gray-500">{order.items} items</td>
                        <td className="py-5 px-4 font-black text-gray-900">৳{order.total.toLocaleString()}</td>
                        <td className="py-5 px-4">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-5 px-8 text-right">
                          <Link href={`/dashboard/orders/${order.id}`} className="w-8 h-8 bg-white border border-gray-100 rounded-lg inline-flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm">
                            <FaEyeIcon size={12} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FaEyeIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
