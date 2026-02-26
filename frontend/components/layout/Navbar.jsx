'use client';

import React from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Headset, ChevronDown } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="w-full shadow-sm">
      {/* Top Header - Logo, Search, and Icons */}
      <div className="bg-white py-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4 md:gap-8">
          
          {/* Logo - KENA KATA Style */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-2xl md:text-3xl font-black italic tracking-tighter">
              <span className="text-[#004a7c]">KENA</span> <span className="text-red-600">KATA</span>
            </h1>
            <p className="text-[10px] text-gray-400 font-bold -mt-1 tracking-widest uppercase">Your Trusted Online Shop</p>
          </Link>

          {/* Search Bar - স্ক্রিনশটের মতো নীল বর্ডার ও বাটন */}
          <div className="hidden md:flex flex-grow max-w-2xl relative">
            <input
              type="text"
              placeholder="Khoj: The Search"
              className="w-full border-2 border-[#004a7c] rounded px-4 py-2 outline-none text-sm"
            />
            <button className="absolute right-0 top-0 bottom-0 bg-[#004a7c] text-white px-5 rounded-r flex items-center justify-center">
              <Search size={20} />
            </button>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-1.5 cursor-pointer group">
              <div className="p-2 rounded-full bg-gray-50 group-hover:bg-blue-50 transition-colors">
                <Headset size={20} className="text-gray-700" />
              </div>
              <span className="hidden lg:block text-[11px] font-bold text-gray-600 uppercase">Support</span>
            </div>

            <Link href="/login" className="flex items-center gap-1.5 group">
              <div className="p-2 rounded-full bg-gray-50 group-hover:bg-blue-50 transition-colors">
                <User size={20} className="text-gray-700" />
              </div>
              <span className="hidden lg:block text-[11px] font-bold text-gray-600 uppercase">Login</span>
            </Link>

            {/* Cart Icon with Badge */}
            <Link href="/cart" className="bg-[#004a7c] text-white p-2 rounded flex items-center gap-2 px-3">
              <div className="relative">
                <ShoppingCart size={18} />
                <span className="absolute -top-3 -right-3 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">0</span>
              </div>
              <div className="hidden md:block">
                <p className="text-[9px] font-medium leading-tight">৳0 (ITEM:0)</p>
                <p className="text-[10px] font-black leading-tight tracking-tighter uppercase">Cart</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation - গাঢ় নীল ব্যাকগ্রাউন্ড */}
      <nav className="bg-[#004a7c] text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center">
          <ul className="flex items-center overflow-x-auto no-scrollbar py-2.5">
            <li>
              <Link href="/" className="flex items-center gap-1.5 px-4 text-[11px] font-bold uppercase hover:text-blue-200">
                <span className="bg-white/20 p-0.5 rounded">🏠</span> HOME
              </Link>
            </li>
            <li className="group relative">
              <button className="flex items-center gap-1 px-4 text-[11px] font-bold uppercase hover:text-blue-200">
                ELECTRONICS <ChevronDown size={14} />
              </button>
            </li>
            <li className="group relative">
              <button className="flex items-center gap-1 px-4 text-[11px] font-bold uppercase hover:text-blue-200">
                FASHION <ChevronDown size={14} />
              </button>
            </li>
            {/* আরও ক্যাটাগরি এখানে যোগ করতে পারেন */}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
