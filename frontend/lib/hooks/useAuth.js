'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

// context create korar somoy default value deya holo jate build crash na kore
const AuthContext = createContext({
  user: null,
  loading: false,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Shudhu browser-e localStorage check korbe
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
    localStorage.removeItem('prime_user');
    setUser(null);
    toast.success('লগআউট করা হয়েছে');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  // Context na thakle default return korbe
  return context || { user: null, loading: false };
};
