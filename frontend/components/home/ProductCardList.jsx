'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaShoppingCart, FaHeart, FaStar, FaCheck } from 'react-icons/fa';
// 'stores' এর বদলে 'hooks' পাথ ব্যবহার করা হয়েছে
import { useCart } from '@/lib/hooks/useCart'; 
import toast from 'react-hot-toast';

export default function ProductCardList({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

  // ডিসকাউন্ট ক্যালকুলেশন
  const discountPercent = product.discount || (product.regular_price > product.selling_price 
    ? Math.round(((product.regular_price - product.selling_price) / product.regular_price) * 100) 
    : 0);

  const handleAddToCart = (e) => {
    e.preventDefault(); // যাতে লিঙ্কে ক্লিক না হয়
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <Link href={`/products/${product.slug}`} className="group block mb-4">
      <div className="flex flex-col md:flex-row bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
        
        {/* Image Section */}
        <div className="relative w-full md:w-56 h-48 md:h-auto bg-gray-50 flex-shrink-0">
          <Image
            src={product.image || '/images/product-placeholder.jpg'}
            alt={product.name}
            fill
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          />
          {discountPercent > 0 && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">
              {discountPercent}% Off
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
               <p className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-1">
                 {product.category}
               </p>
               <button
                onClick={handleWishlist}
                className={`transition-colors ${isWishlisted ? 'text-red-500' : 'text-gray-300 hover:text-red-400'}`}
              >
                <FaHeart size={20} />
              </button>
            </div>
            
            <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={14} className={i < Math.round(product.rating || 4) ? 'fill-current' : 'text-gray-200'} />
                ))}
              </div>
              <span className="text-xs text-gray-500 font-medium">({product.reviews || 0} reviews)</span>
            </div>

            {/* Features/Description */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-2 italic">
              {product.description || "Premium quality gaming product, perfect for your needs."}
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-green-600 uppercase">
              <FaCheck size={10} />
              <span>In Stock</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            {/* Pricing */}
            <div className="flex flex-col">
              <span className="text-2xl font-black text-gray-900">
                ৳{product.selling_price?.toLocaleString()}
              </span>
              {product.regular_price > product.selling_price && (
                <span className="text-sm text-gray-400 line-through">
                  ৳{product.regular_price?.toLocaleString()}
                </span>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 bg-gray-900 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-bold transition-all transform active:scale-95 shadow-md"
            >
              <FaShoppingCart size={18} />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
