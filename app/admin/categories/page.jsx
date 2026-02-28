'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart, 
  Image, 
  FileText, 
  Settings, 
  BarChart3,
  MessageSquare,
  Tag,
  Bell,
  Shield,
  Palette,
  Key,
  Database,
  Mail,
  RotateCcw,
  HelpCircle,
  CreditCard,
  Megaphone,
  Plus,
  Edit,
  Trash2,
  Search
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Users, label: 'User Management', href: '/admin/users' },
  { icon: Package, label: 'Category Management', href: '/admin/categories', active: true },
  { icon: ShoppingCart, label: 'Item Management', href: '/admin/products' },
  { icon: CreditCard, label: 'Order Management', href: '/admin/orders' },
  { icon: Image, label: 'Banner Manager', href: '/admin/banners' },
  { icon: FileText, label: 'Page Management', href: '/admin/pages' },
  { icon: MessageSquare, label: 'Contact Messages', href: '/admin/contacts' },
  { icon: Tag, label: 'Tags Management', href: '/admin/tags' },
  { icon: Bell, label: 'Notifications', href: '/admin/notifications' },
  { icon: Settings, label: 'System Settings', href: '/admin/settings' },
  { icon: BarChart3, label: 'Reports & Analytics', href: '/admin/reports' },
];

const mockCategories = [
  { id: 1, name: 'Electronics', slug: 'electronics', products: 234, isActive: true, isFeatured: true },
  { id: 2, name: 'Fashion', slug: 'fashion', products: 567, isActive: true, isFeatured: true },
  { id: 3, name: 'Home & Living', slug: 'home-living', products: 123, isActive: true, isFeatured: false },
  { id: 4, name: 'Sports', slug: 'sports', products: 89, isActive: true, isFeatured: false },
  { id: 5, name: 'Books', slug: 'books', products: 45, isActive: false, isFeatured: false },
  { id: 6, name: 'Beauty', slug: 'beauty', products: 156, isActive: true, isFeatured: true },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(mockCategories);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Category Management</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, Admin</span>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg min-h-screen">
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Toolbar */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 max-w-md relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add Category
              </button>
            </div>
          </div>

          {/* Categories Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Products</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Featured</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="font-medium">{category.name}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{category.slug}</td>
                    <td className="px-6 py-4">{category.products}</td>
                    <td className="px-6 py-4">
                      {category.isFeatured ? (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Featured</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {category.isActive ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Active</span>
                      ) : (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">Inactive</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-gray-500">Showing {filteredCategories.length} categories</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">Previous</button>
              <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">Next</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
