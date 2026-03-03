import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin Panel - StellarMartBD',
  description: 'E-commerce Admin Panel',
};

export default function AdminLayout({ children }) {
  const cookieStore = cookies();
  const adminToken = cookieStore.get('adminToken');
  
  // If no admin token, redirect to login
  if (!adminToken) {
    redirect('/admin/login');
  }
  
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <AdminNavbar />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
