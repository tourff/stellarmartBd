'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Heart, Search, User, Headphones, Menu, X, ChevronDown, LogOut, Package } from 'lucide-react';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const { cartCount, cart, loading, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user, loading: authLoading, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAccountDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  return (
    <>
      {/* Desktop Navigation - White background with blue theme */}
      <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
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
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#083b66] focus:ring-2 focus:ring-blue-200 text-gray-800 font-medium"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-[#083b66] text-white rounded-md hover:bg-[#062d4d] font-bold shadow-sm">
                  Search
                </button>
              </form>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link href="/wishlist" className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Heart className="w-6 h-6 text-[#083b66]" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">0</span>
              </Link>
              <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-lg relative">
                <ShoppingBag className="w-6 h-6 text-[#083b66]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              
              {/* Account Section - Shows dropdown when logged in, Sign In button when not */}
              {authLoading ? (
                <div className="w-24 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              ) : user ? (
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#083b66] text-white rounded-lg hover:bg-[#062d4d] transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">{user.name || user.email?.split('@')[0]}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${accountDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Account Dropdown */}
                  {accountDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-800">{user.name || 'User'}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <Link href="/orders" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50">
                        <Package className="w-4 h-4" />
                        <span className="text-sm">My Orders</span>
                      </Link>
                      <Link href="/profile" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50">
                        <User className="w-4 h-4" />
                        <span className="text-sm">My Account</span>
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login" className="px-5 py-2.5 bg-[#083b66] text-white font-bold rounded-lg hover:bg-[#062d4d] transition-colors shadow-md">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar - Logo + Search (Sticky Top) */}
      <div className="md:hidden sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="text-xl font-extrabold text-[#083b66] flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            StellarMartBD
          </Link>

          {/* Search Toggle & Menu */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 bg-gray-100 rounded-lg"
            >
              {searchOpen ? <X className="w-5 h-5 text-[#083b66]" /> : <Search className="w-5 h-5 text-[#083b66]" />}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-gray-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#083b66]" /> : <Menu className="w-5 h-5 text-[#083b66]" />}
            </button>
          </div>
        </div>

        {/* Search Bar (Expandable) */}
        {searchOpen && (
          <div className="px-4 pb-3">
            <form action="/search" className="relative">
              <input
                type="text"
                name="q"
                placeholder="Search products..."
                className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#083b66] text-gray-800"
                autoFocus
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#083b66] text-white rounded-md text-sm font-bold">
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="px-4 pb-4 bg-white border-t">
            <div className="py-3 space-y-2">
              <Link href="/" className="block py-2 font-semibold text-gray-800">Home</Link>
              <Link href="/shop" className="block py-2 font-semibold text-gray-800">Shop</Link>
              <Link href="/categories" className="block py-2 font-semibold text-gray-800">Categories</Link>
              <Link href="/products?featured=true" className="block py-2 font-semibold text-gray-800">Featured</Link>
              <Link href="/new-arrivals" className="block py-2 font-semibold text-gray-800">New Arrivals</Link>
              <Link href="/flash-sale" className="block py-2 font-bold text-red-600">Flash Sale 🔥</Link>
              <Link href="/wishlist" className="block py-2 font-semibold text-gray-800">Wishlist</Link>
              <Link href="/cart" className="block py-2 font-semibold text-gray-800">Cart</Link>
              {user ? (
                <>
                  <Link href="/orders" className="block py-2 font-semibold text-gray-800">My Orders</Link>
                  <Link href="/profile" className="block py-2 font-semibold text-gray-800">My Account</Link>
                  <button onClick={handleLogout} className="block py-2 font-semibold text-red-600 w-full text-left">Logout</button>
                </>
              ) : (
                <Link href="/login" className="block py-2 font-semibold text-gray-800">Sign In</Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Bottom Bar - Profile, Support, Cart (Sticky Bottom) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
        <div className="flex items-center justify-around py-3 px-4">
          {/* Profile */}
          <Link href={user ? "/profile" : "/login"} className="flex flex-col items-center gap-1">
            <User className="w-6 h-6 text-gray-700" />
            <span className="text-xs font-medium text-gray-700">Profile</span>
          </Link>

          {/* Support */}
          <Link href="/contact" className="flex flex-col items-center gap-1">
            <Headphones className="w-6 h-6 text-gray-700" />
            <span className="text-xs font-medium text-gray-700">Support</span>
          </Link>

          {/* Cart - Opens Drawer */}
          <button onClick={() => setCartOpen(true)} className="flex flex-col items-center gap-1 relative">
            <ShoppingBag className="w-6 h-6 text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <span className="text-xs font-medium text-gray-700">Cart</span>
          </button>

          {/* Wishlist */}
          <Link href="/wishlist" className="flex flex-col items-center gap-1">
            <Heart className="w-6 h-6 text-gray-700" />
            <span className="text-xs font-medium text-gray-700">Wishlist</span>
          </Link>
        </div>
      </div>

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
