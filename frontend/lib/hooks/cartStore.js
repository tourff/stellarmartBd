import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      loading: false,
      error: null,

      // Add item to cart
      addItem: (product, quantity = 1, variant = null) => {
        const items = get().items;
        const existingIndex = items.findIndex(
          (item) => item.id === product.id && JSON.stringify(item.variant) === JSON.stringify(variant)
        );

        if (existingIndex > -1) {
          const newItems = [...items];
          newItems[existingIndex].quantity += quantity;
          set({ items: newItems });
        } else {
          set({ items: [...items, { ...product, quantity, variant }] });
        }
      },

      // Update item quantity
      updateQuantity: (productId, quantity, variant = null) => {
        if (quantity < 1) {
          get().removeItem(productId, variant);
          return;
        }
        
        const items = get().items;
        const newItems = items.map((item) =>
          item.id === productId && JSON.stringify(item.variant) === JSON.stringify(variant)
            ? { ...item, quantity }
            : item
        );
        set({ items: newItems });
      },

      // Remove item from cart
      removeItem: (productId, variant = null) => {
        const items = get().items;
        const newItems = items.filter(
          (item) => !(item.id === productId && JSON.stringify(item.variant) === JSON.stringify(variant))
        );
        set({ items: newItems });
      },

      // Clear entire cart
      clearCart: () => {
        set({ items: [] });
      },

      // Get cart totals
      getTotals: () => {
        const items = get().items;
        const subtotal = items.reduce((sum, item) => sum + item.selling_price * item.quantity, 0);
        const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
        const totalDiscount = items.reduce((sum, item) => {
          if (item.discount_price) {
            return sum + (item.regular_price - item.selling_price) * item.quantity;
          }
          return sum;
        }, 0);

        return {
          subtotal,
          totalItems,
          totalDiscount,
          total: subtotal,
        };
      },

      // Check if product is in cart
      isInCart: (productId, variant = null) => {
        const items = get().items;
        return items.some(
          (item) => item.id === productId && JSON.stringify(item.variant) === JSON.stringify(variant)
        );
      },

      // Get item quantity
      getItemQuantity: (productId, variant = null) => {
        const items = get().items;
        const item = items.find(
          (item) => item.id === productId && JSON.stringify(item.variant) === JSON.stringify(variant)
        );
        return item ? item.quantity : 0;
      },
    }),
    {
      name: 'stellarmart-cart',
    }
  )
);

// For client-side only usage
export const useCart = () => {
  const store = useCartStore();
  return {
    cart: store.items,
    addToCart: store.addItem,
    updateQuantity: store.updateQuantity,
    removeFromCart: store.removeItem,
    clearCart: store.clearCart,
    getTotals: store.getTotals,
    isInCart: store.isInCart,
    getItemQuantity: store.getItemQuantity,
  };

};
