'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Heart, Menu, ChevronDown, Search, User, Headphones, X } from 'lucide-react';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const { cartCount, cart, loading, updateQuantity, removeFromCart, clearCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories/nested');
        const data = await res.json();
        if (data.categories) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveMenu(null);
      setActiveSubMenu(null);
    };
    if (activeMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [activeMenu]);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="bg-[#083b66] shadow-md sticky top-0 z-50 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="text-2xl font-extrabold text-white flex items-center gap-2">
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
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 text-gray-800 font-medium"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-500 font-bold shadow-sm">
                  Search
                </button>
              </form>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link href="/wishlist" className="p-2 hover:bg-white/10 rounded-lg relative">
                <Heart className="w-6 h-6 text-white" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">0</span>
              </Link>
              <Link href="/cart" className="p-2 hover:bg-white/10 rounded-lg relative">
                <ShoppingBag className="w-6 h-6 text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link href="/login" className="px-5 py-2.5 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-500 transition-colors shadow-md">
                Sign In
              </Link>
            </div>
          </div>
          
          {/* Category Mega Menu */}
          <div className="flex items-center gap-0 py-0 border-t border-white/20">
            {/* All Categories Button */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-5 py-3 bg-yellow-400 text-gray-900 font-bold hover:bg-yellow-500 transition-colors">
                <Menu className="w-5 h-5" />
                All Categories
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {/* Level 1: Main Categories */}
              <div className="absolute top-full left-0 w-72 bg-white shadow-2xl rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="py-2">
                  {loadingCategories ? (
                    <div className="px-4 py-3 text-gray-500 text-sm">Loading...</div>
                  ) : categories.length > 0 ? (
                    categories.map((cat) => (
                      <div 
                        key={cat._id}
                        className="relative"
                        onMouseEnter={() => setActiveMenu(cat._id)}
                        onMouseLeave={() => setActiveMenu(null)}
                      >
                        <Link 
                          href={`/category/${cat.slug}`} 
                          className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 text-gray-800 font-medium"
                        >
                          <span className="flex items-center gap-2">
                            {cat.icon && <span>{cat.icon}</span>}
                            {cat.name}
                          </span>
                          {cat.children && cat.children.length > 0 && (
                            <ChevronDown className="w-4 h-4 rotate-[-90deg] text-gray-400" />
                          )}
                        </Link>

                        {/* Level 2: Sub Categories */}
                        {cat.children && cat.children.length > 0 && activeMenu === cat._id && (
                          <div className="absolute left-full top-0 w-64 bg-white shadow-2xl rounded-lg border border-gray-100 opacity-100 visible transition-all duration-300">
                            <div className="py-2">
                              {cat.children.map((subCat) => (
                                <div 
                                  key={subCat._id}
                                  className="relative"
                                  onMouseEnter={() => setActiveSubMenu(subCat._id)}
                                  onMouseLeave={() => setActiveSubMenu(null)}
                                >
                                  <Link 
                                    href={`/category/${subCat.slug}`}
                                    className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 text-gray-700 font-medium text-sm"
                                  >
                                    <span className="flex items-center gap-2">
                                      {subCat.icon && <span>{subCat.icon}</span>}
                                      {subCat.name}
                                    </span>
                                    {subCat.children && subCat.children.length > 0 && (
                                      <ChevronDown className="w-4 h-4 rotate-[-90deg] text-gray-400" />
                                    )}
                                  </Link>

                                  {/* Level 3: Sub-Sub Categories */}
                                  {subCat.children && subCat.children.length > 0 && activeSubMenu === subCat._id && (
                                    <div className="absolute left-full top-0 w-56 bg-white shadow-2xl rounded-lg border border-gray-100 opacity-100 visible transition-all duration-300">
                                      <div className="py-2">
                                        {subCat.children.map((grandCat) => (
                                          <Link 
                                            key={grandCat._id}
                                            href={`/category/${grandCat.slug}`}
                                            className="block px-4 py-2 hover:bg-gray-50 text-gray-600 text-sm"
                                          >
                                            {grandCat.name}
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-500 text-sm">No categories found</div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <Link href="/" className="px-5 py-3 text-white font-semibold hover:bg-white/10 transition-colors">
              Home
            </Link>
            <Link href="/shop" className="px-5 py-3 text-white font-semibold hover:bg-white/10 transition-colors">
              Shop
            </Link>
            <Link href="/categories" className="px-5 py-3 text-white font-semibold hover:bg-white/10 transition-colors">
              All Categories
            </Link>
            <Link href="/products?featured=true" className="px-5 py-3 text-white font-semibold hover:bg-white/10 transition-colors">
              Featured
            </Link>
            <Link href="/new-arrivals" className="px-5 py-3 text-white font-semibold hover:bg-white/10 transition-colors">
              New Arrivals
            </Link>
            <Link href="/flash-sale" className="px-5 py-3 font-bold text-yellow-400 hover:bg-white/10 transition-colors">
              Flash Sale 🔥
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar - Logo + Search (Sticky Top) */}
      <div className="md:hidden sticky top-0 z-50 bg-[#083b66] shadow-md">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="text-xl font-extrabold text-white flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            StellarMartBD
          </Link>

          {/* Search Toggle & Menu */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 bg-white/10 rounded-lg"
            >
              {searchOpen ? <X className="w-5 h-5 text-white" /> : <Search className="w-5 h-5 text-white" />}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-white/10 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
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
                className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400 text-gray-800"
                autoFocus
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-yellow-400 text-gray-900 rounded-md text-sm font-bold">
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
                {loadingCategories ? (
                  <p className="text-gray-500">Loading...</p>
                ) : (
                  categories.map((cat) => (
                    <Link 
                      key={cat._id} 
                      href={`/category/${cat.slug}`} 
                      className="block py-2 text-gray-800"
                    >
                      {cat.icon} {cat.name}
                    </Link>
                  ))
                )}
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
