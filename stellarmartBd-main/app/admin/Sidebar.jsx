'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  // Main Menu
  { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
  { name: 'Products', href: '/admin/products', icon: '🛍️' },
  { name: 'Categories', href: '/admin/categories', icon: '📁' },
  { name: 'Banners', href: '/admin/banners', icon: '🖼️' },
  { name: 'Users', href: '/admin/users', icon: '👥' },
  { name: 'Orders', href: '/admin/orders', icon: '📦' },
  { name: 'Pages', href: '/admin/pages', icon: '📄' },
  { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
  { name: 'Contact', href: '/admin/contact', icon: '✉️' },
  
  // Analytics & Intelligence
  { name: 'User Intelligence', href: '/admin/user-intelligence', icon: '🧠' },
  { name: 'Marketing Intel', href: '/admin/marketing-intel', icon: '📈' },
  { name: 'Analytics', href: '/admin/analytics', icon: '📊' },
  { name: 'Reports', href: '/admin/reports', icon: '📋' },
  
  // System
  { name: 'System Health', href: '/admin/system-health', icon: '💚' },
  { name: 'Build Logs', href: '/admin/build-logs', icon: '🔧' },
  { name: 'Page Logs', href: '/admin/page-logs', icon: '📝' },
  { name: 'Activity Logs', href: '/admin/activity-logs', icon: '📜' },
  { name: 'Notifications', href: '/admin/notifications', icon: '🔔' },
  
  // Additional
  { name: 'Coupons', href: '/admin/coupons', icon: '🎟️' },
  { name: 'Shipping', href: '/admin/shipping', icon: '🚚' },
  { name: 'Vendors', href: '/admin/vendors', icon: '🏪' },
  { name: 'SEO', href: '/admin/seo', icon: '🔍' },
  { name: 'Media Library', href: '/admin/media', icon: '🖼️' },
  { name: 'Database', href: '/admin/database', icon: '🗄️' },
  { name: 'Cache', href: '/admin/cache', icon: '💾' },
  { name: 'Backup', href: '/admin/backup', icon: '💰' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-lg fixed h-full overflow-y-auto z-40">
      <div className="p-4 border-b">
        <Link href="/admin/dashboard" className="text-xl font-extrabold text-blue-700 flex items-center gap-2">
          🛒 StellarMartBD
        </Link>
        <p className="text-xs text-gray-500 mt-1">Admin Panel</p>
      </div>
      
      <nav className="p-2 pb-20">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="fixed bottom-0 w-64 p-4 border-t bg-white shadow-lg">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-600 hover:text-blue-700 font-medium"
        >
          <span>🌐</span>
          <span>View Website</span>
        </Link>
      </div>
    </aside>
  );
}
