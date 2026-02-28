'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Create context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('stellarmart_token');
    const storedUser = localStorage.getItem('stellarmart_user');

    if (token && storedUser) {
      try {
        // Verify token with backend
        const response = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          localStorage.setItem('stellarmart_user', JSON.stringify(data.user));
        } else {
          // Token invalid, clear storage
          localStorage.removeItem('stellarmart_token');
          localStorage.removeItem('stellarmart_user');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Use stored user data if available
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          localStorage.removeItem('stellarmart_token');
          localStorage.removeItem('stellarmart_user');
        }
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Save token and user
        localStorage.setItem('stellarmart_token', data.token);
        localStorage.setItem('stellarmart_user', JSON.stringify(data.user));
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Server connection error' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, phone) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, phone }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Save token and user
        localStorage.setItem('stellarmart_token', data.token);
        localStorage.setItem('stellarmart_user', JSON.stringify(data.user));
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, message: data.message || data.errors?.[0]?.msg || 'Registration failed' };
      }
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, message: 'Server connection error' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('stellarmart_token');
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('stellarmart_token');
      localStorage.removeItem('stellarmart_user');
      setUser(null);
      router.push('/login');
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // Return default values if not wrapped by provider
    return {
      user: null,
      loading: false,
      login: async () => ({ success: false, message: 'Auth not initialized' }),
      register: async () => ({ success: false, message: 'Auth not initialized' }),
      logout: async () => {},
      checkAuth: async () => {},
    };
  }
  return context;
};

export default useAuth;
