"use client"; // ক্লায়েন্ট সাইড রেন্ডারিং নিশ্চিত করতে এটি যোগ করুন

import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import CategorySection from '@/components/home/CategorySection';
import FlashSale from '@/components/home/FlashSale';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import NewArrivals from '@/components/home/NewArrivals';
import BannerSection from '@/components/home/BannerSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Newsletter from '@/components/home/Newsletter';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f7f9] overflow-x-hidden">
      {/* ১. স্লাইডার বা মেইন ব্যানার */}
      <section className="relative overflow-hidden">
        <HeroSection />
      </section>

      {/* ২. ক্যাটাগরি ব্রাউজিং */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col items-center mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-[#083b66] uppercase tracking-tighter italic">
            Shop By <span className="text-red-600">Categories</span>
          </h2>
          <div className="h-1 w-20 bg-[#083b66] mt-2 rounded-full"></div>
        </div>
        <CategorySection />
      </div>

      {/* ৩. ফ্ল্যাশ সেল (অফারস) */}
      <section className="bg-white py-12 shadow-inner">
        <div className="container mx-auto px-4">
          <FlashSale />
        </div>
      </section>

      {/* ৪. বিজ্ঞাপন ব্যানার */}
      <BannerSection />

      {/* ৫. জনপ্রিয় পণ্য (Featured) */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8 border-b-2 border-gray-100 pb-4">
          <h3 className="text-xl font-bold text-gray-800 uppercase flex items-center gap-2">
            <span className="w-2 h-6 bg-[#083b66]"></span> Featured Collection
          </h3>
          <button className="bg-[#083b66] text-white text-[10px] px-4 py-2 rounded-full font-bold uppercase hover:bg-red-600 transition-colors duration-300">
            View All
          </button>
        </div>
        <FeaturedProducts />
      </section>

      {/* ৬. নিউ অ্যারাইভালস */}
      <section className="bg-[#eef2f5] py-16">
        <div className="container mx-auto px-4">
           <h2 className="text-2xl font-black text-[#083b66] uppercase text-center mb-12 italic tracking-tighter">
            New <span className="text-red-600 font-normal">Arrivals</span>
          </h2>
          <NewArrivals />
        </div>
      </section>

      {/* ৭. কেন আমাদের থেকে কিনবেন */}
      <div className="py-10">
        <WhyChooseUs />
      </div>

      {/* ৮. নিউজলেটার */}
      <Newsletter />
    </main>
  );
}
