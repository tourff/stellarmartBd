'use client';

import { useState, useEffect, useCallback } from 'react';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin Panel - StellarMartBD',
  description: 'E-commerce Admin Panel',
};

export default function AdminLayout({ children }) {
  const [idleTimeout, setIdleTimeout] = useState(null);
  const IDLE_TIME = 10 * 60 * 1000; // 10 minutes

  const resetIdleTimer = useCallback(() => {
    if (idleTimeout) {
      clearTimeout(idleTimeout);
    }
    
    const timeout = setTimeout(() => {
      logoutUser();
    }, IDLE_TIME);
    
    setIdleTimeout(timeout);
  }, [idleTimeout]);

  const logoutUser = useCallback(async () => {
    try {
      await fetch('/api/auth/admin-logout', { 
        method: 'POST',
        credentials: 'include' // Include cookies
      });
      window.location.href = '/admin-login';
    } catch (error) {
      console.error('Auto-logout failed:', error);
      // Fallback: redirect anyway
      window.location.href = '/admin-login';
    }
  }, []);

  useEffect(() => {
    resetIdleTimer();

    const events = ['mousemove', 'keydown', 'scroll', 'click'];
    
    events.forEach(event => {
      document.addEventListener(event, resetIdleTimer, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, resetIdleTimer, true);
      });
      if (idleTimeout) clearTimeout(idleTimeout);
    };
  }, [resetIdleTimer]);

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

