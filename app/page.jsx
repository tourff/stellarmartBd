'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Loader2 } from 'lucide-react';
import Navbar from './components/Navbar';
import CategoryMenu from './components/CategoryMenu';
import Footer from './components/Footer';
import HeroBanner from './components/HeroBanner';
import Features from './components/Features';
import ProductCard from './components/ProductCard';

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  const staticCategories = [
    { name: 'Electronics', slug: 'electronics', icon: '📱' },
    { name: 'Fashion', slug: 'fashion', icon: '👔' },
    { name: 'Home & Living', slug: 'home-living', icon: '🏠' },
    { name: 'Sports', slug: 'sports', icon: '⚽' },
    { name: 'Beauty', slug: 'beauty', icon: '💄' },
    { name: 'Books', slug: 'books', icon: '📚' },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch categories
      const categoriesRes = await fetch('/api/categories');
      const categoriesData = await categoriesRes.json();
      setCategories(categoriesData.categories || []);

      // Fetch featured products
      const featuredRes = await fetch('/api/products?featured=true&limit=8');
      const featuredData = await featuredRes.json();
      setFeaturedProducts(featuredData.products || []);

      // Fetch new arrivals
      const newArrivalsRes = await fetch('/api/products?sort=-createdAt&limit=5');
      const newArrivalsData = await newArrivalsRes.json();
      setNewArrivals(newArrivalsData.products || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Use static data if no products in database
  const displayCategories = categories.length > 0 ? categories : staticCategories;
  const displayFeatured = featuredProducts.length > 0 ? featuredProducts : [];
  const displayNewArrivals = newArrivals.length > 0 ? newArrivals : [];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-blue-700 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span className="font-medium">🚀 Free Shipping on Orders Over ৳500 | 📞 +880 1234 567890</span>
          <div className="flex gap-4 font-medium">
            <Link href="/track-order" className="hover:text-blue-200">Track Order</Link>
            <Link href="/support" className="hover:text-blue-200">Support</Link>
          </div>
        </div>
      </div>

      <Navbar />
      <CategoryMenu />
      <HeroBanner />
      <Features />

      {/* Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
            <Link href="/categories" className="text-blue-700 hover:underline flex items-center gap-1 font-semibold">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {displayCategories.slice(0, 6).map((category) => (
              <Link
                key={category._id || category.slug}
                href={`/category/${category.slug}`}
                className="group bg-gray-50 rounded-xl p-6 text-center hover:bg-blue-50 transition-all hover:shadow-lg"
              >
                <div className="text-4xl mb-3">{category.icon || '📦'}</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-700">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
              <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">HOT</span>
            </div>
            <Link href="/shop" className="text-blue-700 hover:underline flex items-center gap-1 font-semibold">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : displayFeatured.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {displayFeatured.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No featured products yet.</p>
              <Link href="/admin/products" className="text-blue-700 hover:underline mt-2 inline-block">
                Add products from admin panel
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Super Sale</h3>
              <p className="mb-4 opacity-95">Up to 50% off on electronics</p>
              <Link href="/shop" className="inline-block px-6 py-2.5 bg-white text-pink-600 rounded-lg font-bold hover:bg-gray-100">
                Shop Now
              </Link>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">New Collection</h3>
              <p className="mb-4 opacity-95">Explore the latest fashion trends</p>
              <Link href="/shop" className="inline-block px-6 py-2.5 bg-white text-purple-600 rounded-lg font-bold hover:bg-gray-100">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">New Arrivals</h2>
              <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">NEW</span>
            </div>
            <Link href="/shop" className="text-blue-700 hover:underline flex items-center gap-1 font-semibold">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : displayNewArrivals.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {displayNewArrivals.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No new arrivals yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-8 opacity-95 text-lg">Get the latest updates on new products and upcoming sales</p>
          <div className="max-w-lg mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-5 py-4 rounded-lg text-gray-900 text-lg font-medium"
            />
            <button className="px-8 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
