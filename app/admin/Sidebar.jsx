'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { name: 'Dashboard', href: '/admin', icon: '📊' },
  { name: 'Products', href: '/admin/products', icon: '🛍️' },
  { name: 'Categories', href: '/admin/categories', icon: '📁' },
  { name: 'Banners', href: '/admin/banners', icon: '🖼️' },
  { name: 'Users', href: '/admin/users', icon: '👥' },
  { name: 'Orders', href: '/admin/orders', icon: '📦' },
  { name: 'Pages', href: '/admin/pages', icon: '📄' },
  { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
  { name: 'Contact', href: '/admin/contact', icon: '✉️' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-lg fixed h-full overflow-y-auto z-40">
      <div className="p-4 border-b">
        <Link href="/admin" className="text-xl font-extrabold text-blue-700 flex items-center gap-2">
          🛒 StellarMartBD
        </Link>
        <p className="text-xs text-gray-500 mt-1">Admin Panel</p>
      </div>
      
      <nav className="p-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="absolute bottom-0 w-64 p-4 border-t bg-gray-50">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-600 hover:text-blue-700"
        >
          <span>🌐</span>
          <span>View Website</span>
        </Link>
      </div>
    </aside>
  );
}
