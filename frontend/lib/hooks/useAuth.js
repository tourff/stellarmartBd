'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

// Default value diye context create kora holo
const AuthContext = createContext({
  user: null,
  auth: null, // many components might be looking for 'auth' property
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
        setUser(JSON.parse(storedUser));
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

  // context value te 'auth' property o add kora holo jate destructuring fail na kore
  const value = {
    user,
    auth: user, // Alias for 'auth' property
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  // Build error thik korte default values return korbe
  return context || { user: null, auth: null, loading: false }; 
};
