'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { Heart, Trash2, ShoppingBag, Loader2, ChevronRight, ShoppingCart, Menu, X, Package } from 'lucide-react';

export default function WishlistPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [removing, setRemoving] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user) {
      setLoading(false);
      fetchWishlist();
    }
  }, [user, authLoading, router]);

  const fetchWishlist = async () => {
    setFetching(true);
    try {
      const res = await fetch('/api/wishlist');
      const data = await res.json();
      
      if (res.ok) {
        setWishlist(data.wishlist || []);
      } else {
        console.error('Failed to fetch wishlist:', data.error);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setFetching(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    setRemoving(productId);
    try {
      const res = await fetch('/api/wishlist', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setWishlist(data.wishlist || []);
      } else {
        console.error('Failed to remove from wishlist:', data.error);
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    } finally {
      setRemoving(null);
    }
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  if (authLoading || loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-pink-600 to-pink-800 text-white py-6 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">My Wishlist</h1>
            <p className="text-pink-200 text-sm sm:text-base">Your saved items ({wishlist.length})</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
          <div className="flex items-center gap-2 mb-4 sm:mb-6 text-xs sm:text-sm">
            <Link href="/" className="text-[#083b66] hover:underline">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-700">Wishlist</span>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden mb-4">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm text-gray-700 w-full justify-between"
            >
              <span className="font-medium">Menu</span>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          <div className="grid md:grid-cols-4 gap-4 sm:gap-6">
            {/* Desktop Sidebar */}
            <div className="hidden md:block md:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{user?.name || 'User'}</h3>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                <nav className="space-y-2">
                  <Link href="/profile" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                    <span className="font-medium text-sm">Profile</span>
                  </Link>
                  <Link href="/orders" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                    <span className="font-medium text-sm">My Orders</span>
                  </Link>
                  <Link href="/wishlist" className="flex items-center gap-3 px-4 py-3 bg-pink-600 text-white rounded-lg">
                    <span className="font-medium text-sm">Wishlist</span>
                  </Link>
                  <Link href="/settings" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                    <span className="font-medium text-sm">Settings</span>
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full">
                    <span className="font-medium text-sm">Logout</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden col-span-4">
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <nav className="space-y-2">
                    <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                      <span className="font-medium">Profile</span>
                    </Link>
                    <Link href="/orders" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                      <span className="font-medium">My Orders</span>
                    </Link>
                    <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 bg-pink-600 text-white rounded-lg">
                      <span className="font-medium">Wishlist</span>
                    </Link>
                    <Link href="/settings" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                      <span className="font-medium">Settings</span>
                    </Link>
                  </nav>
                </div>
              </div>
            )}

            {/* Wishlist Content */}
            <div className="md:col-span-3">
              {fetching ? (
                <div className="flex items-center justify-center py-8 sm:py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-pink-600" />
                </div>
              ) : wishlist.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-6 sm:p-12 text-center">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <Heart className="w-8 h-8 sm:w-12 sm:h-12 text-pink-600" />
                  </div>
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Your wishlist is empty</h2>
                  <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">Save your favorite items to buy them later.</p>
                  <Link href="/shop" className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#083b66] text-white rounded-xl hover:bg-[#062d4d] font-semibold transition-all text-sm sm:text-base">
                    Start Shopping
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Product</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                          <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {wishlist.map((item) => (
                          <tr key={item._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-4">
                                {item.image ? (
                                  <Link href={`/product/${item.slug}`}>
                                    <Image 
                                      src={item.image} 
                                      alt={item.name} 
                                      width={80} 
                                      height={80} 
                                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                                    />
                                  </Link>
                                ) : (
                                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                                  </div>
                                )}
                                <div>
                                  <Link href={`/product/${item.slug}`} className="font-semibold text-gray-900 hover:text-[#083b66] text-sm sm:text-base">
                                    {item.name}
                                  </Link>
                                  {item.category && (
                                    <p className="text-xs sm:text-sm text-gray-500">{item.category}</p>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {item.salePrice ? (
                                <div>
                                  <span className="font-semibold text-gray-900 text-sm sm:text-base">৳{item.salePrice.toLocaleString()}</span>
                                  <span className="text-xs sm:text-sm text-gray-500 line-through ml-2">৳{item.price.toLocaleString()}</span>
                                </div>
                              ) : (
                                <span className="font-semibold text-gray-900 text-sm sm:text-base">৳{item.price.toLocaleString()}</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              {item.inStock ? (
                                <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-medium">
                                  In Stock
                                </span>
                              ) : (
                                <span className="px-2 sm:px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs sm:text-sm font-medium">
                                  Out of Stock
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-2">
                                {item.inStock && (
                                  <button className="p-2 text-[#083b66] hover:bg-blue-50 rounded-lg" title="Add to Cart">
                                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                                  </button>
                                )}
                                <button 
                                  onClick={() => removeFromWishlist(item._id)}
                                  disabled={removing === item._id}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50"
                                  title="Remove from Wishlist"
                                >
                                  {removing === item._id ? (
                                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                                  ) : (
                                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="md:hidden divide-y divide-gray-200">
                    {wishlist.map((item) => (
                      <div key={item._id} className="p-4">
                        <div className="flex gap-3 sm:gap-4">
                          {item.image ? (
                            <Link href={`/product/${item.slug}`}>
                              <Image 
                                src={item.image} 
                                alt={item.name} 
                                width={80} 
                                height={80} 
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                            </Link>
                          ) : (
                            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <ShoppingBag className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <Link href={`/product/${item.slug}`} className="font-semibold text-gray-900 hover:text-[#083b66] text-sm sm:text-base block line-clamp-2">
                              {item.name}
                            </Link>
                            {item.category && (
                              <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                            )}
                            <div className="mt-2 flex items-center justify-between">
                              <div>
                                {item.salePrice ? (
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-gray-900 text-sm sm:text-base">৳{item.salePrice.toLocaleString()}</span>
                                    <span className="text-xs text-gray-500 line-through">৳{item.price.toLocaleString()}</span>
                                  </div>
                                ) : (
                                  <span className="font-semibold text-gray-900 text-sm sm:text-base">৳{item.price.toLocaleString()}</span>
                                )}
                              </div>
                              {item.inStock ? (
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                  In Stock
                                </span>
                              ) : (
                                <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                                  Out of Stock
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-end gap-2 mt-3 pt-3 border-t">
                          {item.inStock && (
                            <button className="p-2 text-[#083b66] hover:bg-blue-50 rounded-lg" title="Add to Cart">
                              <ShoppingCart className="w-5 h-5" />
                            </button>
                          )}
                          <button 
                            onClick={() => removeFromWishlist(item._id)}
                            disabled={removing === item._id}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50"
                            title="Remove from Wishlist"
                          >
                            {removing === item._id ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                              <Trash2 className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
