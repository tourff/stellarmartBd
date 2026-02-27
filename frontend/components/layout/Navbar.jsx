"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Headset, User, X } from 'lucide-react';

const Navbar = ({ cartCount = 0, cartTotal = 0 }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      {/* কার্ট স্লাইডবার ওভারলে */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[1001]" 
          onClick={() => setIsCartOpen(false)} 
        />
      )}

      {/* কার্ট স্লাইডবার */}
      <section className={`fixed top-0 right-0 h-full w-[320px] bg-white shadow-2xl flex flex-col z-[1050] transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <h2 className="font-bold text-gray-800 uppercase text-xs tracking-tighter">Shopping Cart</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-gray-700 hover:text-red-500 p-2">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center opacity-40">
          <ShoppingBag size={48} className="mb-2" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Cart is empty</p>
        </div>

        <div className="p-4 border-t bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold text-gray-500 uppercase">Total:</span>
            <span className="font-black text-lg text-red-700">৳{cartTotal.toLocaleString()}</span>
          </div>
          <button className="w-full bg-[#083b66] text-white py-3 rounded font-bold uppercase text-[10px] hover:bg-blue-900 transition flex items-center justify-center gap-2">
            Order Now
          </button>
        </div>
      </section>

      {/* মেইন নেভবার (হেডার) */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-[1000]">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
          
          {/* লোগো */}
          <Link href="/" className="shrink-0 group">
            <span className="text-xl font-black text-[#083b66] italic uppercase leading-none">
              KENA<span className="text-red-600 group-hover:text-[#083b66] transition-colors"> KATA</span>
            </span>
            <p className="text-[8px] uppercase tracking-tighter font-bold text-gray-600 mt-0.5">Your Trusted Online Shop</p>
          </Link>

          {/* সার্চ বক্স */}
          <form className="hidden md:flex flex-1 max-w-xl border-2 border-[#083b66] rounded overflow-hidden focus-within:border-red-500 transition-all">
            <input 
              type="text" 
              placeholder="Khoj: The Search" 
              className="w-full px-4 py-1.5 outline-none text-xs font-medium"
            />
            <button type="submit" className="bg-[#083b66] text-white px-5 hover:bg-blue-900">
              <Search size={16} />
            </button>
          </form>

          {/* ইউজার অ্যাকশন */}
          <nav className="flex items-center gap-4">
            <Link href="https://wa.me/8801847853867" target="_blank" className="flex flex-col items-center text-gray-600 hover:text-green-600 group">
              <Headset size={18} className="group-hover:scale-110 transition-transform" />
              <span className="text-[8px] font-bold mt-1 uppercase">Support</span>
            </Link>

            <Link href="/login" className="flex flex-col items-center text-gray-600 hover:text-[#083b66] group">
              <User size={18} className="group-hover:scale-110 transition-transform" />
              <span className="text-[8px] font-bold mt-1 uppercase tracking-tighter">Login</span>
            </Link>

            {/* কার্ট বাটন */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="bg-[#083b66] text-white flex items-center gap-3 px-3 py-1.5 rounded hover:bg-blue-900 transition-all shadow-md group"
            >
              <div className="relative">
                <ShoppingBag size={18} className="group-hover:animate-bounce" />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[8px] px-1.5 py-0.5 rounded-full border border-[#083b66] font-bold">
                  {cartCount}
                </span>
              </div>
              <div className="hidden sm:block text-left leading-none">
                <p className="text-[8px] font-bold text-blue-100 uppercase mb-0.5">{cartCount} Items</p>
                <p className="text-[10px] font-black italic">৳{cartTotal.toLocaleString()}</p>
              </div>
            </button>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
