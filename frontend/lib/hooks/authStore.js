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
    (set) => ({
      user: null,
      loading: false,
      _hasHydrated: false,
      
      // Login function
      login: (userData) => {
        set({ user: userData });
      },
      
      // Logout function
      logout: () => {
        set({ user: null });
        // LocalStorage clear korar jonno
        if (typeof window !== 'undefined') {
          try {
            localStorage.removeItem('prime-auth-storage');
          } catch (e) {
            // Ignore storage errors
          }
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
      },

      // Set hydration state
      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      }
    }),
    {
      name: 'prime-auth-storage',
      storage: createJSONStorage(createSafeStorage),
      skipHydration: true,
    }
  )
);

// Custom hook for safe auth access - renamed to avoid conflict with useAuth context
export const useAuthStoreHook = () => {
  const store = useAuthStore();
  return {
    user: store.user,
    loading: store.loading,
    login: store.login,
    logout: store.logout,
    _hasHydrated: store._hasHydrated,
  };
};
