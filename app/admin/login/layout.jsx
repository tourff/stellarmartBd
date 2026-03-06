import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Navbar from '../../components/Navbar';
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
      {/* Navbar with Search */}
      <Navbar />
      
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
