'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { 
  User, Package, Heart, Settings as SettingsIcon, LogOut, Loader2, 
  Save, CheckCircle, AlertCircle, Lock, Eye, EyeOff, Menu, X,
  Bell, Shield, Trash2, Mail, Smartphone, AlertTriangle
} from 'lucide-react';

export default function SettingsPage() {
  const { user, loading: authLoading, logout, checkAuth } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('password');
  
  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

  // Notification preferences
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotionalEmails: true,
    smsNotifications: false,
    pushNotifications: true
  });
  const [savingNotifications, setSavingNotifications] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState({ type: '', text: '' });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showOrders: true,
    showWishlist: true
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user) {
      setLoading(false);
    }
  }, [user, authLoading, router]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordMessage({ type: '', text: '' });

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    setChangingPassword(true);

    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      const data = await res.json();

      if (res.ok) {
        setPasswordMessage({ type: 'success', text: 'Password changed successfully!' });
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        setPasswordMessage({ type: 'error', text: data.error || 'Failed to change password' });
      }
    } catch (error) {
      setPasswordMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    } finally {
      setChangingPassword(false);
    }
  };

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const saveNotifications = async () => {
    setSavingNotifications(true);
    setNotificationMessage({ type: '', text: '' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNotificationMessage({ type: 'success', text: 'Notification preferences saved!' });
    } catch (error) {
      setNotificationMessage({ type: 'error', text: 'Failed to save preferences' });
    } finally {
      setSavingNotifications(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
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

  const SidebarContent = () => (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
      <div className="text-center mb-4 sm:mb-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#083b66] rounded-full flex items-center justify-center mx-auto mb-3">
          <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>
        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{user?.name || 'User'}</h3>
        <p className="text-xs sm:text-sm text-gray-500">{user?.email}</p>
      </div>
      
      <nav className="space-y-1 sm:space-y-2">
        <Link href="/profile" className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 hover:bg-gray-50 rounded-lg text-sm sm:text-base">
          <User className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-medium">My Profile</span>
        </Link>
        <Link href="/orders" className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 hover:bg-gray-50 rounded-lg text-sm sm:text-base">
          <Package className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-medium">My Orders</span>
        </Link>
        <Link href="/wishlist" className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 hover:bg-gray-50 rounded-lg text-sm sm:text-base">
          <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-medium">Wishlist</span>
        </Link>
        <Link href="/settings" className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 bg-[#083b66] text-white rounded-lg text-sm sm:text-base">
          <SettingsIcon className="w-4 h-4 sm:w-5 sm:h-5" />
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
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">Settings</h1>
            <p className="text-blue-200 text-sm sm:text-base">Manage your account settings and preferences</p>
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
              <span className="text-sm text-gray-500">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span>
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
              {/* Tabs */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="border-b overflow-x-auto">
                  <nav className="flex min-w-max">
                    <button
                      onClick={() => setActiveTab('password')}
                      className={`px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === 'password'
                          ? 'border-[#083b66] text-[#083b66]'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Password
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveTab('notifications')}
                      className={`px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === 'notifications'
                          ? 'border-[#083b66] text-[#083b66]'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4" />
                        Notifications
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveTab('privacy')}
                      className={`px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === 'privacy'
                          ? 'border-[#083b66] text-[#083b66]'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Privacy
                      </div>
                    </button>
                  </nav>
                </div>

                <div className="p-4 sm:p-6">
                  {/* Password Tab */}
                  {activeTab === 'password' && (
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Lock className="w-5 h-5 text-[#083b66]" />
                        </div>
                        <div>
                          <h2 className="text-lg font-bold text-gray-900">Change Password</h2>
                          <p className="text-sm text-gray-500">Update your password to keep your account secure</p>
                        </div>
                      </div>
                      
                      {passwordMessage.text && (
                        <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 text-sm ${
                          passwordMessage.type === 'success' 
                            ? 'bg-green-50 text-green-700 border border-green-200' 
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                          {passwordMessage.type === 'success' ? (
                            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          ) : (
                            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          )}
                          <span>{passwordMessage.text}</span>
                        </div>
                      )}

                      <form onSubmit={handlePasswordChange}>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                            <div className="relative">
                              <input 
                                type={showPasswords.current ? 'text' : 'password'}
                                value={passwordData.currentPassword}
                                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                                required
                                className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#083b66] focus:border-transparent text-sm"
                                placeholder="Enter current password"
                              />
                              <button
                                type="button"
                                onClick={() => togglePasswordVisibility('current')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                              >
                                {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                            <div className="relative">
                              <input 
                                type={showPasswords.new ? 'text' : 'password'}
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                                required
                                className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#083b66] focus:border-transparent text-sm"
                                placeholder="Enter new password"
                              />
                              <button
                                type="button"
                                onClick={() => togglePasswordVisibility('new')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                              >
                                {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                            <div className="relative">
                              <input 
                                type={showPasswords.confirm ? 'text' : 'password'}
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                required
                                className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#083b66] focus:border-transparent text-sm"
                                placeholder="Confirm new password"
                              />
                              <button
                                type="button"
                                onClick={() => togglePasswordVisibility('confirm')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                              >
                                {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>

                          <div className="pt-3">
                            <button 
                              type="submit" 
                              disabled={changingPassword}
                              className="w-full sm:w-auto px-6 py-2.5 bg-[#083b66] text-white font-semibold rounded-lg hover:bg-[#062d4d] disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
                            >
                              {changingPassword ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Save className="w-4 h-4" />
                              )}
                              {changingPassword ? 'Changing...' : 'Change Password'}
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Notifications Tab */}
                  {activeTab === 'notifications' && (
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Bell className="w-5 h-5 text-[#083b66]" />
                        </div>
                        <div>
                          <h2 className="text-lg font-bold text-gray-900">Notification Preferences</h2>
                          <p className="text-sm text-gray-500">Choose how you want to receive updates</p>
                        </div>
                      </div>

                      {notificationMessage.text && (
                        <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 text-sm ${
                          notificationMessage.type === 'success' 
                            ? 'bg-green-50 text-green-700 border border-green-200' 
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                          {notificationMessage.type === 'success' ? (
                            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          ) : (
                            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          )}
                          <span>{notificationMessage.text}</span>
                        </div>
                      )}

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Package className="w-5 h-5 text-[#083b66]" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">Order Updates</p>
                              <p className="text-sm text-gray-500">Get notified about order status changes</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleNotificationChange('orderUpdates')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              notifications.orderUpdates ? 'bg-[#083b66]' : 'bg-gray-300'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.orderUpdates ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                              <Mail className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">Promotional Emails</p>
                              <p className="text-sm text-gray-500">Receive deals and special offers</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleNotificationChange('promotionalEmails')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              notifications.promotionalEmails ? 'bg-[#083b66]' : 'bg-gray-300'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.promotionalEmails ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                              <Smartphone className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">SMS Notifications</p>
                              <p className="text-sm text-gray-500">Receive text message alerts</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleNotificationChange('smsNotifications')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              notifications.smsNotifications ? 'bg-[#083b66]' : 'bg-gray-300'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.smsNotifications ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>

                        <div className="pt-3">
                          <button 
                            onClick={saveNotifications}
                            disabled={savingNotifications}
                            className="w-full sm:w-auto px-6 py-2.5 bg-[#083b66] text-white font-semibold rounded-lg hover:bg-[#062d4d] disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
                          >
                            {savingNotifications ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Save className="w-4 h-4" />
                            )}
                            {savingNotifications ? 'Saving...' : 'Save Preferences'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Privacy Tab */}
                  {activeTab === 'privacy' && (
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Shield className="w-5 h-5 text-[#083b66]" />
                        </div>
                        <div>
                          <h2 className="text-lg font-bold text-gray-900">Privacy Settings</h2>
                          <p className="text-sm text-gray-500">Control your account visibility</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <label className="block font-medium text-gray-900 mb-3">Profile Visibility</label>
                          <div className="space-y-2">
                            {[
                              { value: 'public', label: 'Public', desc: 'Anyone can view your profile' },
                              { value: 'friends', label: 'Friends Only', desc: 'Only friends can view your profile' },
                              { value: 'private', label: 'Private', desc: 'Only you can view your profile' }
                            ].map((option) => (
                              <label key={option.value} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-white transition-colors">
                                <input
                                  type="radio"
                                  name="profileVisibility"
                                  value={option.value}
                                  checked={privacy.profileVisibility === option.value}
                                  onChange={(e) => setPrivacy(prev => ({ ...prev, profileVisibility: e.target.value }))}
                                  className="w-4 h-4 text-[#083b66] border-gray-300 focus:ring-[#083b66]"
                                />
                                <div>
                                  <p className="font-medium text-gray-900">{option.label}</p>
                                  <p className="text-sm text-gray-500">{option.desc}</p>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">Show Orders</p>
                            <p className="text-sm text-gray-500">Allow others to see your order history</p>
                          </div>
                          <button
                            onClick={() => setPrivacy(prev => ({ ...prev, showOrders: !prev.showOrders }))}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              privacy.showOrders ? 'bg-[#083b66]' : 'bg-gray-300'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              privacy.showOrders ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">Show Wishlist</p>
                            <p className="text-sm text-gray-500">Allow others to see your wishlist</p>
                          </div>
                          <button
                            onClick={() => setPrivacy(prev => ({ ...prev, showWishlist: !prev.showWishlist }))}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              privacy.showWishlist ? 'bg-[#083b66]' : 'bg-gray-300'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              privacy.showWishlist ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Account Info */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Account Information</h3>
                    <p className="text-sm text-gray-500">Your account details</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex justify-between py-2 border-b text-sm">
                    <span className="text-gray-500">Account Type</span>
                    <span className="font-medium text-gray-900 capitalize">{user?.role || 'Customer'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b text-sm">
                    <span className="text-gray-500">Account Status</span>
                    <span className="font-medium text-green-600 capitalize">{user?.status || 'Active'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b text-sm">
                    <span className="text-gray-500">Member Since</span>
                    <span className="font-medium text-gray-900">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      }) : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 text-sm">
                    <span className="text-gray-500">Last Login</span>
                    <span className="font-medium text-gray-900">
                      {user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-white rounded-xl shadow-sm border border-red-100 p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Danger Zone</h3>
                    <p className="text-sm text-gray-500">Irreversible account actions</p>
                  </div>
                </div>
                <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Delete Account</p>
                      <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
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
