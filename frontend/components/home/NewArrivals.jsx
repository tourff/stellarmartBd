'use client';

import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import ProductCard from '@/components/products/ProductCard';
import Link from 'next/link';

const newProducts = [
  { id: 1, name: 'iPhone 15 Pro Case', slug: 'iphone-15-pro-case', image: '/images/product-9.jpg', regular_price: 1200, selling_price: 799, discount: 33, rating: 4.9, reviews: 45, category: 'Electronics', is_new: true },
  { id: 2, name: 'Wireless Charger Pad', slug: 'wireless-charger-pad', image: '/images/product-10.jpg', regular_price: 2500, selling_price: 1799, discount: 28, rating: 4.6, reviews: 89, category: 'Electronics', is_new: true },
  { id: 3, name: 'Sunglasses UV Protection', slug: 'sunglasses-uv-protection', image: '/images/product-11.jpg', regular_price: 1800, selling_price: 1299, discount: 28, rating: 4.7, reviews: 67, category: 'Fashion', is_new: true },
  { id: 4, name: 'Yoga Mat Premium', slug: 'yoga-mat-premium', image: '/images/product-12.jpg', regular_price: 1500, selling_price: 999, discount: 33, rating: 4.8, reviews: 123, category: 'Sports', is_new: true },
  { id: 5, name: 'Essential Oil Set', slug: 'essential-oil-set', image: '/images/product-13.jpg', regular_price: 2200, selling_price: 1499, discount: 32, rating: 4.5, reviews: 78, category: 'Beauty', is_new: true },
  { id: 6, name: 'Plant Pot Ceramic', slug: 'plant-pot-ceramic', image: '/images/product-14.jpg', regular_price: 890, selling_price: 549, discount: 38, rating: 4.4, reviews: 34, category: 'Home', is_new: true },
  { id: 7, name: 'Smart Bulb WiFi', slug: 'smart-bulb-wifi', image: '/images/product-15.jpg', regular_price: 980, selling_price: 649, discount: 34, rating: 4.3, reviews: 156, category: 'Electronics', is_new: true },
  { id: 8, name: 'Bamboo Cutlery Set', slug: 'bamboo-cutlery-set', image: '/images/product-16.jpg', regular_price: 750, selling_price: 449, discount: 40, rating: 4.6, reviews: 89, category: 'Home', is_new: true },
];

export default function NewArrivals() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="section-title">New Arrivals</h2>
            <p className="section-subtitle">Check out the latest products added to our store</p>
          </div>
          <Link href="/products?filter=new" className="text-primary-600 hover:text-primary-700 flex items-center gap-2 font-medium">
            View All <FaArrowRight />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}