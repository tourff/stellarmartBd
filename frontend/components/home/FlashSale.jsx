'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaFire, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// নিশ্চিত হোন যে আপনার ProductCard ফাইলটি সঠিক জায়গায় আছে
import ProductCard from '../products/ProductCard'; 

const flashProducts = [
  { id: 1, name: 'Wireless Earbuds Pro', image: '/images/product-1.jpg', regular_price: 2500, selling_price: 1499, discount: 40, rating: 4.5, reviews: 128 },
  { id: 2, name: 'Smart Watch Series 5', image: '/images/product-2.jpg', regular_price: 4500, selling_price: 2999, discount: 33, rating: 4.8, reviews: 256 },
  { id: 3, name: 'Bluetooth Speaker', image: '/images/product-3.jpg', regular_price: 1800, selling_price: 999, discount: 44, rating: 4.3, reviews: 89 },
  { id: 4, name: 'Phone Case Premium', image: '/images/product-4.jpg', regular_price: 800, selling_price: 399, discount: 50, rating: 4.6, reviews: 312 },
  { id: 5, name: 'USB Hub 7 Port', image: '/images/product-5.jpg', regular_price: 1200, selling_price: 699, discount: 42, rating: 4.2, reviews: 67 },
  { id: 6, name: 'Laptop Stand Aluminum', image: '/images/product-6.jpg', regular_price: 1500, selling_price: 899, discount: 40, rating: 4.7, reviews: 145 },
  { id: 7, name: 'Wireless Mouse', image: '/images/product-7.jpg', regular_price: 900, selling_price: 499, discount: 45, rating: 4.4, reviews: 198 },
  { id: 8, name: 'LED Desk Lamp', image: '/images/product-8.jpg', regular_price: 1600, selling_price: 799, discount: 50, rating: 4.5, reviews: 87 },
];

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 45, seconds: 30 });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 8, minutes: 45, seconds: 30 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % (flashProducts.length / 4));
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + flashProducts.length / 4) % (flashProducts.length / 4));

  const TimerBox = ({ value, label }) => (
    <div className="bg-orange-600 text-white px-3 py-2 rounded-lg text-center min-w-[64px] shadow-md">
      <span className="block text-xl font-bold leading-none">{String(value).padStart(2, '0')}</span>
      <span className="text-[10px] uppercase font-semibold">{label}</span>
    </div>
  );

  return (
    <section className="py-12 bg-gradient-to-br from-orange-50 to-red-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-orange-500 p-3 rounded-full animate-pulse">
              <FaFire className="text-white text-2xl" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Flash Sale</h2>
              <p className="text-gray-500 font-medium italic">Don't miss out - Limited stock!</p>
            </div>
          </div>

          {/* Timer Display */}
          <div className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm border border-orange-100">
            <span className="text-orange-600 font-bold text-sm uppercase px-2">Ends In:</span>
            <div className="flex items-center gap-2">
              <TimerBox value={timeLeft.hours} label="Hrs" />
              <span className="text-orange-500 font-bold text-2xl">:</span>
              <TimerBox value={timeLeft.minutes} label="Min" />
              <span className="text-orange-500 font-bold text-2xl">:</span>
              <TimerBox value={timeLeft.seconds} label="Sec" />
            </div>
          </div>
        </div>

        {/* Products Carousel Area */}
        <div className="relative group">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {flashProducts.slice(currentIndex * 4, currentIndex * 4 + 4).map((product) => (
              <div key={product.id} className="transform transition duration-300 hover:-translate-y-2">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button onClick={prevSlide} className="absolute -left-5 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-orange-600 hover:bg-orange-600 hover:text-white transition-all z-20 opacity-0 group-hover:opacity-100 border border-orange-50">
            <FaChevronLeft size={20} />
          </button>
          <button onClick={nextSlide} className="absolute -right-5 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-orange-600 hover:bg-orange-600 hover:text-white transition-all z-20 opacity-0 group-hover:opacity-100 border border-orange-50">
            <FaChevronRight size={20} />
          </button>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/flash-sale" className="inline-flex items-center gap-3 px-8 py-3 bg-white border-2 border-orange-500 text-orange-600 font-bold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-lg shadow-orange-200">
            Explore All Deals <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FlashSale;