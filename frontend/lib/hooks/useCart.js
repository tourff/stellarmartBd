// hooks/useCart.js - Unified cart hook
import { useCartStore } from './cartStore';

// Re-export the cart store functions for easier importing
export const useCart = () => {
  const store = useCartStore();
  return {
    items: store.items,
    addToCart: store.addItem,
    updateQuantity: store.updateQuantity,
    removeFromCart: store.removeItem,
    clearCart: store.clearCart,
    getTotals: store.getTotals,
    isInCart: store.isInCart,
    getItemQuantity: store.getItemQuantity,
  };
};

export default useCart;
