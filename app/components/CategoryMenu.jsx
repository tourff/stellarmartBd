'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';

const CategoryMenu = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubSubDropdown, setOpenSubSubDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories?nested=true', { 
          cache: 'no-store' 
        });
        const data = await res.json();
        if (data.categories) {
          setCategories(data.categories);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error loading categories', err);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-[#083b66] h-10 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center h-full">
          <div className="h-4 w-32 bg-white/20 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Category Menu - Hidden on mobile */}
      <div className="w-full bg-[#083b66] text-white border-t border-blue-800 shadow-md hidden md:block sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-8 py-3 text-[13px] font-bold tracking-wider">
            <li className="hover:text-yellow-400 cursor-pointer transition-all uppercase">
              <Link href="/">Home</Link>
            </li>

            {categories.map((cat, index) => (
              <li
                key={cat._id}
                className="relative py-1 cursor-pointer hover:text-yellow-400 flex items-center gap-1 transition-all duration-300 uppercase"
                style={{ overflow: 'visible' }}
                onMouseEnter={() => setOpenDropdown(index)}
                onMouseLeave={() => { setOpenDropdown(null); setOpenSubSubDropdown(null); }}
              >
                <Link href={`/category/${cat.slug}`} className="flex items-center gap-1 relative z-50">
                  <span>{cat.name}</span>
                  {cat.subcategories?.length > 0 && <ChevronDown size={14} />}
                </Link>

                {/* Level 2 Dropdown */}
                {cat.subcategories?.length > 0 && openDropdown === index && (
                  <div className="absolute top-full left-0 pt-2 z-[9999] min-w-[220px]" style={{ overflow: 'visible' }}>
                    <div className="bg-white text-gray-800 shadow-2xl border border-gray-100 py-1" style={{ overflow: 'visible' }}>
                      {cat.subcategories.map((sub, subIndex) => (
                        <div 
                          key={sub._id}
                          className="relative group/sub"
                          style={{ overflow: 'visible' }}
                          onMouseEnter={() => setOpenSubSubDropdown(`${index}-${subIndex}`)}
                        >
                          <Link
                            href={`/category/${sub.slug}`}
                            className="flex items-center justify-between px-5 py-2.5 hover:bg-[#083b66] hover:text-white text-[13px] font-semibold border-b border-gray-50 last:border-0 transition-colors"
                          >
                            <span>{sub.name}</span>
                            {sub.subcategories?.length > 0 && <ChevronRight size={14} />}
                          </Link>

                          {/* Level 3 Dropdown (Right Side) */}
                          {sub.subcategories?.length > 0 && openSubSubDropdown === `${index}-${subIndex}` && (
                            <div className="absolute top-0 left-full pl-0.5 z-[1000] min-w-[200px]" style={{ overflow: 'visible' }}>
                              <div className="bg-white text-gray-800 shadow-2xl border border-gray-100 py-1 translate-x-1">
                                {sub.subcategories.map((subSub) => (
                                  <Link
                                    key={subSub._id}
                                    href={`/category/${subSub.slug}`}
                                    className="block px-5 py-2.5 hover:bg-[#083b66] hover:text-white text-[13px] font-semibold border-b border-gray-50 last:border-0 transition-colors"
                                  >
                                    {subSub.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
            
            <li className="hover:text-yellow-400 cursor-pointer transition-all uppercase ml-auto">
              <Link href="/flash-sale" className="text-red-400">Flash Sale 🔥</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Category Button - Visible only on mobile */}
      <div className="md:hidden bg-[#083b66] mt-0">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-full flex items-center justify-between px-4 py-2 text-white font-bold"
        >
          <div className="flex items-center gap-2">
            <Menu className="w-5 h-5" />
            <span>Categories</span>
          </div>
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        
        {/* Mobile Category Dropdown */}
        {mobileMenuOpen && (
          <div className="bg-white border-t border-blue-800 max-h-[60vh] overflow-y-auto">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <div key={cat._id} className="border-b border-gray-100">
                  <Link 
                    href={`/category/${cat.slug}`}
                    className="block px-4 py-3 text-gray-800 font-semibold hover:bg-blue-50"
                  >
                    {cat.name}
                  </Link>
                  {cat.subcategories?.map((sub) => (
                    <Link
                      key={sub._id}
                      href={`/category/${sub.slug}`}
                      className="block px-6 py-2.5 text-gray-600 hover:bg-blue-50 text-sm"
                    >
                      → {sub.name}
                    </Link>
                  ))}
                </div>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-gray-500">
                <p>No categories available</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryMenu;

