'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import CategoryMenu from './CategoryMenu';
import Footer from './Footer';

export default function UserLayoutWrapper({ children }) {
  const pathname = usePathname();
  
  // Check if we're on an admin route (including /admin/login and /admin-login)
  const isAdminRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/admin-login');
  
  return (
    <>
      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <CategoryMenu />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
}

