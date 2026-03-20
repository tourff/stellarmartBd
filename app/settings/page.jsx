'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { 
  User, Package, Heart, Settings as SettingsIcon, LogOut, Loader2, 
  Save, CheckCircle, AlertCircle, Lock, Eye, EyeOff, Menu, X,
  Bell, Shield, Trash2
} from 'lucide-react';

export default function SettingsPage() {
  const { user, loading: authLoading, logout, checkAuth } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('password');
  
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

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotionalEmails: true,
    smsNotifications: false,
    pushNotifications: true
  });
  const [savingNotifications, setSavingNotifications] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState({ type: '', text: '' });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showOrders: true,
    showWishlist: true
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user) {
      if (user.notificationPreferences) {
        setNotifications(user.notificationPreferences);
      }
      if (user.privacySettings) {
        setPrivacy(user.privacySettings);
      }
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
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notificationPreferences: notifications,
          privacySettings: privacy
        })
      });

      if (res.ok) {
        setNotificationMessage({ type: 'success', text: 'Preferences saved!' });
        checkAuth();
      } else {
        setNotificationMessage({ type: 'error', text: 'Failed to save preferences' });
      }
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#083b66] to-[#062d4d] text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4">
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
                {activeTab === 'password' && (
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Change Password</h2>
                    
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
                              className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#083b66] text-sm"
                            />
                            <button type="button" onClick={() => togglePasswordVisibility('current')} className="absolute right-3 top-1/2 -translate-y-1/2">
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
                              className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#083b66] text-sm"
                            />
                            <button type="button" onClick={() => togglePasswordVisibility('new')} className="absolute right-3 top-1/2 -translate-y-1/2">
                              {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                          <input 
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#083b66] text-sm"
                          />
                        </div>

                        <div className="pt-3">
                          <button 
                            type="submit" 
                            disabled={changingPassword}
                            className="w-full sm:w-auto px-6 py-2.5 bg-[#083b66] text-white rounded-lg hover:bg-[#062d4d] disabled:opacity-50 flex items-center justify-center gap-2"
                          >
                            {changingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Change Password
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Notification Preferences</h2>

                    {notificationMessage.text && (
                      <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 text-sm ${
                        notificationMessage.type === 'success' 
                          ? 'bg-green-50 text-green-700' 
                          : 'bg-red-50 text-red-700'
                      }`}>
                        {notificationMessage.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        <span>{notificationMessage.text}</span>
                      </div>
                    )}

                    <div className="space-y-4">
                      {[
                        { key: 'orderUpdates', title: 'Order Updates', desc: 'Get notified about order status' },
                        { key: 'promotionalEmails', title: 'Promotional Emails', desc: 'Receive deals and offers' },
                        { key: 'smsNotifications', title: 'SMS Notifications', desc: 'Text message alerts' },
                        { key: 'pushNotifications', title: 'Push Notifications', desc: 'Browser notifications' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{item.title}</p>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                          </div>
                          <button
                            onClick={() => handleNotificationChange(item.key)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${notifications[item.key] ? 'bg-[#083b66]' : 'bg-gray-300'}`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white ${notifications[item.key] ? 'translate-x-6' : 'translate-x-1'}`} />
                          </button>
                        </div>
                      ))}

                      <div className="pt-3">
                        <button onClick={saveNotifications} disabled={savingNotifications} className="px-6 py-2.5 bg-[#083b66] text-white rounded-lg hover:bg-[#062d4d]">
                          {savingNotifications ? 'Saving...' : 'Save Preferences'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'privacy' && (
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Privacy Settings</h2>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <label className="block font-medium text-gray-900 mb-3">Profile Visibility</label>
                        {['public', 'friends', 'private'].map((opt) => (
                          <label key={opt} className="flex items-center gap-3 p-2 cursor-pointer">
                            <input type="radio" name="visibility" value={opt} checked={privacy.profileVisibility === opt} onChange={() => setPrivacy(p => ({...p, profileVisibility: opt}))} className="w-4 h-4" />
                            <span className="capitalize">{opt}</span>
                          </label>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div><p className="font-medium">Show Orders</p></div>
                        <button onClick={() => setPrivacy(p => ({...p, showOrders: !p.showOrders}))} className={`relative inline-flex h-6 w-11 rounded-full ${privacy.showOrders ? 'bg-[#083b66]' : 'bg-gray-300'}`}>
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white ${privacy.showOrders ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div><p className="font-medium">Show Wishlist</p></div>
                        <button onClick={() => setPrivacy(p => ({...p, showWishlist: !p.showWishlist}))} className={`relative inline-flex h-6 w-11 rounded-full ${privacy.showWishlist ? 'bg-[#083b66]' : 'bg-gray-300'}`}>
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white ${privacy.showWishlist ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                      </div>

                      <div className="pt-3">
                        <button onClick={saveNotifications} className="px-6 py-2.5 bg-[#083b66] text-white rounded-lg hover:bg-[#062d4d]">Save Privacy Settings</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Account Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex justify-between py-2 border-b"><span className="text-gray-500">Account Type</span><span className="font-medium capitalize">{user?.role || 'Customer'}</span></div>
                <div className="flex justify-between py-2 border-b"><span className="text-gray-500">Status</span><span className="font-medium text-green-600 capitalize">{user?.status || 'Active'}</span></div>
                <div className="flex justify-between py-2 border-b"><span className="text-gray-500">Member Since</span><span className="font-medium">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span></div>
                <div className="flex justify-between py-2"><span className="text-gray-500">Last Login</span><span className="font-medium">{user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'N/A'}</span></div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-red-100 p-4 sm:p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Danger Zone</h3>
              <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                <div className="flex items-center justify-between">
                  <div><p className="font-medium">Delete Account</p><p className="text-sm text-gray-500">Permanently delete your account</p></div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"><Trash2 className="w-4 h-4" />Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
