'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Heart, Search, User, Headphones, Menu, LogOut } from 'lucide-react';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const { cartCount, cart, loading, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user, loading: authLoading, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  return (
    <>
      {/* Desktop Navigation - White/Bluish Theme */}
      <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="text-2xl font-extrabold text-[#083b66] flex items-center gap-2">
              <ShoppingBag className="w-8 h-8" />
              StellarMartBD
            </Link>
            
            {/* Search */}
            <div className="flex-1 max-w-xl mx-8">
              <form action="/search" className="relative">
                <input
                  type="text"
                  name="q"
                  placeholder="Search for products, brands and more..."
                  className="w-full px-4 py-2.5 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-[#083b66] focus:ring-2 focus:ring-blue-100 text-gray-800 font-medium"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-[#083b66] text-white rounded-md hover:bg-[#062d4d] font-bold shadow-sm">
                  Search
                </button>
              </form>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link href="/wishlist" className="p-2 hover:bg-blue-50 rounded-lg relative">
                <Heart className="w-6 h-6 text-[#083b66]" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">0</span>
              </Link>
              <Link href="/cart" className="p-2 hover:bg-blue-50 rounded-lg relative">
                <ShoppingBag className="w-6 h-6 text-[#083b66]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              
              {/* Auth Buttons - Show based on login state */}
              {!authLoading && (
                user ? (
                  <div className="flex items-center gap-2">
                    <Link href="/profile" className="flex items-center gap-2 px-4 py-2 bg-[#083b66] text-white font-bold rounded-lg hover:bg-[#062d4d] transition-colors shadow-md">
                      <User className="w-4 h-4" />
                      {user.name || 'Profile'}
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="p-2 bg-gray-100 text-[#083b66] rounded-lg hover:bg-gray-200 transition-colors"
                      title="Logout"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <Link href="/login" className="px-5 py-2.5 bg-[#083b66] text-white font-bold rounded-lg hover:bg-[#062d4d] transition-colors shadow-md">
                    Sign In
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Single Bottom Bar Only */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 border-t border-blue-100">
        <div className="flex items-center justify-around py-3 px-4">
          {/* Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col items-center gap-1"
          >
            <Menu className="w-6 h-6 text-[#083b66]" />
            <span className="text-xs font-medium text-[#083b66]">Menu</span>
          </button>

          {/* Profile */}
          <Link href={user ? "/profile" : "/login"} className="flex flex-col items-center gap-1">
            <User className="w-6 h-6 text-[#083b66]" />
            <span className="text-xs font-medium text-[#083b66]">{user ? 'Profile' : 'Sign In'}</span>
          </Link>

          {/* Support */}
          <Link href="/contact" className="flex flex-col items-center gap-1">
            <Headphones className="w-6 h-6 text-[#083b66]" />
            <span className="text-xs font-medium text-[#083b66]">Support</span>
          </Link>

          {/* Cart - Opens Drawer */}
          <button onClick={() => setCartOpen(true)} className="flex flex-col items-center gap-1 relative">
            <ShoppingBag className="w-6 h-6 text-[#083b66]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <span className="text-xs font-medium text-[#083b66]">Cart</span>
          </button>

          {/* Wishlist */}
          <Link href="/wishlist" className="flex flex-col items-center gap-1">
            <Heart className="w-6 h-6 text-[#083b66]" />
            <span className="text-xs font-medium text-[#083b66]">Wishlist</span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white">
          <div className="flex items-center justify-between px-4 py-4 border-b border-blue-100">
            <Link href="/" className="text-xl font-extrabold text-[#083b66] flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              <ShoppingBag className="w-6 h-6" />
              StellarMartBD
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 bg-blue-50 rounded-lg"
            >
              ✕
            </button>
          </div>
          <div className="px-4 py-4 space-y-3">
            <Link href="/" className="block py-3 px-4 font-semibold text-gray-800 bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/shop" className="block py-3 px-4 font-semibold text-gray-800 bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
            <Link href="/categories" className="block py-3 px-4 font-semibold text-gray-800 bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Categories</Link>
            <Link href="/products?featured=true" className="block py-3 px-4 font-semibold text-gray-800 bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Featured</Link>
            <Link href="/new-arrivals" className="block py-3 px-4 font-semibold text-gray-800 bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>New Arrivals</Link>
            <Link href="/flash-sale" className="block py-3 px-4 font-bold text-red-600 bg-red-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Flash Sale 🔥</Link>
            <Link href="/wishlist" className="block py-3 px-4 font-semibold text-gray-800 bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Wishlist</Link>
            <Link href="/cart" className="block py-3 px-4 font-semibold text-gray-800 bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Cart</Link>
            
            {/* Mobile Auth */}
            {!authLoading && (
              user ? (
                <>
                  <Link href="/profile" className="block py-3 px-4 font-semibold text-gray-800 bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>My Profile</Link>
                  <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="block py-3 px-4 font-semibold text-red-600 bg-red-50 rounded-lg w-full text-left">Logout</button>
                </>
              ) : (
                <Link href="/login" className="block py-3 px-4 font-semibold text-white bg-[#083b66] rounded-lg text-center" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
              )
            )}
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
        cart={cart}
        loading={loading}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />

      {/* Spacer for Mobile Bottom Bar */}
      <div className="md:hidden h-20"></div>
    </>
  );
}

