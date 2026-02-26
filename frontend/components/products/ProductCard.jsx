'use client';
import { FaShoppingCart, FaStar, FaBolt } from 'react-icons/fa';

export default function ProductCard({ product }) {
  const discount = 17; // Sample discount

  return (
    <div className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col h-full relative">
      {/* Discount Badge */}
      <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded z-10">
        -{discount}%
      </div>

      {/* Image */}
      <div className="aspect-square bg-gray-50 flex items-center justify-center p-4">
        <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform" />
      </div>

      {/* Details */}
      <div className="p-3 text-center flex flex-col flex-grow">
        <h3 className="font-bold text-gray-800 text-xs md:text-sm uppercase mb-1 line-clamp-2 min-h-[32px]">
          {product.name}
        </h3>
        
        <div className="flex justify-center text-orange-400 text-[10px] mb-1">
           <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
           <span className="text-gray-400 ml-1">(141)</span>
        </div>

        <div className="text-sm md:text-base font-bold text-gray-900 mt-auto">
          ৳{product.price} <span className="text-gray-400 line-through text-[11px] font-normal ml-1">৳{product.oldPrice}</span>
        </div>

        <div className="mt-3 flex flex-col gap-1.5">
          <button className="w-full bg-gray-100 text-gray-700 py-1.5 rounded font-bold text-[10px] flex items-center justify-center gap-1 hover:bg-gray-200">
            <FaShoppingCart size={12} /> ADD TO CART
          </button>
          <button className="w-full bg-[#004a7c] text-white py-1.5 rounded font-bold text-[10px] flex items-center justify-center gap-1 hover:bg-[#00365b]">
            <FaBolt size={10} /> BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
}
