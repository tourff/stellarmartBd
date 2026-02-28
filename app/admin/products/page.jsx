'use client';

import { useState } from 'react';
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
  Search,
  Eye
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Users, label: 'User Management', href: '/admin/users' },
  { icon: Package, label: 'Category Management', href: '/admin/categories' },
  { icon: ShoppingCart, label: 'Item Management', href: '/admin/products', active: true },
  { icon: CreditCard, label: 'Order Management', href: '/admin/orders' },
  { icon: Image, label: 'Banner Manager', href: '/admin/banners' },
  { icon: FileText, label: 'Page Management', href: '/admin/pages' },
  { icon: MessageSquare, label: 'Contact Messages', href: '/admin/contacts' },
  { icon: Tag, label: 'Tags Management', href: '/admin/tags' },
  { icon: Bell, label: 'Notifications', href: '/admin/notifications' },
  { icon: Settings, label: 'System Settings', href: '/admin/settings' },
  { icon: BarChart3, label: 'Reports & Analytics', href: '/admin/reports' },
];

const mockProducts = [
  { id: 1, name: 'iPhone 15 Pro Max', sku: 'IP15PM-256', category: 'Electronics', price: 149999, stock: 45, isFeatured: true, isActive: true },
  { id: 2, name: 'Samsung Galaxy S24 Ultra', sku: 'SG24U-512', category: 'Electronics', price: 129999, stock: 32, isFeatured: true, isActive: true },
  { id: 3, name: 'MacBook Pro M3', sku: 'MBP-M3-16', category: 'Electronics', price: 259999, stock: 15, isFeatured: true, isActive: true },
  { id: 4, name: 'Nike Air Max', sku: 'NAM-001', category: 'Fashion', price: 8999, stock: 120, isFeatured: false, isActive: true },
  { id: 5, name: 'Sony WH-1000XM5', sku: 'Sony-XM5', category: 'Electronics', price: 34999, stock: 8, isFeatured: true, isActive: true },
  { id: 6, name: 'Dell XPS 15', sku: 'XPS15-9530', category: 'Electronics', price: 189999, stock: 0, isFeatured: false, isActive: false },
];

export default function ProductsPage() {
  const [products] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
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
                  placeholder="Search products by name or SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add Product
              </button>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Featured</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="font-medium">{product.name}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{product.sku}</td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">৳{product.price.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      {product.stock > 0 ? (
                        <span className={product.stock < 10 ? 'text-orange-600' : 'text-green-600'}>
                          {product.stock}
                        </span>
                      ) : (
                        <span className="text-red-600">Out of Stock</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {product.isFeatured ? (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Featured</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {product.isActive ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Active</span>
                      ) : (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">Inactive</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                          <Eye className="w-4 h-4" />
                        </button>
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
            <span className="text-sm text-gray-500">Showing {filteredProducts.length} products</span>
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
