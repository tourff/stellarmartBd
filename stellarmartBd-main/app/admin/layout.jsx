"use client";

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [idleTimeout, setIdleTimeout] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const IDLE_TIME = 10 * 60 * 1000; // 10 minutes = 600000 ms

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/admin-me', {
          credentials: 'include'
        });
        
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          router.push('/admin-login');
          return;
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/admin-login');
        return;
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, [router]);

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
      setIsAuthenticated(false);
      router.push('/admin-login');
    }
  }, [router, idleTimeout]);

  const resetIdleTimer = useCallback(() => {
    // Always clear existing timeout first
    if (idleTimeout) {
      clearTimeout(idleTimeout);
    }
    
    const timeout = setTimeout(() => {
      logoutUser();
    }, IDLE_TIME);
    
    setIdleTimeout(timeout);
  }, [logoutUser, idleTimeout]);

  useEffect(() => {
    if (!isAuthenticated) return;

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
  }, [resetIdleTimer, isAuthenticated]);

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#083b66] mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, this component won't render (redirect happens in useEffect)
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

