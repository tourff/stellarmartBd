'use client';

import Link from 'next/link';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Image from 'next/image';

export default function WishlistPage() {
  const { user } = useAuth();
  const { wishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleRemoveFromWishlist = async (productId) => {
    await removeFromWishlist(productId);
  };

  const handleAddToCart = async (product) => {
    await addToCart(product._id, 1);
  };

  if (!user) {
    return (
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
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Please Login</h2>
            <p className="text-gray-600 mb-6">You need to login to view your wishlist.</p>
            <Link href="/login" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
              Login Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-pink-600 to-pink-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
          <p className="text-pink-100">{wishlist.length} items</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link href="/" className="text-blue-600 hover:underline">Home</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700">Wishlist</span>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Save your favorite items to buy them later.</p>
            <Link href="/shop" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div key={product._id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/product/${product.slug}`} className="block">
                  <div className="aspect-square bg-gray-100 relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveFromWishlist(product._id);
                      }}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </Link>
                
                <div className="p-4">
                  <Link href={`/product/${product.slug}`}>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {product.salePrice ? (
                        <>
                          <span className="text-lg font-bold text-gray-900">৳{product.salePrice}</span>
                          <span className="text-sm text-gray-500 line-through">৳{product.price}</span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">৳{product.price}</span>
                      )}
                    </div>
                    
                    <span className={`text-xs px-2 py-1 rounded-full ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
