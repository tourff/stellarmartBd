'use client';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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
    <div className="min-h-screen">
      {children}
    </div>
  );
}

