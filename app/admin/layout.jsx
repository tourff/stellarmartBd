'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Skip auth check for login page
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/admin-me', {
          credentials: 'include'
        });
        
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          router.push('/admin/login');
        }
      } catch (error) {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [isLoginPage, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#083b66]"></div>
      </div>
    );
  }

  // Show login page without admin layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null;
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
