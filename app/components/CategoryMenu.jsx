'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';

const CategoryMenu = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubSubDropdown, setOpenSubSubDropdown] = useState(null);

  // Fetch categories from database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories?parent=true', { 
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

  const handleMouseEnter = (index) => {
    setOpenDropdown(index);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
    setOpenSubSubDropdown(null);
  };

  const handleSubMouseEnter = (subIndex) => {
    setOpenSubSubDropdown(subIndex);
  };

  if (loading) {
    return (
      <div className="w-full bg-[#083b66] h-10 hidden md:block">
        <div className="container mx-auto px-4 lg:px-12 flex items-center">
          <div className="h-4 w-32 bg-white/20 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#083b66] text-white border-t border-blue-800 shadow-md hidden md:block">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex items-center gap-8 py-3 text-[13px] font-bold tracking-wider">
          {/* Home Link */}
          <li className="hover:text-yellow-400 cursor-pointer transition-all uppercase">
            <Link href="/">Home</Link>
          </li>

          {/* Categories from database */}
          {categories.map((cat, index) => (
            <li
              key={cat._id}
              className="relative group cursor-pointer hover:text-yellow-400 flex items-center gap-1 transition-all duration-300 uppercase"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <Link href={`/category/${cat.slug}`} className="flex items-center gap-1">
                <span>{cat.name}</span>
                {cat.subcategories && cat.subcategories.length > 0 && (
                  <ChevronDown size={14} className={`transition-transform duration-300 ${openDropdown === index ? 'rotate-180' : ''}`} />
                )}
              </Link>

              {/* Subcategories Dropdown - Level 2 */}
              {cat.subcategories && cat.subcategories.length > 0 && openDropdown === index && (
                <div className="absolute top-full left-0 mt-0 pt-3 z-50">
                  <div className="bg-white text-gray-800 rounded-lg shadow-xl border border-gray-100 py-2 min-w-52">
                    {cat.subcategories.map((sub, subIndex) => (
                      <div 
                        key={sub._id}
                        className="relative group/sub"
                        onMouseEnter={() => handleSubMouseEnter(`${index}-${subIndex}`)}
                        onMouseLeave={() => setOpenSubSubDropdown(null)}
                      >
                        <Link
                          href={`/category/${sub.slug}`}
                          className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 hover:text-[#083b66] text-sm font-medium transition-colors"
                        >
                          <span>{sub.name}</span>
                          {sub.subcategories && sub.subcategories.length > 0 && (
                            <ChevronRight size={14} className="ml-2" />
                          )}
                        </Link>

                        {/* Sub-Subcategories Dropdown - Level 3 */}
                        {sub.subcategories && sub.subcategories.length > 0 && openSubSubDropdown === `${index}-${subIndex}` && (
                          <div className="absolute top-0 left-full ml-0 pl-3 z-50">
                            <div className="bg-white text-gray-800 rounded-lg shadow-xl border border-gray-100 py-2 min-w-52">
                              {sub.subcategories.map((subSub) => (
                                <Link
                                  key={subSub._id}
                                  href={`/category/${subSub.slug}`}
                                  className="block px-4 py-2 hover:bg-gray-50 hover:text-[#083b66] text-sm font-medium transition-colors"
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

          {/* Static Links */}
          <li className="hover:text-yellow-400 cursor-pointer transition-all uppercase">
            <Link href="/shop">All Products</Link>
          </li>
          <li className="hover:text-yellow-400 cursor-pointer transition-all uppercase">
            <Link href="/flash-sale" className="text-red-400">Flash Sale 🔥</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CategoryMenu;
