import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Create storage safely for SSR
const createSafeStorage = () => {
  if (typeof window === 'undefined') {
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
  }
  return localStorage;
};

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      _hasHydrated: false,
      
      // Login function - stores user and token
      login: (userData, authToken) => {
        set({ 
          user: userData, 
          token: authToken,
        });
      },
      
      // Logout function - clears all data
      logout: () => {
        set({ user: null, token: null });
        if (typeof window !== 'undefined') {
          localStorage.removeItem('stellarmart-auth-storage');
        }
      },

      // Set hydration state
      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      },

      // Update user data
      updateUser: (userData) => {
        set({ user: userData });
      }
    }),
    {
      name: 'stellarmart-auth-storage',
      storage: createJSONStorage(createSafeStorage),
      skipHydration: true,
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token 
      }),
    }
  )
);

// Custom hook for auth store
export const useAuthStoreHook = () => {
  const store = useAuthStore();
  return {
    user: store.user,
    token: store.token,
    loading: store.loading,
    login: store.login,
    logout: store.logout,
    updateUser: store.updateUser,
    _hasHydrated: store._hasHydrated,
  };
};
