'use client';

import Link from 'next/link';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export default function CartDrawer({ isOpen, onClose, cart, loading, updateQuantity, removeFromCart, clearCart }) {
  if (!isOpen) return null;

  const cartTotal = cart?.total || 0;
  const shipping = cartTotal >= 500 ? 0 : 60;
  const finalTotal = cartTotal + shipping;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-[#083b66] to-[#062d4d] text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            <h2 className="text-xl font-bold">Shopping Cart</h2>
            {cart?.items?.length > 0 && (
              <span className="bg-white text-[#083b66] px-2 py-0.5 rounded-full text-sm font-bold">
                {cart.items.length}
              </span>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#083b66]"></div>
            </div>
          ) : cart?.items?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-gray-500">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-lg font-semibold text-gray-700">Your cart is empty</p>
              <p className="text-sm text-gray-500 mt-1">Add some products to get started</p>
              <Link href="/shop" onClick={onClose} className="mt-4 text-[#083b66] font-medium hover:underline">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {cart?.items?.map((item) => {
                const product = item.product;
                const itemPrice = product?.sellingPrice || product?.regularPrice || product?.price || 0;
                const itemTotal = itemPrice * item.quantity;
                
                return (
                  <div key={item.productId || item._id} className="flex gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                      {product?.featuredImage ? (
                        <img src={product.featuredImage} alt={product.nameEn || product.name || 'Product'} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <ShoppingBag className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">
                        {product?.nameEn || product?.name || 'Product'}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        ৳{itemPrice.toLocaleString()} × {item.quantity}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} disabled={item.quantity <= 1} className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-600 disabled:opacity-50">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-semibold text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-600">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(item.productId)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg" title="Remove item">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-[#083b66]">৳{itemTotal.toLocaleString()}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart?.items?.length > 0 && (
          <div className="border-t p-4 bg-white space-y-4 shadow-lg">
            {/* Free Shipping Progress */}
            {cartTotal < 500 && (
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-xs text-green-700 font-medium">Add ৳{(500 - cartTotal).toLocaleString()} more for free shipping!</p>
                <div className="mt-1.5 h-1.5 bg-green-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${(cartTotal / 500) * 100}%` }} />
                </div>
              </div>
            )}
            
            {/* Clear Cart */}
            <button onClick={() => { if (confirm('Clear all items from cart?')) clearCart(); }} className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1">
              <Trash2 className="w-4 h-4" />
              Clear Cart
            </button>
            
            {/* Summary */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>৳{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>{shipping === 0 ? "Free" : `৳${shipping}`}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total</span>
                <span className="text-[#083b66]">৳{finalTotal.toLocaleString()}</span>
              </div>
            </div>
            
            {/* Checkout Button */}
            <Link href="/cart" onClick={onClose} className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#083b66] text-white font-bold rounded-xl hover:bg-[#062d4d] transition-all shadow-lg hover:shadow-xl">
              Proceed to Checkout
              <ArrowRight className="w-5 h-5" />
            </Link>

            {/* Trust Badge */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span>Secure checkout • Easy returns</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
