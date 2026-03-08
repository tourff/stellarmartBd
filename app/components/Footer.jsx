import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-3 md:px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8 md:12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <ShoppingBag className="w-6 md:w-8 h-6 md:h-8 text-blue-400" />
              <span className="text-lg md:text-2xl font-bold">StellarMartBD</span>
            </div>
            <p className="text-gray-300 mb-4 text-sm">Your trusted online shopping destination in Bangladesh.</p>
            <div className="flex gap-2 md:gap-4">
              <a href="#" className="w-8 md:w-10 h-8 md:h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 text-white font-bold text-sm">f</a>
              <a href="#" className="w-8 md:w-10 h-8 md:h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-400 text-white font-bold text-sm">in</a>
              <a href="#" className="w-8 md:w-10 h-8 md:h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-500 text-white font-bold text-sm">Y</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm md:text-lg mb-3 md:mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-gray-300 text-xs md:text-sm">
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm md:text-lg mb-3 md:mb-4 text-white">My Account</h4>
            <ul className="space-y-2 text-gray-300 text-xs md:text-sm">
              <li><Link href="/login" className="hover:text-blue-400 transition-colors">Login</Link></li>
              <li><Link href="/register" className="hover:text-blue-400 transition-colors">Register</Link></li>
              <li><Link href="/cart" className="hover:text-blue-400 transition-colors">Shopping Cart</Link></li>
              <li><Link href="/orders" className="hover:text-blue-400 transition-colors">My Orders</Link></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-bold text-sm md:text-lg mb-3 md:mb-4 text-white">Contact Us</h4>
            <ul className="space-y-2 text-gray-300 text-xs md:text-sm">
              <li className="flex items-center gap-2">
                <span className="text-blue-400">📍</span> Dhaka, Bangladesh
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">📧</span> info@stellarmartbd.com
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">📞</span> +880 1234 567890
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
          <p className="text-gray-300 text-xs md:text-sm">© 2024 StellarMartBD. All rights reserved.</p>
          <div className="flex items-center gap-2 md:gap-4">
            <span className="px-2 md:px-3 py-1 bg-gray-800 rounded text-gray-300 text-xs">💳 Visa</span>
            <span className="px-2 md:px-3 py-1 bg-gray-800 rounded text-gray-300 text-xs">💳 Mastercard</span>
            <span className="px-2 md:px-3 py-1 bg-gray-800 rounded text-gray-300 text-xs hidden sm:inline">💰 bKash</span>
            <span className="px-2 md:px-3 py-1 bg-gray-800 rounded text-gray-300 text-xs hidden sm:inline">💰 Nagad</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
