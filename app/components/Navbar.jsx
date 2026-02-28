'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Heart, Search, User, Headphones, Menu, X, ChevronDown } from 'lucide-react';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    fetch('/api/categories/nested')
      .then(res => res.json())
      .then(data => {
        if (data.success) setCategories(data.categories || []);
      })
      .catch(err => console.error('Failed to load categories:', err));
  }, []);

  return (
    <>
      {/* Main Navigation */}
      <nav className="bg-[#083b66] shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="text-2xl font-extrabold text-white flex items-center gap-2">
              <ShoppingBag className="w-8 h-8" />
              StellarMartBD
            </Link>
            
            {/* Desktop Categories - Mega Menu */}
            <div className="hidden lg:flex items-center gap-1">
              <Link href="/" className="px-4 py-2 text-white hover:bg-white/10 rounded-lg font-medium">
                Home
              </Link>
              <Link href="/shop" className="px-4 py-2 text-white hover:bg-white/10 rounded-lg font-medium">
                Shop
              </Link>
              <div 
                className="relative group"
                onMouseEnter={() => setActiveCategory('categories')}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <button className="px-4 py-2 text-white hover:bg-white/10 rounded-lg font-medium flex items-center gap-1">
                  Categories <ChevronDown className="w-4 h-4" />
                </button>
                
                {/* Mega Menu Dropdown */}
                {activeCategory === 'categories' && categories.length > 0 && (
                  <div className="absolute top-full left-0 w-[600px] bg-white shadow-xl rounded-lg mt-1 p-4 grid grid-cols-3 gap-4">
                    {categories.slice(0, 9).map(category => (
                      <div key={category.id} className="space-y-2">
                        <Link 
                          href={`/category/${category.slug}`}
                          className="block font-bold text-[#083b66] hover:text-yellow-600"
                        >
                          {category.name}
                        </Link>
                        {category.children && category.children.slice(0, 5).map(sub => (
                          <Link 
                            key={sub.id}
                            href={`/category/${sub.slug}`}
                            className="block text-sm text-gray-600 hover:text-[#083b66]"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/products?featured=true" className="px-4 py-2 text-white hover:bg-white/10 rounded-lg font-medium">
                Featured
              </Link>
              <Link href="/new-arrivals" className="px-4 py-2 text-white hover:bg-white/10 rounded-lg font-medium">
                New Arrivals
              </Link>
              <Link href="/flash-sale" className="px-4 py-2 text-red-400 hover:bg-white/10 rounded-lg font-bold">
                Flash Sale 🔥
              </Link>
            </div>
            
            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-xl mx-4">
              <form action="/search" className="relative w-full">
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
            <div className="flex items-center gap-2">
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
              <Link href="/login" className="hidden md:block px-5 py-2.5 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-500 transition-colors shadow-md">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar - Logo + Search */}
      <div className="md:hidden sticky top-0 z-50 bg-[#083b66] shadow-md">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="text-xl font-extrabold text-white flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            StellarMartBD
          </Link>

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
              <Link href="/categories" className="block py-2 font-semibold text-gray-800">All Categories</Link>
              <Link href="/products?featured=true" className="block py-2 font-semibold text-gray-800">Featured</Link>
              <Link href="/new-arrivals" className="block py-2 font-semibold text-gray-800">New Arrivals</Link>
              <Link href="/flash-sale" className="block py-2 font-bold text-red-600">Flash Sale 🔥</Link>
              <Link href="/wishlist" className="block py-2 font-semibold text-gray-800">Wishlist</Link>
              <Link href="/cart" className="block py-2 font-semibold text-gray-800">Cart</Link>
              <Link href="/login" className="block py-2 font-semibold text-gray-800">Sign In</Link>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
        <div className="flex items-center justify-around py-3 px-4">
          <Link href="/login" className="flex flex-col items-center gap-1">
            <User className="w-6 h-6 text-gray-700" />
            <span className="text-xs font-medium text-gray-700">Profile</span>
          </Link>

          <Link href="/contact" className="flex flex-col items-center gap-1">
            <Headphones className="w-6 h-6 text-gray-700" />
            <span className="text-xs font-medium text-gray-700">Support</span>
          </Link>

          <button onClick={() => setCartOpen(true)} className="flex flex-col items-center gap-1 relative">
            <ShoppingBag className="w-6 h-6 text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <span className="text-xs font-medium text-gray-700">Cart</span>
          </button>

          <Link href="/wishlist" className="flex flex-col items-center gap-1">
            <Heart className="w-6 h-6 text-gray-700" />
            <span className="text-xs font-medium text-gray-700">Wishlist</span>
          </Link>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Spacer for Mobile Bottom Bar */}
      <div className="md:hidden h-20"></div>
    </>
  );
}
