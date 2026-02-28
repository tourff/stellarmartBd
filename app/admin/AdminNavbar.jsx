'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const pageTitles = {
  '/admin': 'Dashboard',
  '/admin/products': 'Products Management',
  '/admin/categories': 'Categories Management',
  '/admin/banners': 'Banners Management',
  '/admin/users': 'Users Management',
  '/admin/orders': 'Orders Management',
  '/admin/pages': 'Pages Management',
  '/admin/settings': 'Settings',
  '/admin/contact': 'Contact Messages',
  '/admin/user-intelligence': 'User Intelligence',
  '/admin/marketing-intel': 'Marketing Intelligence',
  '/admin/analytics': 'Analytics',
  '/admin/reports': 'Reports',
  '/admin/system-health': 'System Health',
  '/admin/build-logs': 'Build Logs',
  '/admin/page-logs': 'Page Logs',
  '/admin/activity-logs': 'Activity Logs',
  '/admin/notifications': 'Notifications',
  '/admin/coupons': 'Coupons Management',
  '/admin/shipping': 'Shipping Management',
  '/admin/vendors': 'Vendors Management',
  '/admin/seo': 'SEO Settings',
  '/admin/media': 'Media Library',
  '/admin/database': 'Database Management',
  '/admin/cache': 'Cache Management',
  '/admin/backup': 'Backup & Restore',
};

export default function AdminNavbar() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || 'Admin Panel';

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            View Website
          </Link>
        </div>
      </div>
    </nav>
  );
}
