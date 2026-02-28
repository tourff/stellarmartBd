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
  Megaphone
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin', active: true },
  { icon: Users, label: 'User Management', href: '/admin/users' },
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
  { icon: Shield, label: 'Security Settings', href: '/admin/security' },
  { icon: Palette, label: 'Theme Settings', href: '/admin/themes' },
  { icon: Key, label: 'API Management', href: '/admin/api' },
  { icon: Database, label: 'Backup & Database', href: '/admin/backup' },
  { icon: Mail, label: 'Email Settings', href: '/admin/emails' },
  { icon: RotateCcw, label: 'Activity Logs', href: '/admin/logs' },
  { icon: HelpCircle, label: 'FAQ Manager', href: '/admin/faqs' },
  { icon: Megaphone, label: 'Marketing Tools', href: '/admin/marketing' },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
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
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Users</p>
                  <p className="text-2xl font-bold">1,234</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Products</p>
                  <p className="text-2xl font-bold">567</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <ShoppingCart className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Orders</p>
                  <p className="text-2xl font-bold">89</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <Package className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Revenue</p>
                  <p className="text-2xl font-bold">$12,345</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-sm">New user registered: john@example.com</p>
                <span className="text-xs text-gray-500 ml-auto">2 min ago</span>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm">New order placed: #ORD-1234</p>
                <span className="text-xs text-gray-500 ml-auto">5 min ago</span>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <p className="text-sm">Product low stock alert: iPhone 15 Pro</p>
                <span className="text-xs text-gray-500 ml-auto">1 hour ago</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
