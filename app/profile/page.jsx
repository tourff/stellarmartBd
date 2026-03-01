'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { User, Package, Heart, Settings, LogOut, ChevronRight, Loader2 } from 'lucide-react';

export default function ProfilePage() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user) {
      setLoading(false);
    }
  }, [user, authLoading, router]);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  if (authLoading || loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-[#083b66] to-[#062d4d] text-white py-10">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">My Account</h1>
            <p className="text-blue-200">Welcome back, {user?.name || user?.email}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-6">
            {/* Sidebar Menu */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-[#083b66] rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{user?.name || 'User'}</h3>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                
                <nav className="space-y-2">
                  <Link href="/profile" className="flex items-center gap-3 px-4 py-3 bg-[#083b66] text-white rounded-lg">
                    <User className="w-5 h-5" />
                    <span className="font-medium">My Profile</span>
                  </Link>
                  <Link href="/orders" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                    <Package className="w-5 h-5" />
                    <span className="font-medium">My Orders</span>
                  </Link>
                  <Link href="/wishlist" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                    <Heart className="w-5 h-5" />
                    <span className="font-medium">Wishlist</span>
                  </Link>
                  <Link href="/settings" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
                
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input type="text" defaultValue={user?.name || ''} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#083b66]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" defaultValue={user?.email || ''} disabled className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input type="tel" defaultValue={user?.phone || ''} placeholder="Enter phone number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#083b66]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input type="text" defaultValue={user?.address || ''} placeholder="Enter address" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#083b66]" />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button className="px-6 py-2.5 bg-[#083b66] text-white font-semibold rounded-lg hover:bg-[#062d4d]">
                      Update Profile
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Links</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link href="/orders" className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#083b66] hover:bg-blue-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Package className="w-8 h-8 text-[#083b66]" />
                      <div>
                        <p className="font-semibold text-gray-900">My Orders</p>
                        <p className="text-sm text-gray-500">View order history</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </Link>
                  <Link href="/wishlist" className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#083b66] hover:bg-blue-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Heart className="w-8 h-8 text-[#083b66]" />
                      <div>
                        <p className="font-semibold text-gray-900">Wishlist</p>
                        <p className="text-sm text-gray-500">Your saved items</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
