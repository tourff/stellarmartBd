import Link from 'next/link';
import { ShoppingBag, Star, Truck, Shield, Headphones, ArrowRight, Heart } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              StellarMartBD
            </Link>
            
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Search
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-lg">
                <ShoppingBag className="w-6 h-6" />
              </Link>
              <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Welcome to StellarMartBD
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Your one-stop shop for all your needs. Best products, best prices, best service.
              </p>
              <div className="flex gap-4">
                <Link href="/shop" className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100">
                  Shop Now
                </Link>
                <Link href="/categories" className="px-6 py-3 border-2 border-white rounded-lg font-semibold hover:bg-white/10">
                  Browse Categories
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold">10K+</div>
                    <div className="text-sm opacity-80">Products</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold">5K+</div>
                    <div className="text-sm opacity-80">Customers</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold">500+</div>
                    <div className="text-sm opacity-80">Brands</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold">24/7</div>
                    <div className="text-sm opacity-80">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Free Shipping</h3>
                <p className="text-sm text-gray-500">On orders over ৳500</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Secure Payment</h3>
                <p className="text-sm text-gray-500">100% Secure</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Best Quality</h3>
                <p className="text-sm text-gray-500">Guaranteed</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Headphones className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">24/7 Support</h3>
                <p className="text-sm text-gray-500">Dedicated support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Shop by Category</h2>
            <Link href="/categories" className="text-blue-600 hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['Electronics', 'Fashion', 'Home & Living', 'Sports', 'Books', 'Beauty'].map((category) => (
              <Link
                key={category}
                href={`/category/${category.toLowerCase().replace(' ', '-')}`}
                className="group bg-gray-50 rounded-xl p-6 text-center hover:bg-blue-50 transition-colors"
              >
                <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md">
                  <ShoppingBag className="w-8 h-8 text-gray-600 group-hover:text-blue-600" />
                </div>
                <h3 className="font-medium">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link href="/products" className="text-blue-600 hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Link
                key={item}
                href={`/product/product-${item}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
              >
                <div className="aspect-square bg-gray-100 relative">
                  <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs rounded">
                    -20%
                  </div>
                  <div className="absolute top-2 right-2 p-1 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="w-4 h-4" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-2 line-clamp-2">Premium Product {item} - Best Quality</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">(50)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-blue-600">৳1,999</span>
                    <span className="text-sm text-gray-400 line-through">৳2,499</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">New Arrivals</h2>
            <Link href="/products?sort=newest" className="text-blue-600 hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <Link
                key={item}
                href={`/product/new-product-${item}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="aspect-square bg-gray-100"></div>
                <div className="p-3">
                  <h3 className="text-sm font-medium line-clamp-2">New Arrival Product {item}</h3>
                  <p className="text-blue-600 font-bold mt-1">৳{999 + item * 100}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-6 opacity-90">Get the latest updates on new products and upcoming sales</p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">StellarMartBD</h3>
              <p className="text-gray-400">Your trusted online shopping destination in Bangladesh.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms & Conditions</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">My Account</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/login" className="hover:text-white">Login</Link></li>
                <li><Link href="/register" className="hover:text-white">Register</Link></li>
                <li><Link href="/cart" className="hover:text-white">Cart</Link></li>
                <li><Link href="/orders" className="hover:text-white">My Orders</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@stellarmartbd.com</li>
                <li>Phone: +880 1234 567890</li>
                <li>Address: Dhaka, Bangladesh</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 StellarMartBD. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
