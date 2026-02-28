'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminNavbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {pathname === '/admin' && 'Dashboard'}
            {pathname === '/admin/products' && 'Products Management'}
            {pathname === '/admin/categories' && 'Categories Management'}
            {pathname === '/admin/banners' && 'Banners Management'}
            {pathname === '/admin/users' && 'Users Management'}
            {pathname === '/admin/orders' && 'Orders Management'}
            {pathname === '/admin/pages' && 'Pages Management'}
            {pathname === '/admin/settings' && 'Settings'}
            {pathname === '/admin/contact' && 'Contact Messages'}
          </h2>
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
