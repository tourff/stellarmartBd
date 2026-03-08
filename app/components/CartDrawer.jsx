'use client';

import Link from 'next/link';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function CartDrawer({ isOpen, onClose, cart, loading, updateQuantity, removeFromCart, clearCart }) {
  if (!isOpen) return null;

  const handleCheckout = () => {
    onClose();
    // Navigate to checkout
  };

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
        <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            <h2 className="text-xl font-bold">Shopping Cart</h2>
            {cart?.items?.length > 0 && (
              <span className="bg-white text-blue-600 px-2 py-0.5 rounded-full text-sm font-bold">
                {cart.items.length}
              </span>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : cart?.items?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-gray-500">
              <ShoppingBag className="w-16 h-16 mb-4" />
              <p className="text-lg font-semibold">Your cart is empty</p>
              <p className="text-sm">Add some products to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart?.items?.map((item) => (
                <div key={item.product?._id || item.productId} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0 relative">
                    {item.product?.image ? (
                      <Image 
                        src={item.product.image} 
                        alt={item.product?.name || 'Product'}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <ShoppingBag className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">
                      {item.product?.name || 'Product'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item.product?.category || 'Category'}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => updateQuantity(item.product?._id || item.productId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white border rounded-lg hover:bg-gray-100"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product?._id || item.productId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white border rounded-lg hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.product?._id || item.productId)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="text-right">
                    <p className="font-bold text-blue-600">
                      ৳{((item.product?.price || 0) * item.quantity).toLocaleString()}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-xs text-gray-500">
                        ৳{item.product?.price}/unit
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart?.items?.length > 0 && (
          <div className="border-t p-4 bg-gray-50 space-y-4">
            {/* Clear Cart */}
            <button 
              onClick={clearCart}
              className="text-sm text-red-500 hover:text-red-600 font-medium"
            >
              Clear Cart
            </button>
            
            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold text-blue-600">
                ৳{cart?.total?.toLocaleString() || 0}
              </span>
            </div>
            
            {/* Checkout Button */}
            <Link 
              href="/cart"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Cart
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>

    </>
  );
}
