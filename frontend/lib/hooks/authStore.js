import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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
          localStorage.removeItem('prime-auth-storage');
          window.location.href = '/login';
        }
      },

      // Set hydration state
      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      }
    }),
    {
      name: 'prime-auth-storage',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : null)),
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
    }
  )
);

// Custom hook for safe auth access
export const useAuth = () => {
  const store = useAuthStore();
  return {
    user: store.user,
    loading: store.loading,
    login: store.login,
    logout: store.logout,
    _hasHydrated: store._hasHydrated,
  };
};
