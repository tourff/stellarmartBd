import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      loading: false,
      login: (userData) => {
        set({ user: userData });
      },
      logout: () => {
        set({ user: null });
        localStorage.removeItem('prime-auth-storage'); // স্টোরেজ ক্লিয়ার
        window.location.href = '/login';
      },
    }),
    {
      name: 'prime-auth-storage', // ব্রাউজারে এই নামে ডেটা সেভ থাকবে
    }
  )
);
