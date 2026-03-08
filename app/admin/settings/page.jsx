'use client';

import { useState } from 'react';
import { 
  Settings, 
  Save, 
  Globe, 
  Mail, 
  Phone, 
  MapPin,
  Clock,
  DollarSign,
  Truck,
  Shield,
  Bell,
  Palette,
  Code,
  Database,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Upload,
  Image,
  Video,
  FileText,
  Link,
  Share2
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    // General
    siteName: 'StellarMart',
    siteDescription: 'Your one-stop shop for electronics and more',
    siteUrl: 'https://stellarmart.com',
    logo: '',
    favicon: '',
    timezone: 'Asia/Dhaka',
    language: 'en',
    
    // Store
    currency: 'BDT',
    currencySymbol: '৳',
    taxRate: 5,
    shippingCost: 50,
    freeShippingThreshold: 1000,
    minOrderAmount: 100,
    
    // Contact
    contactEmail: 'support@stellarmart.com',
    contactPhone: '+880 1234 567890',
    contactAddress: '123 Commerce Street, Dhaka, Bangladesh',
    workingHours: '9:00 AM - 10:00 PM',
    
    // Email
    smtpHost: 'smtp.example.com',
    smtpPort: '587',
    smtpUser: 'noreply@stellarmart.com',
    smtpPassword: '',
    emailFromName: 'StellarMart',
    emailFromEmail: 'noreply@stellarmart.com',
    
    // Payment
    bkashNumber: '8801234567890',
    nagadNumber: '8801234567890',
    bankName: 'Bangladesh Bank',
    accountNumber: '1234567890',
    accountName: 'StellarMart Ltd',
    
    // Social
    facebookUrl: 'https://facebook.com/stellarmart',
    twitterUrl: 'https://twitter.com/stellarmart',
    instagramUrl: 'https://instagram.com/stellarmart',
    youtubeUrl: 'https://youtube.com/stellarmart',
    
    // Maintenance
    maintenanceMode: false,
    comingSoon: false,
  });

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'store', label: 'Store', icon: Database },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'payment', label: 'Payment', icon: DollarSign },
    { id: 'social', label: 'Social', icon: Share2 },
    { id: 'maintenance', label: 'Maintenance', icon: Shield },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-500">Manage your store settings</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className={`px-6 py-2 rounded-lg flex items-center gap-2 ${
            saving ? 'bg-gray-400' : saved ? 'bg-green-600' : 'bg-blue-600'
          } text-white hover:bg-blue-700`}
        >
          {saving ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : saved ? (
            <>
              <CheckCircle className="w-4 h-4" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-56 bg-white rounded-xl shadow-sm p-4">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-xl shadow-sm p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">General Settings</h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Site Name</label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Site URL</label>
                  <input
                    type="text"
                    value={settings.siteUrl}
                    onChange={(e) => setSettings({...settings, siteUrl: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Site Description</label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Timezone</label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Asia/Dhaka">Asia/Dhaka (GMT+6)</option>
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">America/New_York</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Language</label>
                  <select
                    value={settings.language}
                    onChange={(e) => setSettings({...settings, language: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="en">English</option>
                    <option value="bn">Bangla</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Logo</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Click to upload logo</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Favicon</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Click to upload favicon</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'store' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Store Settings</h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Currency</label>
                  <select
                    value={settings.currency}
                    onChange={(e) => setSettings({...settings, currency: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="BDT">BDT - Bangladeshi Taka</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Currency Symbol</label>
                  <input
                    type="text"
                    value={settings.currencySymbol}
                    onChange={(e) => setSettings({...settings, currencySymbol: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Tax Rate (%)</label>
                  <input
                    type="number"
                    value={settings.taxRate}
                    onChange={(e) => setSettings({...settings, taxRate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Shipping Cost</label>
                  <input
                    type="number"
                    value={settings.shippingCost}
                    onChange={(e) => setSettings({...settings, shippingCost: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Free Shipping Threshold</label>
                  <input
                    type="number"
                    value={settings.freeShippingThreshold}
                    onChange={(e) => setSettings({...settings, freeShippingThreshold: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Minimum Order Amount</label>
                  <input
                    type="number"
                    value={settings.minOrderAmount}
                    onChange={(e) => setSettings({...settings, minOrderAmount: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Contact Settings</h2>
              
              <div>
                <label className="block text-sm font-medium mb-1">Contact Email</label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={settings.contactPhone}
                  onChange={(e) => setSettings({...settings, contactPhone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <textarea
                  value={settings.contactAddress}
                  onChange={(e) => setSettings({...settings, contactAddress: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Working Hours</label>
                <input
                  type="text"
                  value={settings.workingHours}
                  onChange={(e) => setSettings({...settings, workingHours: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'email' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Email Settings (SMTP)</h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">SMTP Host</label>
                  <input
                    type="text"
                    value={settings.smtpHost}
                    onChange={(e) => setSettings({...settings, smtpHost: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">SMTP Port</label>
                  <input
                    type="text"
                    value={settings.smtpPort}
                    onChange={(e) => setSettings({...settings, smtpPort: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">SMTP Username</label>
                  <input
                    type="text"
                    value={settings.smtpUser}
                    onChange={(e) => setSettings({...settings, smtpUser: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">SMTP Password</label>
                  <input
                    type="password"
                    value={settings.smtpPassword}
                    onChange={(e) => setSettings({...settings, smtpPassword: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">From Name</label>
                  <input
                    type="text"
                    value={settings.emailFromName}
                    onChange={(e) => setSettings({...settings, emailFromName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">From Email</label>
                  <input
                    type="email"
                    value={settings.emailFromEmail}
                    onChange={(e) => setSettings({...settings, emailFromEmail: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Payment Settings</h2>
              
              <div className="border-b pb-6">
                <h3 className="font-medium mb-4">Mobile Banking</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">bKash Number</label>
                    <input
                      type="text"
                      value={settings.bkashNumber}
                      onChange={(e) => setSettings({...settings, bkashNumber: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Nagad Number</label>
                    <input
                      type="text"
                      value={settings.nagadNumber}
                      onChange={(e) => setSettings({...settings, nagadNumber: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-4">Bank Transfer</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Bank Name</label>
                    <input
                      type="text"
                      value={settings.bankName}
                      onChange={(e) => setSettings({...settings, bankName: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Account Number</label>
                    <input
                      type="text"
                      value={settings.accountNumber}
                      onChange={(e) => setSettings({...settings, accountNumber: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">Account Name</label>
                  <input
                    type="text"
                    value={settings.accountName}
                    onChange={(e) => setSettings({...settings, accountName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Social Media Settings</h2>
              
              <div>
                <label className="block text-sm font-medium mb-1">Facebook URL</label>
                <input
                  type="url"
                  value={settings.facebookUrl}
                  onChange={(e) => setSettings({...settings, facebookUrl: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Twitter URL</label>
                <input
                  type="url"
                  value={settings.twitterUrl}
                  onChange={(e) => setSettings({...settings, twitterUrl: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Instagram URL</label>
                <input
                  type="url"
                  value={settings.instagramUrl}
                  onChange={(e) => setSettings({...settings, instagramUrl: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">YouTube URL</label>
                <input
                  type="url"
                  value={settings.youtubeUrl}
                  onChange={(e) => setSettings({...settings, youtubeUrl: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Maintenance Settings</h2>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800">Warning</p>
                    <p className="text-sm text-yellow-700">Enabling maintenance mode will make your store unavailable to customers.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={(e) => setSettings({...settings, maintenanceMode: e.target.checked})}
                    className="w-5 h-5 text-blue-600"
                  />
                  <div>
                    <p className="font-medium">Maintenance Mode</p>
                    <p className="text-sm text-gray-500">Temporarily disable the store for maintenance</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={settings.comingSoon}
                    onChange={(e) => setSettings({...settings, comingSoon: e.target.checked})}
                    className="w-5 h-5 text-blue-600"
                  />
                  <div>
                    <p className="font-medium">Coming Soon Page</p>
                    <p className="text-sm text-gray-500">Show a coming soon page to visitors</p>
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
