'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Star, Heart, ShoppingBag, Check } from 'lucide-react';

export default function ProductCard({ product }) {
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const discount = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAdding || added) return;
    
    setIsAdding(true);
    const result = await addToCart(product._id || product.id, 1);
    setIsAdding(false);
    
    if (result.success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };
  
  return (
    <Link
      href={`/product/${product.slug}`}
      className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group block"
    >
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        {discount > 0 && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
            -{discount}%
          </div>
        )}
        <div className="absolute top-2 right-2 p-2 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="w-5 h-5 text-gray-700" />
        </div>
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          <ShoppingBag className="w-16 h-16" />
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-600 font-medium mb-1">{product.category}</p>
        <h3 className="font-semibold mb-2 line-clamp-2 text-gray-900 group-hover:text-blue-700 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
            ))}
          </div>
          <span className="text-xs text-gray-600">({product.rating})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-extrabold text-blue-700">৳{product.price.toLocaleString()}</span>
          {discount > 0 && (
            <span className="text-sm text-gray-500 line-through">৳{product.oldPrice.toLocaleString()}</span>
          )}
        </div>
        <button 
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full mt-3 py-2.5 font-bold rounded-lg transition-all shadow-md 
            ${added 
              ? 'bg-green-600 text-white' 
              : 'bg-blue-600 text-white hover:bg-blue-700 opacity-100'
            }`}
        >
          {added ? (
            <span className="flex items-center justify-center gap-2">
              <Check className="w-5 h-5" />
              Added to Cart
            </span>
          ) : isAdding ? (
            'Adding...'
          ) : (
            'Add to Cart'
          )}
        </button>
      </div>
    </Link>
  );
}
