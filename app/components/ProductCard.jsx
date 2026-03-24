'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Star, Heart, ShoppingBag, Check, ImageIcon } from 'lucide-react';

export default function ProductCard({ product }) {
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  // Get price values from different possible field names
  const sellingPrice = product.sellingPrice || product.price || 0;
  const regularPrice = product.regularPrice || product.oldPrice || 0;
  
  const discount = regularPrice > sellingPrice 
    ? Math.round(((regularPrice - sellingPrice) / regularPrice) * 100)
    : 0;

  // Get image from database or fallback
  const productImage = product.featuredImage || product.images?.[0] || null;

  const [error, setError] = useState('');
  
  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAdding || added) return;
    
    setIsAdding(true);
    setError('');
    const result = await addToCart(product._id || product.id, 1);
    setIsAdding(false);
    
    if (result.success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } else {
      setError(result.message || 'Failed to add to cart');
      setTimeout(() => setError(''), 3000);
    }
  };
  
  return (
<Link
      href={`/product/${product.slug}`}
      className="product-card h-full flex flex-col bg-white rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group block border border-gray-200"
    >
        <div className="aspect-square bg-[#f8fafc] relative overflow-hidden p-2 flex items-center justify-center">
        {discount > 0 && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
            -{discount}%
          </div>
        )}
        <div className="absolute top-2 right-2 p-2 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="w-5 h-5 text-gray-700" />
        </div>
        
        {/* Product Image */}
        {productImage ? (
            <img 
            src={productImage} 
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-lg"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <ImageIcon className="w-16 h-16" />
          </div>
        )}
      </div>
      
      <div className="flex flex-col flex-grow p-4 mt-2">
        <p className="text-xs text-gray-600 font-medium mb-1">
          {product.category?.name || product.category || 'Uncategorized'}
        </p>
        <h3 className="text-sm md:text-base font-black text-slate-900 line-clamp-2 mb-2 group-hover:text-[#083b66] transition-colors uppercase leading-tight">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-xs md:text-sm text-orange-500">
            <Star key="1" className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <Star key="2" className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <Star key="3" className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <Star key="4" className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <Star key="5" className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          </div>
          <span className="text-xs md:text-sm text-slate-800 font-bold">({(product.rating || 4.8).toFixed(1)})</span>
        </div>
        
        {/* Price */}
        <div className="flex items-baseline gap-1 md:gap-2 mb-4">
          <span className="text-base md:text-lg font-black text-black">৳{sellingPrice.toLocaleString()}</span>
          {discount > 0 && (
            <span className="text-xs md:text-sm text-slate-500 line-through font-bold text-[13px]">৳{regularPrice.toLocaleString()}</span>
          )}
        </div>
        
        {/* Stock Status */}
        <div className="mt-auto space-y-2">
          {(product.stockQuantity || product.stock) > 0 ? (
            <button 
              onClick={handleAddToCart}
              disabled={isAdding || added}
              className="btn-action btn-cart-minimal w-full font-black text-sm uppercase flex items-center justify-center gap-1 shadow-sm border border-slate-400 hover:bg-slate-100"
            >
              <ShoppingBag className="w-4 h-4" />
              {isAdding ? 'Adding...' : added ? 'Added!' : 'Add to Cart'}
            </button>
          ) : (
            <button className="w-full py-2.5 font-black text-sm uppercase rounded-lg bg-gray-200 text-gray-500 cursor-not-allowed border" disabled>
              Out of Stock
            </button>
          )}
          <Link 
            href={`/product/${product.slug}`}
            className="btn-action btn-order-now w-full font-black text-sm uppercase flex items-center justify-center gap-1 shadow-md"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </Link>
  );
}
