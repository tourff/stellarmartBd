import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      loading: false,
      
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

      // Build error thik korte safe hydrate check
      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      }
    }),
    {
      name: 'prime-auth-storage', // ব্রাউজারে এই নামে ডেটা সেভ থাকবে
      storage: createJSONStorage(() => localStorage), // Server-side error bondho korte
    }
  )
);
