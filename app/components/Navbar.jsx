import Link from 'next/link';
import { ShoppingBag, Heart, Menu, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const categories = [
    { name: 'Electronics', slug: 'electronics', icon: '📱' },
    { name: 'Fashion', slug: 'fashion', icon: '👔' },
    { name: 'Home & Living', slug: 'home-living', icon: '🏠' },
    { name: 'Sports', slug: 'sports', icon: '⚽' },
    { name: 'Beauty', slug: 'beauty', icon: '💄' },
    { name: 'Books', slug: 'books', icon: '📚' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
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
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">0</span>
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
          
          <Link href="/" className="font-semibold text-gray-800 hover:text-blue-600 transition-colors">Home</Link>
          <Link href="/shop" className="font-semibold text-gray-800 hover:text-blue-600 transition-colors">Shop</Link>
          <Link href="/categories" className="font-semibold text-gray-800 hover:text-blue-600 transition-colors">Categories</Link>
          <Link href="/products?featured=true" className="font-semibold text-gray-800 hover:text-blue-600 transition-colors">Featured</Link>
          <Link href="/new-arrivals" className="font-semibold text-gray-800 hover:text-blue-600 transition-colors">New Arrivals</Link>
          <Link href="/flash-sale" className="font-bold text-red-600 hover:text-red-700 transition-colors">Flash Sale 🔥</Link>
        </div>
      </div>
    </nav>
  );
}
