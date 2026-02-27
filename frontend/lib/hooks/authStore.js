import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      loading: false,
      login: (userData) => set({ user: userData }),
      logout: () => {
        set({ user: null });
        if (typeof window !== 'undefined') {
          localStorage.removeItem('prime-auth-storage');
          window.location.href = '/login';
        }
      },
    }),
    {
      name: 'prime-auth-storage',
      // Build-er somoy error bondho korte storage check
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : null)),
    }
  )
);
