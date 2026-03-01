'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

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

  // Calculate total from items
  const calculateTotal = useCallback((items) => {
    const total = items.reduce((sum, item) => {
      const price = item.product?.sellingPrice || item.product?.regularPrice || item.product?.price || 0;
      return sum + (price * item.quantity);
    }, 0);
    return total;
  }, []);

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
        const total = calculateTotal(data.cart.items);
        setCart({ items: data.cart.items, total });
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add to cart - wait for server response
  const addToCart = async (productId, quantity = 1) => {
    const sessionId = getSessionId();
    
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity, sessionId })
      });
      const data = await res.json();
      
      if (data.cart) {
        const total = calculateTotal(data.cart.items);
        setCart({ items: data.cart.items, total });
      }
      return { success: true, message: 'Added to cart!' };
    } catch (error) {
      console.error('Error adding to cart:', error);
      return { success: false, message: 'Failed to add to cart' };
    }
  };

  // Update quantity - wait for server response
  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    const sessionId = getSessionId();
    
    try {
      const res = await fetch('/api/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity, sessionId })
      });
      const data = await res.json();
      
      if (data.cart) {
        const total = calculateTotal(data.cart.items);
        setCart({ items: data.cart.items, total });
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  // Remove from cart - wait for server response
  const removeFromCart = async (productId) => {
    const sessionId = getSessionId();
    
    try {
      const res = await fetch(`/api/cart?productId=${productId}&sessionId=${sessionId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      
      if (data.cart) {
        const total = calculateTotal(data.cart.items);
        setCart({ items: data.cart.items, total });
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = async () => {
    const sessionId = getSessionId();
    
    setCart({ items: [], total: 0 });

    try {
      await fetch(`/api/cart?sessionId=${sessionId}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
      fetchCart();
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
