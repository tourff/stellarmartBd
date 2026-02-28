'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  Image, 
  CreditCard,
  Loader2,
  AlertCircle
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    categories: 0,
    orders: 0,
    banners: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      const [usersRes, productsRes, categoriesRes, ordersRes, bannersRes] = await Promise.all([
        fetch('/api/users').catch(() => ({ ok: false, json: () => ({ users: [] }) })),
        fetch('/api/products').catch(() => ({ ok: false, json: () => ({ products: [] }) })),
        fetch('/api/categories').catch(() => ({ ok: false, json: () => ({ categories: [] }) })),
        fetch('/api/orders').catch(() => ({ ok: false, json: () => ({ orders: [] }) })),
        fetch('/api/banners?admin=true').catch(() => ({ ok: false, json: () => ({ banners: [] }) }))
      ]);

      const usersData = usersRes.ok ? await usersRes.json() : { users: [] };
      const productsData = productsRes.ok ? await productsRes.json() : { products: [] };
      const categoriesData = categoriesRes.ok ? await categoriesRes.json() : { categories: [] };
      const ordersData = ordersRes.ok ? await ordersRes.json() : { orders: [] };
      const bannersData = bannersRes.ok ? await bannersRes.json() : { banners: [] };

      setStats({
        users: usersData.users?.length || 0,
        products: productsData.products?.length || 0,
        categories: categoriesData.categories?.length || 0,
        orders: ordersData.orders?.length || 0,
        banners: bannersData.banners?.length || 0
      });
      
      setError(null);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Failed to connect to database. Please check MongoDB connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <p className="text-red-700">{error}</p>
          <button 
            onClick={fetchStats}
            className="ml-auto px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            Retry
          </button>
        </div>
      )}

      {/* Stats Cards */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <span className="ml-3 text-gray-600">Loading stats...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/admin/users" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{stats.users}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Link>
          
          <Link href="/admin/products" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-3xl font-bold text-gray-900">{stats.products}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Link>
          
          <Link href="/admin/categories" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-3xl font-bold text-gray-900">{stats.categories}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Link>
          
          <Link href="/admin/orders" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">{stats.orders}</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <CreditCard className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Banner Status */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Banner Status</h2>
          <Link href="/admin/banners" className="text-blue-600 hover:underline text-sm">
            Manage Banners →
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Image className="w-5 h-5 text-gray-600" />
          <span className="text-gray-700">
            Active Banners: <strong>{stats.banners}</strong>
          </span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link 
            href="/admin/products" 
            className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition-colors"
          >
            <ShoppingCart className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Add Product</span>
          </Link>
          <Link 
            href="/admin/categories" 
            className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 transition-colors"
          >
            <Package className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Add Category</span>
          </Link>
          <Link 
            href="/admin/banners" 
            className="p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition-colors"
          >
            <Image className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Add Banner</span>
          </Link>
          <Link 
            href="/admin/users" 
            className="p-4 bg-orange-50 rounded-lg text-center hover:bg-orange-100 transition-colors"
          >
            <Users className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">View Users</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
