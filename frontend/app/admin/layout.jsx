'use client';

import { useState } from 'react';
import Link from 'next/link';
// FaCog দুইবার ছিল, এখন একবার করে দেওয়া হয়েছে
import { 
  FaBars, FaTimes, FaTachometerAlt, FaBox, FaTags, 
  FaShoppingCart, FaUsers, FaCog, FaChartBar, 
  FaEnvelope, FaBell, FaSignOutAlt, FaChevronDown 
} from 'react-icons/fa';

const adminNavItems = [
  { icon: FaTachometerAlt, label: 'Dashboard', href: '/admin' },
  { icon: FaBox, label: 'Products', href: '/admin/products', subItems: [
    { label: 'All Products', href: '/admin/products' },
    { label: 'Add Product', href: '/admin/products/add' },
    { label: 'Categories', href: '/admin/categories' },
    { label: 'Brands', href: '/admin/brands' },
  ]},
  { icon: FaShoppingCart, label: 'Orders', href: '/admin/orders' },
  { icon: FaUsers, label: 'Customers', href: '/admin/customers' },
  { icon: FaTags, label: 'Coupons', href: '/admin/coupons' },
  { icon: FaChartBar, label: 'Reports', href: '/admin/reports' },
  { icon: FaEnvelope, label: 'Messages', href: '/admin/messages' },
  { icon: FaCog, label: 'Settings', href: '/admin/settings' },
];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

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
              <span className="text-blue-600 font-semibold text-sm">A</span>
            </div>
            <span className="hidden md:block font-medium">Admin</span>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-16 bottom-0 bg-white shadow-sm z-40 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0 -left-64 overflow-hidden'}`}>
        <nav className="p-4 space-y-1">
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
                    <div className="ml-8 mt-1 space-y-1">
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
