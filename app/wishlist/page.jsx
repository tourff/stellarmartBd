import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Heart, ShoppingBag } from 'lucide-react';

export default function WishlistPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-pink-600 to-pink-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center gap-2 mb-6 text-sm">
            <Link href="/" className="text-blue-600 hover:underline">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-700">Wishlist</span>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Save your favorite items to buy them later.</p>
            <Link href="/shop" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
