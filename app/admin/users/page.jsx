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
  Ban,
  CheckCircle
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Users, label: 'User Management', href: '/admin/users', active: true },
  { icon: Package, label: 'Category Management', href: '/admin/categories' },
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

const mockUsers = [
  { id: 1, name: 'Super Admin', email: 'admin@stellarmartbd.com', phone: '+8801234567890', role: 'admin', status: 'active', orders: 0 },
  { id: 2, name: 'John Doe', email: 'john@example.com', phone: '+8801723456789', role: 'customer', status: 'active', orders: 5 },
  { id: 3, name: 'Jane Smith', email: 'jane@example.com', phone: '+8801723456790', role: 'customer', status: 'active', orders: 12 },
  { id: 4, name: 'Bob Wilson', email: 'bob@example.com', phone: '+8801723456791', role: 'vendor', status: 'active', orders: 0 },
  { id: 5, name: 'Alice Brown', email: 'alice@example.com', phone: '+8801723456792', role: 'customer', status: 'suspended', orders: 3 },
  { id: 6, name: 'Moderator User', email: 'mod@stellarmartbd.com', phone: '+8801234567891', role: 'moderator', status: 'active', orders: 0 },
];

export default function UsersPage() {
  const [users] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role) => {
    const colors = {
      admin: 'bg-red-100 text-red-800',
      moderator: 'bg-purple-100 text-purple-800',
      editor: 'bg-blue-100 text-blue-800',
      vendor: 'bg-green-100 text-green-800',
      customer: 'bg-gray-100 text-gray-800',
    };
    return colors[role] || colors.customer;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
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
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-2xl font-bold">{users.length}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <p className="text-sm text-gray-500">Active Users</p>
              <p className="text-2xl font-bold text-green-600">{users.filter(u => u.status === 'active').length}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <p className="text-sm text-gray-500">Vendors</p>
              <p className="text-2xl font-bold text-blue-600">{users.filter(u => u.role === 'vendor').length}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <p className="text-sm text-gray-500">Suspended</p>
              <p className="text-2xl font-bold text-red-600">{users.filter(u => u.status === 'suspended').length}</p>
            </div>
          </div>

          {/* Toolbar */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 max-w-md relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add User
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{user.phone}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded ${getRoleBadge(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">{user.orders}</td>
                    <td className="px-6 py-4">
                      {user.status === 'active' ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Active</span>
                      ) : (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">Suspended</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg">
                          <Ban className="w-4 h-4" />
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
        </main>
      </div>
    </div>
  );
}
