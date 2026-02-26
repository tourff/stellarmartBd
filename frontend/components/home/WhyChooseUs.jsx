'use client';

import React from 'react';
import { FaShippingFast, FaShieldAlt, FaHeadset, FaUndo, FaAward, FaCheckCircle } from 'react-icons/fa';

const WhyChooseUs = () => {
  const features = [
    {
      icon: FaShippingFast,
      title: 'Fast Delivery',
      desc: 'Free shipping on orders over ৳999'
    },
    {
      icon: FaShieldAlt,
      title: 'Secure Payment',
      desc: '100% secure bKash, Nagad & Card payment'
    },
    {
      icon: FaHeadset, // FaHeadsetCog এর বদলে FaHeadset
      title: '24/7 Support',
      desc: 'Round the clock customer support'
    },
    {
      icon: FaUndo,
      title: 'Easy Returns',
      desc: 'Hassle-free 7-day return policy'
    }
  ];

  return (
    <section className="py-12 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:bg-[#004a7c] transition-all duration-300">
                <feature.icon size={28} className="text-[#004a7c] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-gray-800 text-sm md:text-base uppercase tracking-tight mb-1">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-[11px] md:text-xs leading-relaxed max-w-[200px]">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* নিচের অতিরিক্ত ট্রাস্ট ব্যাজ */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 italic">
           <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
              <FaAward size={16}/> GENUINE PRODUCTS
           </div>
           <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
              <FaCheckCircle size={16}/> QUALITY ASSURED
           </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
