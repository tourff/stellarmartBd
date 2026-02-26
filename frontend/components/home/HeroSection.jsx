'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
// ইমপোর্ট পাথটি আপনার jsconfig.json অনুযায়ী ঠিক করা হয়েছে
import Button from '@/components/common/Button'; 

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'স্মার্টফোনে ৫০% ছাড়',
      subtitle: 'সর্বশেষ iPhone, Samsung ও Xiaomi মডেল',
      image: '/images/slides/smartphone-sale.jpg',
      cta: 'এখনই কিনুন',
      link: '/products?category=smartphones',
      bgGradient: 'from-blue-600 to-blue-800',
    },
    {
      id: 2,
      title: 'ল্যাপটপ ফেস্টিভাল',
      subtitle: 'Dell, HP ও MacBook-এ বিশেষ ছাড়',
      image: '/images/slides/laptop-sale.jpg',
      cta: 'দেখুন অফার',
      link: '/products?category=laptops',
      bgGradient: 'from-purple-600 to-purple-800',
    },
    {
      id: 3,
      title: 'হোম অ্যাপ্লায়েন্স সেল',
      subtitle: 'এয়ার কন্ডিশনার, ফ্রিজ ও ওয়াশিং মেশিন',
      image: '/images/slides/appliance-sale.jpg',
      cta: 'শপিং করুন',
      link: '/products?category=appliances',
      bgGradient: 'from-green-600 to-green-800',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative pt-20 md:pt-0">
      <div className="relative h-[500px] md:h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background with Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} opacity-90`} />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            
            {/* Content */}
            <div className="relative container mx-auto px-4 h-full flex items-center">
              <div className="max-w-2xl animate-fade-in">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8">
                  {slide.subtitle}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href={slide.link}>
                    <Button size="lg" className="shadow-glow">
                      {slide.cta}
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-800">
                      সব পণ্য দেখুন
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center backdrop-blur-sm transition"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center backdrop-blur-sm transition"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Dots Navigation */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
