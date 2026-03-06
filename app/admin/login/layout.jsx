import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Search, ShoppingBag } from 'lucide-react';
import Sidebar from '../Sidebar';

export const metadata = {
  title: 'Admin Login - StellarMartBD',
  description: 'Admin Login',
};

export default function AdminLoginLayout({ children }) {
  const cookieStore = cookies();
  const adminToken = cookieStore.get('adminToken');
  
  if (adminToken) {
    redirect('/admin/dashboard');
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Custom Header with Search */}
      <header className="bg-white shadow-md sticky top-0 z-50 border-b border-blue-100">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-extrabold text-[#083b66] flex items-center gap-2">
            <ShoppingBag className="w-8 h-8" />
            StellarMartBD
          </Link>
          
          {/* Search */}
          <div className="flex-1 max-w-xl mx-8">
            <form action="/search" className="relative">
              <input
                type="text"
                name="q"
                placeholder="Search for products, brands and more..."
                className="w-full px-4 py-2.5 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-[#083b66] focus:ring-2 focus:ring-blue-100 text-gray-800 font-medium"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-[#083b66] text-white rounded-md hover:bg-[#062d4d] font-bold shadow-sm">
                Search
              </button>
            </form>
          </div>
          
          {/* Account - Sign In Button */}
          <div className="flex items-center gap-4">
            <Link href="/login" className="px-5 py-2.5 bg-[#083b66] text-white font-bold rounded-lg hover:bg-[#062d4d] transition-colors shadow-md">
              Sign In
            </Link>
          </div>
        </div>
      </header>
      
      {/* Main Content with Sidebar */}
      <div className="flex pt-16">
        {/* Sidebar Menu */}
        <Sidebar />
        
        {/* Login Form Area */}
        <div className="flex-1 ml-64 p-8 flex items-center justify-center min-h-[calc(100vh-4rem)]">
          {children}
        </div>
      </div>
    </div>
  );
}
