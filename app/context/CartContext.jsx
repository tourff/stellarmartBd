'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);

  // Generate or get session ID
  const getSessionId = () => {
    if (typeof window === 'undefined') return null;
    let sessionId = localStorage.getItem('cartSessionId');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('cartSessionId', sessionId);
    }
    return sessionId;
  };

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const sessionId = getSessionId();
      const res = await fetch(`/api/cart?sessionId=${sessionId}`);
      const data = await res.json();
      if (data.cart) {
        calculateTotal(data.cart);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (cartData) => {
    const total = cartData.items.reduce((sum, item) => {
      const price = item.product?.price || 0;
      return sum + (price * item.quantity);
    }, 0);
    setCart({ items: cartData.items, total });
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const sessionId = getSessionId();
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity, sessionId })
      });
      const data = await res.json();
      if (data.cart) {
        calculateTotal(data.cart);
      }
      return { success: true, message: 'Added to cart!' };
    } catch (error) {
      console.error('Error adding to cart:', error);
      return { success: false, message: 'Failed to add to cart' };
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const sessionId = getSessionId();
      const res = await fetch('/api/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity, sessionId })
      });
      const data = await res.json();
      if (data.cart) {
        calculateTotal(data.cart);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const sessionId = getSessionId();
      const res = await fetch(`/api/cart?productId=${productId}&sessionId=${sessionId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.cart) {
        calculateTotal(data.cart);
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      const sessionId = getSessionId();
      await fetch(`/api/cart?sessionId=${sessionId}`, {
        method: 'DELETE'
      });
      setCart({ items: [], total: 0 });
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      cartCount,
      loading,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
