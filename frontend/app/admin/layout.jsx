'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FaBars, FaTimes, FaTachometerAlt, FaBox, FaTags, 
  FaShoppingCart, FaUsers, FaCog, FaChartBar, 
  FaEnvelope, FaBell, FaSignOutAlt, FaChevronDown,
  FaFileAlt, FaTruck, FaCreditCard, FaQuestionCircle,
  FaBullhorn, FaMagic, FaNewspaper, FaPercent,
  FaWarehouse, FaTools, FaHeadset, FaStar
} from 'react-icons/fa';

const adminNavItems = [
  { icon: FaTachometerAlt, label: 'Dashboard', href: '/admin' },
  
  { icon: FaBox, label: 'Products', href: '/admin/products', subItems: [
    { label: 'All Products', href: '/admin/products' },
    { label: 'Add Product', href: '/admin/products/add' },
    { label: 'Categories', href: '/admin/categories' },
    { label: 'Add Category', href: '/admin/categories/add' },
    { label: 'Inventory', href: '/admin/inventory' },
  ]},
  
  { icon: FaShoppingCart, label: 'Orders', href: '/admin/orders' },
  
  { icon: FaUsers, label: 'Customers', href: '/admin/customers' },
  
  { icon: FaTags, label: 'Coupons', href: '/admin/coupons', subItems: [
    { label: 'All Coupons', href: '/admin/coupons' },
    { label: 'Add Coupon', href: '/admin/coupons/add' },
  ]},
  
  { icon: FaPercent, label: 'Offers', href: '/admin/offers' },
  
  { icon: FaBullhorn, label: 'Marketing', href: '/admin/marketing', subItems: [
    { label: 'Dashboard', href: '/admin/marketing' },
    { label: 'Abandoned Carts', href: '/admin/marketing/abandoned-carts' },
    { label: 'Affiliates', href: '/admin/marketing/affiliates' },
    { label: 'Campaigns', href: '/admin/marketing/campaigns' },
    { label: 'Conversion Stats', href: '/admin/marketing/conversion-stats' },
  ]},
  
  { icon: FaChartBar, label: 'Analytics', href: '/admin/analytics', subItems: [
    { label: 'Overview', href: '/admin/analytics' },
    { label: 'Demographic Reports', href: '/admin/analytics/demographic-reports' },
    { label: 'Sales Forecast', href: '/admin/analytics/sales-forecast' },
  ]},
  
  { icon: FaFileAlt, label: 'Reports', href: '/admin/reports' },
  
  { icon: FaStar, label: 'Reviews', href: '/admin/reviews' },
  
  { icon: FaTruck, label: 'Shipping', href: '/admin/shipping' },
  
  { icon: FaCreditCard, label: 'Payments', href: '/admin/payments' },
  
  { icon: FaEnvelope, label: 'Messages', href: '/admin/contact' },
  
  { icon: FaNewspaper, label: 'Newsletter', href: '/admin/newsletter' },
  
  { icon: FaQuestionCircle, label: 'FAQs', href: '/admin/faqs' },
  
  { icon: FaHeadset, label: 'Support', href: '/admin/maintenance' },
  
  { icon: FaTools, label: 'Intelligence', href: '/admin/intelligence', subItems: [
    { label: 'Overview', href: '/admin/intelligence' },
    { label: 'Customer Journey', href: '/admin/intelligence/customer-journey' },
    { label: 'Retention', href: '/admin/intelligence/retention' },
    { label: 'Search Insights', href: '/admin/intelligence/search-insights' },
  ]},
  
  { icon: FaCog, label: 'Settings', href: '/admin/settings', subItems: [
    { label: 'General', href: '/admin/settings/general' },
    { label: 'Website', href: '/admin/settings/website' },
    { label: 'Admin Users', href: '/admin/settings/admin-users' },
  ]},
  
  { icon: FaFileAlt, label: 'Activity Logs', href: '/admin/activity-logs' },
];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check admin authentication
    const token = localStorage.getItem('admin_token');
    const user = localStorage.getItem('admin_user');
    
    if (!token || !user) {
      // Not logged in, redirect to login
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      setAdminUser(JSON.parse(user));
    }
    setLoading(false);
  }, [router]);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="font-bold text-lg">Admin Panel</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <FaBell />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">
                {adminUser?.name?.charAt(0) || 'A'}
              </span>
            </div>
            <span className="hidden md:block font-medium">
              {adminUser?.name || 'Admin'}
            </span>
            <button 
              onClick={handleLogout}
              className="ml-2 text-red-500 hover:text-red-700"
              title="Logout"
            >
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-16 bottom-0 bg-white shadow-sm z-40 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0 -left-64 overflow-hidden'}`}>
        <nav className="p-4 space-y-1 overflow-y-auto h-full">
          {adminNavItems.map((item, index) => (
            <div key={index}>
              {item.subItems ? (
                <div>
                  <button
                    onClick={() => toggleDropdown(index)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50 ${activeDropdown === index ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon />
                      <span>{item.label}</span>
                    </div>
                    <FaChevronDown className={`text-xs transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`} />
                  </button>
                  {activeDropdown === index && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.subItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg"
                >
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              )}
            </div>
          ))}
          
          <hr className="my-4" />
          
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg">
            <FaSignOutAlt />
            <span>Back to Website</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
