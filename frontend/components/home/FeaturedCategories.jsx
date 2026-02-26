import React from 'react';
import Link from 'next/link';
import { ChevronRight, ShoppingBag, Zap, Tv, Smartphone, Watch } from 'lucide-react';

// স্যাম্পল ডেটা (এটি আপনি পরবর্তীতে API থেকে নিতে পারেন)
const categories = [
  {
    id: 1,
    name: 'Electronics',
    icon: <Tv className="w-6 h-6" />,
    count: '240+ Products',
    color: 'bg-blue-100 text-blue-600',
    link: '/products?category=electronics'
  },
  {
    id: 2,
    name: 'Smartphones',
    icon: <Smartphone className="w-6 h-6" />,
    count: '150+ Products',
    color: 'bg-purple-100 text-purple-600',
    link: '/products?category=smartphones'
  },
  {
    id: 3,
    name: 'Fashion',
    icon: <ShoppingBag className="w-6 h-6" />,
    count: '320+ Products',
    color: 'bg-pink-100 text-pink-600',
    link: '/products?category=fashion'
  },
  {
    id: 4,
    name: 'Accessories',
    icon: <Watch className="w-6 h-6" />,
    count: '180+ Products',
    color: 'bg-orange-100 text-orange-600',
    link: '/products?category=accessories'
  },
];

const FeaturedCategories = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Featured Categories
            </h2>
            <p className="text-gray-500 mt-1">Explore our top collections</p>
          </div>
          <Link 
            href="/categories" 
            className="flex items-center text-blue-600 font-medium hover:underline group"
          >
            View All 
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={category.link}
              className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-transparent hover:border-blue-200"
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <span className="text-sm text-gray-400 mt-1">
                  {category.count}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
