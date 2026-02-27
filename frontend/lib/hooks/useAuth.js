'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

// Default value diye context create kora holo - auth property add kora holo
const AuthContext = createContext({
  user: null,
  auth: null,
  loading: false,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('prime_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error('Error parsing user data:', e);
        }
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const mockUser = { id: '1', name: 'Siam', email: email }; 
      setUser(mockUser);
      localStorage.setItem('prime_user', JSON.stringify(mockUser));
      toast.success('লগইন সফল হয়েছে!');
      router.push('/dashboard');
    } catch (error) {
      toast.error('লগইন ব্যর্থ হয়েছে!');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('prime_user');
      setUser(null);
      toast.success('লগআউট করা হয়েছে');
      router.push('/login');
    }
  };

  // Context value with all required properties including 'auth'
  const value = {
    user,
    auth: user, // Same as user for backward compatibility
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook with safe fallback
export const useAuth = () => {
  const context = useContext(AuthContext);
  // Build error thik korte default values return korbe
  if (!context) {
    return { 
      user: null, 
      auth: null, 
      loading: false, 
      login: () => {}, 
      logout: () => {} 
    };
  }
  return context;
};

// Default export for easier importing
export default useAuth;
