import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold">StellarMartBD</span>
            </div>
            <p className="text-gray-300 mb-4">Your trusted online shopping destination in Bangladesh. We provide quality products at best prices.</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 text-white font-bold">f</a>
              <a href="#" className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-400 text-white font-bold">in</a>
              <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-500 text-white font-bold">Y</a>
              <a href="#" className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-500 text-white font-bold">W</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3 text-gray-300">
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/faq" className="hover:text-blue-400 transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">My Account</h4>
            <ul className="space-y-3 text-gray-300">
              <li><Link href="/login" className="hover:text-blue-400 transition-colors">Login</Link></li>
              <li><Link href="/register" className="hover:text-blue-400 transition-colors">Register</Link></li>
              <li><Link href="/cart" className="hover:text-blue-400 transition-colors">Shopping Cart</Link></li>
              <li><Link href="/orders" className="hover:text-blue-400 transition-colors">My Orders</Link></li>
              <li><Link href="/wishlist" className="hover:text-blue-400 transition-colors">Wishlist</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Contact Us</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-blue-400">📍</span> Dhaka, Bangladesh
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">📧</span> info@stellarmartbd.com
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">📞</span> +880 1234 567890
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">🕐</span> 24/7 Customer Support
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-300">© 2024 StellarMartBD. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-gray-800 rounded text-gray-300">💳 Visa</span>
            <span className="px-3 py-1 bg-gray-800 rounded text-gray-300">💳 Mastercard</span>
            <span className="px-3 py-1 bg-gray-800 rounded text-gray-300">💰 bKash</span>
            <span className="px-3 py-1 bg-gray-800 rounded text-gray-300">💰 Nagad</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
