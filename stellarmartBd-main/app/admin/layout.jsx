"use client";

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [idleTimeout, setIdleTimeout] = useState(null);
  const IDLE_TIME = 10 * 60 * 1000; // 10 minutes = 600000 ms

  const logoutUser = useCallback(async () => {
    try {
      await fetch('/api/auth/admin-logout', { 
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Auto-logout failed:', error);
    } finally {
      // Clear timeout and redirect
      if (idleTimeout) {
        clearTimeout(idleTimeout);
        setIdleTimeout(null);
      }
      router.push('/admin-login');
    }
  }, [router]);

  const resetIdleTimer = useCallback(() => {
    // Always clear existing timeout first
    if (idleTimeout) {
      clearTimeout(idleTimeout);
    }
    
    const timeout = setTimeout(() => {
      logoutUser();
    }, IDLE_TIME);
    
    setIdleTimeout(timeout);
  }, [logoutUser]);

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart', 'keypress'];
    
    const handleActivity = () => {
      resetIdleTimer();
    };

    // Start initial timer
    resetIdleTimer();

    // Activity listeners
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    // Tab visibility
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        resetIdleTimer();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Browser close
    const handleBeforeUnload = async () => {
      try {
        await fetch('/api/auth/admin-logout', { 
          method: 'POST',
          credentials: 'include'
        });
      } catch (e) {
        // Ignore - browser may not wait for fetch
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
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

