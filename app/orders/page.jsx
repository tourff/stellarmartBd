'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { Package, ChevronRight, Clock, CheckCircle, XCircle, Truck, Loader2, Menu, X } from 'lucide-react';

export default function OrdersPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [fetchingOrders, setFetchingOrders] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user) {
      setLoading(false);
      fetchOrders();
    }
  }, [user, authLoading, router]);

  const fetchOrders = async () => {
    setFetchingOrders(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      
      if (res.ok) {
        setOrders(data.orders || []);
      } else {
        console.error('Failed to fetch orders:', data.error);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setFetchingOrders(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'processing':
      case 'confirmed':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
      case 'returned':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'shipped':
        return 'bg-blue-100 text-blue-700';
      case 'processing':
      case 'confirmed':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
      case 'returned':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
        <div className="bg-gradient-to-r from-[#083b66] to-[#062d4d] text-white py-6 sm:py-10">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">My Orders</h1>
            <p className="text-blue-200 text-sm sm:text-base">Track and manage your orders</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
          <div className="flex items-center gap-2 mb-4 sm:mb-6 text-xs sm:text-sm">
            <Link href="/" className="text-[#083b66] hover:underline">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-700">My Orders</span>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden mb-4">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm text-gray-700 w-full justify-between"
            >
              <span className="font-medium">Menu</span>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          <div className="grid md:grid-cols-4 gap-4 sm:gap-6">
            {/* Desktop Sidebar */}
            <div className="hidden md:block md:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-[#083b66] rounded-full flex items-center justify-center mx-auto mb-3">
                    <Package className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{user?.name || 'User'}</h3>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                <nav className="space-y-2">
                  <Link href="/profile" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                    <span className="font-medium text-sm">Profile</span>
                  </Link>
                  <Link href="/orders" className="flex items-center gap-3 px-4 py-3 bg-[#083b66] text-white rounded-lg">
                    <span className="font-medium text-sm">My Orders</span>
                  </Link>
                  <Link href="/wishlist" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                    <span className="font-medium text-sm">Wishlist</span>
                  </Link>
                  <Link href="/settings" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                    <span className="font-medium text-sm">Settings</span>
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full">
                    <span className="font-medium text-sm">Logout</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden col-span-4">
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <nav className="space-y-2">
                    <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                      <span className="font-medium">Profile</span>
                    </Link>
                    <Link href="/orders" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 bg-[#083b66] text-white rounded-lg">
                      <span className="font-medium">My Orders</span>
                    </Link>
                    <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                      <span className="font-medium">Wishlist</span>
                    </Link>
                    <Link href="/settings" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                      <span className="font-medium">Settings</span>
                    </Link>
                  </nav>
                </div>
              </div>
            )}

            {/* Orders Content */}
            <div className="md:col-span-3">
              {fetchingOrders ? (
                <div className="flex items-center justify-center py-8 sm:py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
              ) : orders.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-6 sm:p-12 text-center">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <Package className="w-8 h-8 sm:w-12 sm:h-12 text-[#083b66]" />
                  </div>
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">No Orders Yet</h2>
                  <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
                    You haven't placed any orders yet.
                  </p>
                  <Link href="/shop" className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#083b66] text-white rounded-xl hover:bg-[#062d4d] font-semibold transition-all text-sm sm:text-base">
                    Start Shopping
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {orders.map((order) => (
                    <div key={order._id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                      <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto">
                            <div className="whitespace-nowrap">
                              <p className="text-xs sm:text-sm text-gray-500">Order</p>
                              <p className="font-semibold text-gray-900 text-sm sm:text-base">{order.orderNumber}</p>
                            </div>
                            <div className="hidden sm:block h-8 w-px bg-gray-300"></div>
                            <div className="whitespace-nowrap">
                              <p className="text-xs sm:text-sm text-gray-500">Date</p>
                              <p className="font-medium text-gray-900 text-sm sm:text-base">{formatDate(order.createdAt)}</p>
                            </div>
                            <div className="hidden sm:block h-8 w-px bg-gray-300"></div>
                            <div className="whitespace-nowrap">
                              <p className="text-xs sm:text-sm text-gray-500">Total</p>
                              <p className="font-semibold text-gray-900 text-sm sm:text-base">৳{order.total.toLocaleString()}</p>
                            </div>
                          </div>
                          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span className="hidden sm:inline">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                          </span>
                        </div>
                      </div>
                      
                      <div className="px-4 sm:px-6 py-3 sm:py-4">
                        <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">Items:</p>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center gap-2 sm:gap-3">
                                {item.image ? (
                                  <Image 
                                    src={item.image} 
                                    alt={item.name} 
                                    width={40} 
                                    height={40} 
                                    className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                                  />
                                ) : (
                                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <Package className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                                  </div>
                                )}
                                <div>
                                  <p className="font-medium text-gray-900 text-sm sm:text-base line-clamp-1">{item.name}</p>
                                  <p className="text-xs sm:text-sm text-gray-500">Qty: {item.quantity} × ৳{item.price.toLocaleString()}</p>
                                </div>
                              </div>
                              <p className="font-semibold text-gray-900 text-sm sm:text-base whitespace-nowrap">৳{(item.price * item.quantity).toLocaleString()}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
