'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Heart, Menu, ChevronDown, Search, User, Headphones, X } from 'lucide-react';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const { cartCount, cart, loading, updateQuantity, removeFromCart, clearCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const categories = [
    { name: 'Electronics', slug: 'electronics', icon: '📱' },
    { name: 'Fashion', slug: 'fashion', icon: '👔' },
    { name: 'Home & Living', slug: 'home-living', icon: '🏠' },
    { name: 'Sports', slug: 'sports', icon: '⚽' },
    { name: 'Beauty', slug: 'beauty', icon: '💄' },
    { name: 'Books', slug: 'books', icon: '📚' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="text-2xl font-extrabold text-blue-700 flex items-center gap-2">
              <ShoppingBag className="w-8 h-8" />
              StellarMartBD
            </Link>
            
            {/* Search */}
            <div className="flex-1 max-w-xl mx-8">
              <form action="/search" className="relative">
                <input
                  type="text"
                  name="q"
                  placeholder="🔍 Search for products, brands and more..."
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 text-gray-800 font-medium"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-bold shadow-sm">
                  Search
                </button>
              </form>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link href="/wishlist" className="p-2 hover:bg-blue-50 rounded-lg relative">
                <Heart className="w-6 h-6 text-gray-800" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">0</span>
              </Link>
              <Link href="/cart" className="p-2 hover:bg-blue-50 rounded-lg relative">
                <ShoppingBag className="w-6 h-6 text-gray-800" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link href="/login" className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                Sign In
              </Link>
            </div>
          </div>
          
          {/* Category Menu */}
          <div className="flex items-center gap-6 py-3 border-t">
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg font-semibold text-gray-800 hover:bg-gray-200 transition-colors">
                <Menu className="w-5 h-5" />
                All Categories
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-56 bg-white shadow-xl rounded-lg hidden group-hover:block z-50">
                <div className="py-2">
                  {categories.map((cat) => (
                    <Link key={cat.slug} href={`/category/${cat.slug}`} className="flex items-center justify-between px-4 py-2.5 hover:bg-blue-50 text-gray-800">
                      <span className="flex items-center gap-2">{cat.icon} {cat.name}</span>
                      <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-x-auto flex items-center gap-4">
              {categories.slice(0, 6).map((cat) => (
                <Link 
                  key={cat.slug} 
                  href={`/category/${cat.slug}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors whitespace-nowrap"
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar - Logo + Search (Sticky Top) */}
      <div className="md:hidden sticky top-0 z-50 bg-white shadow-md">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="text-xl font-extrabold text-blue-700 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            StellarMartBD
          </Link>

          {/* Search Toggle & Menu */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 bg-gray-100 rounded-lg"
            >
              {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-gray-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
                className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-gray-800"
                autoFocus
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-blue-600 text-white rounded-md text-sm font-bold">
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
              
              {/* Categories */}
              <div className="pt-2 border-t">
                <p className="font-semibold text-gray-600 mb-2">Categories</p>
                {categories.map((cat) => (
                  <Link 
                    key={cat.slug} 
                    href={`/category/${cat.slug}`} 
                    className="block py-2 text-gray-800"
                  >
                    {cat.icon} {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Bottom Bar - Profile, Support, Cart (Sticky Bottom) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
        <div className="flex items-center justify-around py-3 px-4">
          {/* Profile */}
          <Link href="/login" className="flex flex-col items-center gap-1">
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
