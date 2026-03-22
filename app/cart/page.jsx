'use client';

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";

export default function CartPage() {
  const { cart, loading, updateQuantity, removeFromCart, clearCart, cartCount } = useCart();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-gray-700">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-90" />
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-blue-100">Review your items ({cartCount} items)</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          <Link href="/" className="text-blue-600 hover:underline">Home</Link>
          <span className="text-gray-400">/</span>
          <Link href="/shop" className="text-blue-600 hover:underline">Shop</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700 font-medium">Cart</span>
        </div>

        {cart?.items?.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-dashed border-gray-200">
            <ShoppingBag className="w-20 h-20 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 text-lg">No items added yet. Start shopping!</p>
            <Link 
              href="/shop" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold shadow-lg transition-all duration-200"
            >
              Continue Shopping
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="px-6 py-4 border-b bg-gray-50">
                <h2 className="text-xl font-bold text-gray-900">Your Items ({cart.items.length})</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {cart.items.map((item) => (
                  <div key={item.product?._id || item.productId} className="p-6 hover:bg-gray-50">
                    <div className="flex gap-4 items-start">
                      {/* Image */}
                      <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {item.product?.featuredImage ? (
                          <Image
                            src={item.product.featuredImage}
                            alt={item.product?.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <ShoppingBag className="w-12 h-12 text-gray-400" />
                          </div>
                        )}
                      </div>
                      
                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                          {item.product?.name || "Product"}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {item.product?.category?.name || item.product?.category || "Category"}
                        </p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(item.product?._id || item.productId, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:hover:text-gray-500 rounded-l-lg hover:bg-gray-50"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center py-2 font-semibold text-lg text-gray-900 px-4">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product?._id || item.productId, item.quantity + 1)}
                              className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-r-lg hover:bg-gray-50"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          
                          {/* Price */}
                          <div className="text-right ml-auto">
                            <p className="text-2xl font-bold text-blue-700">
                              ৳{((item.product?.sellingPrice || 0) * item.quantity).toLocaleString()}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-sm text-gray-500">
                                ৳{item.product?.sellingPrice?.toLocaleString() || 0}/unit
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.product?._id || item.productId)}
                        className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors group"
                        title="Remove item"
                      >
                        <Trash2 className="w-6 h-6 group-hover:text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary & Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Summary Card */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-lg">
                    <span>Total Items:</span>
                    <span>{cartCount}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span>Subtotal:</span>
                    <span className="font-bold text-blue-700 text-xl">৳{cart?.total?.toLocaleString() || 0}</span>
                  </div>
                </div>
                <button
                  onClick={clearCart}
                  className="w-full py-3 px-6 border-2 border-red-200 text-red-700 font-semibold rounded-xl hover:border-red-300 hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-5 h-5" />
                  Clear Cart
                </button>
              </div>

              {/* CTA Buttons */}
              <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col gap-4">
                <Link
                  href="/shop"
                  className="block py-4 px-6 border-2 border-blue-200 text-blue-700 font-semibold rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all text-center flex items-center justify-center gap-2"
                >
                  ← Continue Shopping
                </Link>
                <Link
                  href="/checkout"
                  className="block py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all text-center flex items-center justify-center gap-2 text-lg"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

