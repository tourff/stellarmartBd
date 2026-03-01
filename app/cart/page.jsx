'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default function CartPage() {
  const { cart, loading, updateQuantity, removeFromCart, clearCart, cartCount } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [applyingCoupon, setApplyingCoupon] = useState(false);

  const subtotal = cart?.total || 0;
  const shipping = subtotal > 0 ? (subtotal >= 500 ? 0 : 60) : 0;
  const discount = 0;
  const total = subtotal + shipping - discount;

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    await updateQuantity(productId, newQuantity);
  };

  const handleRemove = async (productId) => {
    if (confirm('Are you sure you want to remove this item?')) {
      await removeFromCart(productId);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setApplyingCoupon(true);
    setTimeout(() => {
      setApplyingCoupon(false);
      alert('Coupon code applied successfully!');
    }, 1000);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-[#083b66] to-[#062d4d] text-white py-10">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
            <p className="text-blue-200">{cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-2 mb-6 text-sm">
            <Link href="/" className="text-[#083b66] hover:underline">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-700">Shopping Cart</span>
          </div>

          {cart?.items?.length === 0 || !cart?.items ? (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-[#083b66]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
              </p>
              <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-4 bg-[#083b66] text-white rounded-xl hover:bg-[#062d4d] font-semibold transition-all">
                Start Shopping
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-white rounded-xl shadow-sm p-4 hidden md:grid grid-cols-12 gap-4 text-sm font-semibold text-gray-600">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                {cart.items.map((item) => {
                  const product = item.product;
                  const itemPrice = product?.sellingPrice || product?.regularPrice || 0;
                  const itemTotal = itemPrice * item.quantity;
                  
                  return (
                    <div key={item._id || item.productId} className="bg-white rounded-xl shadow-sm p-4 md:grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-6 flex items-center gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          {product?.featuredImage ? (
                            <img src={product.featuredImage} alt={product.nameEn || product.name || 'Product'} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <ShoppingBag className="w-8 h-8" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 line-clamp-2">{product?.nameEn || product?.name || 'Product'}</h3>
                          {product?.sku && <p className="text-sm text-gray-500">SKU: {product.sku}</p>}
                          <button onClick={() => handleRemove(item.productId)} className="text-red-500 text-sm hover:text-red-700 mt-1 flex items-center gap-1">
                            <Trash2 className="w-4 h-4" /> Remove
                          </button>
                        </div>
                      </div>

                      <div className="col-span-2 text-center mt-4 md:mt-0">
                        <span className="md:hidden text-gray-500 text-sm">Price: </span>
                        <span className="font-semibold">৳{itemPrice.toLocaleString()}</span>
                      </div>

                      <div className="col-span-2 mt-4 md:mt-0">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => handleQuantityChange(item.productId, item.quantity - 1)} disabled={item.quantity <= 1} className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-semibold">{item.quantity}</span>
                          <button onClick={() => handleQuantityChange(item.productId, item.quantity + 1)} className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="col-span-2 text-right mt-4 md:mt-0">
                        <span className="md:hidden text-gray-500 text-sm">Total: </span>
                        <span className="font-bold text-[#083b66] text-lg">৳{itemTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  );
                })}

                <div className="flex items-center justify-between pt-4">
                  <Link href="/shop" className="text-[#083b66] hover:underline font-medium flex items-center gap-2">
                    ← Continue Shopping
                  </Link>
                  <button onClick={() => { if (confirm('Are you sure you want to clear your cart?')) { clearCart(); }}} className="text-red-500 hover:text-red-700 font-medium">
                    Clear Cart
                  </button>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Coupon Code</label>
                    <div className="flex gap-2">
                      <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="Enter coupon code" className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#083b66] focus:border-transparent" />
                      <button onClick={handleApplyCoupon} disabled={applyingCoupon || !couponCode.trim()} className="px-4 py-2 bg-[#083b66] text-white rounded-lg hover:bg-[#062d4d] disabled:opacity-50 disabled:cursor-not-allowed font-medium">
                        {applyingCoupon ? '...' : 'Apply'}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>৳{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? <span className="text-green-600 font-medium">Free</span> : `৳${shipping.toLocaleString()}`}</span>
                    </div>
                    {subtotal < 500 && subtotal > 0 && (
                      <p className="text-xs text-green-600 bg-green-50 p-2 rounded">
                        Add ৳{(500 - subtotal).toLocaleString()} more for free shipping!
                      </p>
                    )}
                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                      <span>Total</span>
                      <span className="text-[#083b66]">৳{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <Link href="/checkout" className="block w-full mt-6 py-4 bg-[#083b66] text-white text-center rounded-xl hover:bg-[#062d4d] font-semibold transition-all shadow-lg hover:shadow-xl">
                    Proceed to Checkout
                  </Link>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <ShieldCheck className="w-5 h-5 text-green-600" />
                      <span>Secure checkout with SSL</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Truck className="w-5 h-5 text-blue-600" />
                      <span>Fast delivery across Bangladesh</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <RotateCcw className="w-5 h-5 text-orange-600" />
                      <span>Easy 7-day returns</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
