'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { 
  User, Package, Heart, Settings, LogOut, ChevronRight, Loader2, 
  Save, CheckCircle, AlertCircle, Menu, X, Camera, Shield, 
  TrendingUp, Calendar, Award, Mail, Phone, MapPin
} from 'lucide-react';

export default function ProfilePage() {
  const { user, loading: authLoading, logout, checkAuth } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef(null);
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    avatar: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Bangladesh'
    }
  });

  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    wishlistCount: 0
  });

  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        gender: user.gender || '',
        avatar: user.avatar || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          zipCode: user.address?.zipCode || '',
          country: user.address?.country || 'Bangladesh'
        }
      });
      fetchUserStats();
      setLoading(false);
    }
  }, [user, authLoading, router]);

  const fetchUserStats = async () => {
    try {
      const ordersRes = await fetch('/api/orders');
      const ordersData = await ordersRes.json();
      
      const wishlistRes = await fetch('/api/wishlist');
      const wishlistData = await wishlistRes.json();

      if (ordersRes.ok) {
        const orders = ordersData.orders || ordersData || [];
        setStats(prev => ({
          ...prev,
          totalOrders: orders.length,
          pendingOrders: orders.filter(o => o.status === 'pending').length,
          completedOrders: orders.filter(o => o.status === 'delivered' || o.status === 'completed').length
        }));
      }

      if (wishlistRes.ok) {
        const wishlist = wishlistData.wishlist || wishlistData || [];
        setStats(prev => ({
          ...prev,
          wishlistCount: Array.isArray(wishlist) ? wishlist.length : 0
        }));
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const calculateProfileCompleteness = () => {
    let filled = 0;
    let total = 7;
    
    if (profileData.name) filled++;
    if (profileData.phone) filled++;
    if (profileData.dateOfBirth) filled++;
    if (profileData.gender) filled++;
    if (profileData.address.street) filled++;
    if (profileData.address.city) filled++;
    if (profileData.address.country) filled++;
    
    return Math.round((filled / total) * 100);
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    try {
      const previewUrl = URL.createObjectURL(file);
      setProfileData(prev => ({ ...prev, avatar: previewUrl }));
      
      setTimeout(() => {
        setUploadingAvatar(false);
        setMessage({ type: 'success', text: 'Avatar updated! Click Save to apply changes.' });
      }, 1000);
    } catch (error) {
      setUploadingAvatar(false);
      setMessage({ type: 'error', text: 'Failed to update avatar' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setProfileData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }));
    } else {
      setProfileData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        checkAuth();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to update profile' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  const profileCompleteness = calculateProfileCompleteness();
  const isProfileComplete = profileCompleteness === 100;

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

  const SidebarContent = () => (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
      <div className="text-center mb-6">
        <div className="relative inline-block">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#083b66] to-[#062d4d] rounded-full flex items-center justify-center mx-auto mb-3 overflow-hidden ring-4 ring-blue-100">
            {profileData.avatar ? (
              <Image 
                src={profileData.avatar} 
                alt={profileData.name} 
                width={96} 
                height={96} 
                className="rounded-full object-cover w-full h-full"
              />
            ) : (
              <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            )}
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 bg-[#083b66] text-white p-1.5 sm:p-2 rounded-full shadow-lg hover:bg-[#062d4d] transition-colors"
            >
              <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
          {uploadingAvatar && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
              <Loader2 className="w-6 h-6 animate-spin text-white" />
            </div>
          )}
        </div>
        <h3 className="font-bold text-gray-900 text-base sm:text-lg">{profileData.name || 'User'}</h3>
        <p className="text-xs sm:text-sm text-gray-500">{profileData.email}</p>
        
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-gray-500">Profile Complete</span>
            <span className={`font-semibold ${isProfileComplete ? 'text-green-600' : 'text-blue-600'}`}>
              {profileCompleteness}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${isProfileComplete ? 'bg-green-500' : 'bg-gradient-to-r from-[#083b66] to-blue-400'}`}
              style={{ width: `${profileCompleteness}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-4 sm:mb-6 p-3 bg-gray-50 rounded-lg">
        <div className="text-center p-2">
          <div className="flex items-center justify-center gap-1 text-[#083b66] mb-1">
            <Package className="w-4 h-4" />
            <span className="font-bold text-lg">{stats.totalOrders}</span>
          </div>
          <p className="text-xs text-gray-500">Orders</p>
        </div>
        <div className="text-center p-2">
          <div className="flex items-center justify-center gap-1 text-[#083b66] mb-1">
            <Heart className="w-4 h-4" />
            <span className="font-bold text-lg">{stats.wishlistCount}</span>
          </div>
          <p className="text-xs text-gray-500">Wishlist</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-4 sm:mb-6">
        <Award className="w-4 h-4" />
        <span>Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'N/A'}</span>
      </div>
      
      <nav className="space-y-1 sm:space-y-2">
        <Link href="/profile" className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 bg-[#083b66] text-white rounded-lg text-sm sm:text-base">
          <User className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-medium">My Profile</span>
        </Link>
        <Link href="/orders" className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 hover:bg-gray-50 rounded-lg text-sm sm:text-base">
          <Package className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-medium">My Orders</span>
          {stats.pendingOrders > 0 && (
            <span className="ml-auto bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full">{stats.pendingOrders}</span>
          )}
        </Link>
        <Link href="/wishlist" className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 hover:bg-gray-50 rounded-lg text-sm sm:text-base">
          <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-medium">Wishlist</span>
        </Link>
        <Link href="/settings" className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 hover:bg-gray-50 rounded-lg text-sm sm:text-base">
          <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-medium">Settings</span>
        </Link>
        <button onClick={handleLogout} className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-red-600 hover:bg-red-50 rounded-lg w-full text-sm sm:text-base">
          <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </nav>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-[#083b66] via-[#0a4a7d] to-[#083b66] text-white py-8 sm:py-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-24 translate-y-24" />
          </div>
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-1">My Account</h1>
                <p className="text-blue-200 text-sm sm:text-base">Welcome back, {profileData.name || profileData.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium">Verified Account</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 -mt-4">
          <div className="md:hidden mb-4">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-lg shadow-sm text-gray-700 w-full justify-between font-medium"
            >
              <span className="flex items-center gap-2">
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                <span>Menu</span>
              </span>
              <span className="text-sm text-gray-500">{profileCompleteness}% Complete</span>
            </button>
          </div>

          <div className="grid md:grid-cols-4 gap-4 sm:gap-6">
            <div className="hidden md:block md:col-span-1">
              <SidebarContent />
            </div>

            {mobileMenuOpen && (
              <div className="md:hidden">
                <SidebarContent />
              </div>
            )}

            <div className="md:col-span-3 space-y-4 sm:space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="bg-gradient-to-r from-gray-50 to-white px-4 sm:px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#083b66] rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Profile Information</h2>
                      <p className="text-sm text-gray-500">Manage your personal details</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6">
                  {message.text && (
                    <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 text-sm ${
                      message.type === 'success' 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {message.type === 'success' ? (
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      )}
                      <span>{message.text}</span>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    <div className="mb-8">
                      <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-4 pb-2 border-b">
                        <span className="w-1 h-4 bg-[#083b66] rounded-full"></span>
                        Personal Information
                      </h3>
                      
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input 
                              type="text" 
                              name="name"
                              value={profileData.name} 
                              onChange={handleChange}
                              placeholder="Enter your full name"
                              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#083b66] focus:border-transparent transition-all text-sm" 
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input 
                              type="email" 
                              value={profileData.email} 
                              disabled 
                              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 text-sm cursor-not-allowed" 
                            />
                          </div>
                          <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input 
                              type="tel" 
                              name="phone"
                              value={profileData.phone} 
                              onChange={handleChange}
                              placeholder="Enter phone number"
                              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#083b66] focus:border-transparent transition-all text-sm" 
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input 
                              type="date" 
                              name="dateOfBirth"
                              value={profileData.dateOfBirth} 
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#083b66] focus:border-transparent transition-all text-sm" 
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                          <div className="flex gap-4 mt-2">
                            {['male', 'female', 'other'].map((gender) => (
                              <label key={gender} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name="gender"
                                  value={gender}
                                  checked={profileData.gender === gender}
                                  onChange={handleChange}
                                  className="w-4 h-4 text-[#083b66] border-gray-300 focus:ring-[#083b66]"
                                />
                                <span className="text-sm text-gray-700 capitalize">{gender}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-4 pb-2 border-b">
                        <span className="w-1 h-4 bg-[#083b66] rounded-full"></span>
                        Address Information
                      </h3>
                      
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input 
                              type="text" 
                              name="address.street"
                              value={profileData.address.street} 
                              onChange={handleChange}
                              placeholder="Enter street address"
                              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#083b66] focus:border-transparent transition-all text-sm" 
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                          <input 
                            type="text" 
                            name="address.city"
                            value={profileData.address.city} 
                            onChange={handleChange}
                            placeholder="Enter city"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#083b66] focus:border-transparent transition-all text-sm" 
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
                          <input 
                            type="text" 
                            name="address.state"
                            value={profileData.address.state} 
                            onChange={handleChange}
                            placeholder="Enter state"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#083b66] focus:border-transparent transition-all text-sm" 
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
                          <input 
                            type="text" 
                            name="address.zipCode"
                            value={profileData.address.zipCode} 
                            onChange={handleChange}
                            placeholder="Enter zip code"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#083b66] focus:border-transparent transition-all text-sm" 
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                          <input 
                            type="text" 
                            name="address.country"
                            value={profileData.address.country} 
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#083b66] focus:border-transparent transition-all text-sm" 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                      <button 
                        type="submit" 
                        disabled={updating}
                        className="order-2 sm:order-1 w-full sm:w-auto px-6 py-2.5 bg-[#083b66] text-white font-semibold rounded-lg hover:bg-[#062d4d] disabled:opacity-50 flex items-center justify-center gap-2 text-sm transition-colors"
                      >
                        {updating ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        {updating ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button 
                        type="button"
                        onClick={() => router.push('/')}
                        className="order-1 sm:order-2 w-full sm:w-auto px-6 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 text-sm transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-[#083b66]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Order Statistics</h3>
                      <p className="text-xs text-gray-500">Your shopping activity</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-[#083b66]">{stats.totalOrders}</p>
                      <p className="text-xs text-gray-500">Total</p>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">{stats.pendingOrders}</p>
                      <p className="text-xs text-orange-600">Pending</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{stats.completedOrders}</p>
                      <p className="text-xs text-green-600">Completed</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Link href="/orders" className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-[#083b66] hover:bg-blue-50 transition-all group">
                      <div className="flex items-center gap-3">
                        <Package className="w-5 h-5 text-[#083b66]" />
                        <span className="font-medium text-gray-700 group-hover:text-[#083b66] text-sm">View Orders</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#083b66]" />
                    </Link>
                    <Link href="/wishlist" className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-[#083b66] hover:bg-blue-50 transition-all group">
                      <div className="flex items-center gap-3">
                        <Heart className="w-5 h-5 text-[#083b66]" />
                        <span className="font-medium text-gray-700 group-hover:text-[#083b66] text-sm">My Wishlist</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#083b66]" />
                    </Link>
                    <Link href="/settings" className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-[#083b66] hover:bg-blue-50 transition-all group">
                      <div className="flex items-center gap-3">
                        <Settings className="w-5 h-5 text-[#083b66]" />
                        <span className="font-medium text-gray-700 group-hover:text-[#083b66] text-sm">Account Settings</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#083b66]" />
                    </Link>
                  </div>
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
