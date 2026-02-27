// hooks/useCart.js
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

export const useCart = create(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: (product, quantity = 1) => {
        const currentItems = get().cartItems;
        const existingItem = currentItems.find((item) => item._id === product._id);

        if (existingItem) {
          set({
            cartItems: currentItems.map((item) =>
              item._id === product._id 
              ? { ...item, qty: item.qty + quantity } 
              : item
            ),
          });
        } else {
          set({ cartItems: [...currentItems, { ...product, qty: quantity }] });
        }
      },
      removeFromCart: (id) => set({
        cartItems: get().cartItems.filter((item) => item._id !== id)
      }),
      clearCart: () => set({ cartItems: [] }),
    }),
    { 
      name: 'cart-storage',
      storage: createJSONStorage(createSafeStorage),
      skipHydration: true,
    }
  )
);
