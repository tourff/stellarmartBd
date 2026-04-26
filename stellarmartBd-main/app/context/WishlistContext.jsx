"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch wishlist when user changes
  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlist([]);
    }
  }, [user]);

  const fetchWishlist = useCallback(async () => {
    if (!user) return;

    try {
      const res = await fetch('/api/wishlist');
      if (res.ok) {
        const data = await res.json();
        setWishlist(data.wishlist || []);
      }
    } catch (error) {
      console.error('Fetch wishlist error:', error);
    }
  }, [user]);

  const addToWishlist = useCallback(async (productId) => {
    if (!user) return { success: false, message: 'Please login first' };

    setLoading(true);
    try {
      const res = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId })
      });

      const data = await res.json();

      if (res.ok) {
        setWishlist(data.wishlist || []);
        return { success: true };
      } else {
        return { success: false, message: data.error };
      }
    } catch (error) {
      console.error('Add to wishlist error:', error);
      return { success: false, message: 'Failed to add to wishlist' };
    } finally {
      setLoading(false);
    }
  }, [user]);

  const removeFromWishlist = useCallback(async (productId) => {
    if (!user) return { success: false, message: 'Please login first' };

    setLoading(true);
    try {
      const res = await fetch('/api/wishlist', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId })
      });

      const data = await res.json();

      if (res.ok) {
        setWishlist(data.wishlist || []);
        return { success: true };
      } else {
        return { success: false, message: data.error };
      }
    } catch (error) {
      console.error('Remove from wishlist error:', error);
      return { success: false, message: 'Failed to remove from wishlist' };
    } finally {
      setLoading(false);
    }
  }, [user]);

  const isInWishlist = useCallback((productId) => {
    return wishlist.some(item => item._id === productId);
  }, [wishlist]);

  const value = {
    wishlist,
    wishlistCount: wishlist.length,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    fetchWishlist
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};