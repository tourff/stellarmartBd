'use client';

import Link from 'next/link';
import { useCategories } from '../lib/hooks/useCategories';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function CategoryMenu() {
  const { categories, loading } = useCategories();
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  return (
    <nav className="bg-[#083b66] border-t border-white/10 shadow-lg relative z-[9999]">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex items-center text-white text-[13px] font-bold uppercase tracking-tight">
          
          <li>
            <Link href="/" className="block py-3 px-5 hover:bg-white/10 transition border-r border-white/10">
              Home
            </Link>
          </li>

          {!loading && categories.length > 0 ? (
            categories.map((item) => (
              <li 
                key={item._id} 
                className="relative group h-full border-r border-white/10 last:border-0"
                onMouseEnter={() => setActiveMenu(item._id)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link 
                  href={`/category/${item.slug}`}
                  className="flex items-center gap-2 py-3 px-5 hover:bg-white/10 transition cursor-pointer h-full"
                >
                  {item.icon && <span>{item.icon}</span>}
                  {item.name}
                  {item.children && item.children.length > 0 && (
                    <ChevronDown className="w-3 h-3 opacity-70 group-hover:rotate-180 transition duration-300" />
                  )}
                </Link>

                {/* Level 2: Sub Categories */}
                {item.children && item.children.length > 0 && activeMenu === item._id && (
                  <div className="absolute top-full left-0 w-60 bg-white text-gray-800 shadow-2xl rounded-b-lg border-t-4 border-[#fbbf24] opacity-100 visible transition-all duration-300 transform translate-y-0 z-[9999]">
                    <ul className="py-2">
                      {item.children.map((child) => (
                        <li 
                          key={child._id} 
                          className="relative sub-group border-b border-gray-50 last:border-0"
                          onMouseEnter={() => setActiveSubMenu(child._id)}
                          onMouseLeave={() => setActiveSubMenu(null)}
                        >
                          <Link 
                            href={`/category/${child.slug}`}
                            className="flex items-center justify-between px-5 py-2.5 hover:bg-gray-100 hover:text-[#083b66] hover:pl-7 transition-all text-[12px] font-semibold w-full"
                          >
                            <span>
                              {child.icon && <span className="mr-2">{child.icon}</span>}
                              {child.name}
                            </span>
                            {child.children && child.children.length > 0 && (
                              <ChevronDown className="w-3 h-3 text-gray-400 rotate-[-90deg]" />
                            )}
                          </Link>

                          {/* Level 3: Sub-Sub Categories */}
                          {child.children && child.children.length > 0 && activeSubMenu === child._id && (
                            <div className="sub-menu absolute left-full top-0 w-56 bg-white text-gray-800 shadow-xl rounded-lg border border-gray-100 opacity-100 visible transition-all duration-300 transform translate-x-0 z-[10000]">
                              <ul className="py-2">
                                {child.children.map((grandchild) => (
                                  <li key={grandchild._id}>
                                    <Link 
                                      href={`/category/${grandchild.slug}`}
                                      className="block px-5 py-2 hover:bg-gray-50 hover:text-[#083b66] transition text-[11px] font-medium"
                                    >
                                      {grandchild.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))
          ) : (
            <li className="px-5 py-3 text-white/50 text-xs italic">
              {loading ? 'Loading...' : 'No Categories Active'}
            </li>
          )}

          <li>
            <Link href="/flash-sale" className="block py-3 px-5 hover:bg-white/10 transition border-r border-white/10 text-yellow-400">
              Flash Sale 🔥
            </Link>
          </li>
        </ul>
      </div>

      <style jsx>{`
        .sub-group:hover > .sub-menu {
          opacity: 1;
          visibility: visible;
          transform: translateX(0);
          margin-left: 2px;
        }
      `}</style>
    </nav>
  );
}
