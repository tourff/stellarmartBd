import Link from 'next/link';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroBanner from './components/HeroBanner';
import Features from './components/Features';
import ProductCard from './components/ProductCard';

export default function HomePage() {
  const categories = [
    { name: 'Electronics', slug: 'electronics', icon: '📱' },
    { name: 'Fashion', slug: 'fashion', icon: '👔' },
    { name: 'Home & Living', slug: 'home-living', icon: '🏠' },
    { name: 'Sports', slug: 'sports', icon: '⚽' },
    { name: 'Beauty', slug: 'beauty', icon: '💄' },
    { name: 'Books', slug: 'books', icon: '📚' },
  ];

  const featuredProducts = [
    { id: '1', name: 'Smartphone Galaxy S24 Ultra', slug: 'smartphone-s24', price: 85000, oldPrice: 95000, category: 'Electronics', rating: 4.5 },
    { id: '2', name: 'MacBook Pro 14 inch M3', slug: 'macbook-pro', price: 195000, oldPrice: 220000, category: 'Electronics', rating: 5 },
    { id: '3', name: 'AirPods Pro 2nd Generation', slug: 'airpods-pro', price: 4500, oldPrice: 5500, category: 'Electronics', rating: 4.8 },
    { id: '4', name: 'Smart Watch Series 9', slug: 'smart-watch-9', price: 25000, oldPrice: 32000, category: 'Electronics', rating: 4.6 },
    { id: '5', name: 'iPad Pro 12.9 inch', slug: 'ipad-pro', price: 125000, oldPrice: 145000, category: 'Electronics', rating: 4.9 },
    { id: '6', name: 'Sony WH-1000XM5 Headphones', slug: 'sony-headphones', price: 18500, oldPrice: 22000, category: 'Electronics', rating: 4.7 },
    { id: '7', name: 'Gaming Console Xbox Series X', slug: 'xbox-series-x', price: 55000, oldPrice: 65000, category: 'Gaming', rating: 4.8 },
    { id: '8', name: 'DSLR Camera Canon EOS R6', slug: 'canon-camera', price: 175000, oldPrice: 195000, category: 'Electronics', rating: 4.9 },
  ];

  const newArrivals = [
    { id: '1', name: 'Wireless Earbuds Pro', slug: 'wireless-earbuds-pro', price: 2500 },
    { id: '2', name: 'Bluetooth Speaker', slug: 'bluetooth-speaker', price: 3500 },
    { id: '3', name: 'Fitness Tracker Band', slug: 'fitness-tracker', price: 1800 },
    { id: '4', name: 'Portable Power Bank 20000mAh', slug: 'power-bank', price: 2200 },
    { id: '5', name: 'USB-C Hub Multiport', slug: 'usb-hub', price: 1500 },
  ];

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
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group bg-gray-50 rounded-xl p-6 text-center hover:bg-blue-50 transition-all hover:shadow-lg"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
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
            <Link href="/products?featured=true" className="text-blue-700 hover:underline flex items-center gap-1 font-semibold">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Super Sale</h3>
              <p className="mb-4 opacity-95">Up to 50% off on electronics</p>
              <Link href="/flash-sale" className="inline-block px-6 py-2.5 bg-white text-pink-600 rounded-lg font-bold hover:bg-gray-100">
                Shop Now
              </Link>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">New Collection</h3>
              <p className="mb-4 opacity-95">Explore the latest fashion trends</p>
              <Link href="/category/fashion" className="inline-block px-6 py-2.5 bg-white text-purple-600 rounded-lg font-bold hover:bg-gray-100">
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
            <Link href="/products?sort=newest" className="text-blue-700 hover:underline flex items-center gap-1 font-semibold">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {newArrivals.map((item) => (
              <Link
                key={item.id}
                href={`/product/${item.slug}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden group"
              >
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <ShoppingBag className="w-12 h-12 text-gray-400" />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold line-clamp-2 text-gray-900 group-hover:text-blue-700">{item.name}</h3>
                  <p className="text-blue-700 font-bold mt-1">৳{item.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
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
