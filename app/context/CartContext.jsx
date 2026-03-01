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

  // Optimistic add to cart - immediately update UI
  const addToCart = async (productId, quantity = 1) => {
    const sessionId = getSessionId();
    
    // Optimistic update - immediately add to cart UI
    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(
        item => item.product && item.product._id === productId
      );
      
      let newItems;
      if (existingItemIndex >= 0) {
        // Item exists, increase quantity
        newItems = [...prevCart.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        };
      } else {
        // New item - add with temporary data
        newItems = [...prevCart.items, {
          _id: 'temp_' + Date.now(),
          product: { _id: productId, sellingPrice: 0, regularPrice: 0 },
          quantity
        }];
      }
      
      return { items: newItems, total: calculateTotal(newItems) };
    });

    // Then make API call in background
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity, sessionId })
      });
      const data = await res.json();
      
      if (data.cart) {
        // Update with actual data from server
        const total = calculateTotal(data.cart.items);
        setCart({ items: data.cart.items, total });
      }
      return { success: true, message: 'Added to cart!' };
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Revert on error
      fetchCart();
      return { success: false, message: 'Failed to add to cart' };
    }
  };

  // Optimistic update quantity - immediately update UI
  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    const sessionId = getSessionId();
    
    // Optimistic update - immediately update UI
    setCart(prevCart => {
      const newItems = prevCart.items.map(item => {
        const itemProductId = item.product?._id || item.product;
        if (itemProductId === productId) {
          return { ...item, quantity };
        }
        return item;
      });
      return { items: newItems, total: calculateTotal(newItems) };
    });

    // Then make API call in background
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
      // Revert on error
      fetchCart();
    }
  };

  // Optimistic remove from cart - immediately update UI
  const removeFromCart = async (productId) => {
    const sessionId = getSessionId();
    
    // Optimistic update - immediately remove from UI
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => {
        const itemProductId = item.product?._id || item.product;
        return itemProductId !== productId;
      });
      return { items: newItems, total: calculateTotal(newItems) };
    });

    // Then make API call in background
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
      // Revert on error
      fetchCart();
    }
  };

  const clearCart = async () => {
    const sessionId = getSessionId();
    
    // Optimistic update
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
