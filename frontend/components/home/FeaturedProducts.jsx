'use client';

import { useState } from 'react';
import { FaThLarge, FaList, FaArrowRight } from 'react-icons/fa';
import ProductCard from '@/components/products/ProductCard';
import ProductCardList from './ProductCardList';
import Link from 'next/link';

const products = [
  { id: 1, name: 'Wireless Headphones Pro', slug: 'wireless-headphones-pro', image: '/images/product-1.jpg', regular_price: 3500, selling_price: 2499, discount: 29, rating: 4.7, reviews: 234, category: 'Electronics' },
  { id: 2, name: 'Smart Watch Band 5', slug: 'smart-watch-band-5', image: '/images/product-2.jpg', regular_price: 2800, selling_price: 1999, discount: 29, rating: 4.5, reviews: 156, category: 'Electronics' },
  { id: 3, name: 'Premium Leather Wallet', slug: 'premium-leather-wallet', image: '/images/product-3.jpg', regular_price: 1200, selling_price: 799, discount: 33, rating: 4.8, reviews: 89, category: 'Fashion' },
  { id: 4, name: 'Bluetooth Speaker Mini', slug: 'bluetooth-speaker-mini', image: '/images/product-4.jpg', regular_price: 1800, selling_price: 1299, discount: 28, rating: 4.3, reviews: 67, category: 'Electronics' },
  { id: 5, name: 'Running Shoes Sport', slug: 'running-shoes-sport', image: '/images/product-5.jpg', regular_price: 2500, selling_price: 1799, discount: 28, rating: 4.6, reviews: 198, category: 'Sports' },
  { id: 6, name: 'Cotton T-Shirt Pack', slug: 'cotton-tshirt-pack', image: '/images/product-6.jpg', regular_price: 1500, selling_price: 999, discount: 33, rating: 4.4, reviews: 145, category: 'Fashion' },
  { id: 7, name: 'Kitchen Organizer Set', slug: 'kitchen-organizer-set', image: '/images/product-7.jpg', regular_price: 2200, selling_price: 1599, discount: 27, rating: 4.2, reviews: 78, category: 'Home' },
  { id: 8, name: 'Face Serum Vitamin C', slug: 'face-serum-vitamin-c', image: '/images/product-8.jpg', regular_price: 980, selling_price: 649, discount: 34, rating: 4.9, reviews: 312, category: 'Beauty' },
];

export default function FeaturedProducts() {
  const [viewMode, setViewMode] = useState('grid');

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Check out our most popular products</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* View Toggle */}
            <div className="hidden md:flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow text-primary-600' : 'text-gray-500'}`}
              >
                <FaThLarge size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow text-primary-600' : 'text-gray-500'}`}
              >
                <FaList size={18} />
              </button>
            </div>

            <Link href="/products" className="text-primary-600 hover:text-primary-700 flex items-center gap-2 font-medium">
              View All <FaArrowRight />
            </Link>
          </div>
        </div>

        {/* Products Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <ProductCardList key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* View All Button - Mobile */}
        <div className="text-center mt-8 md:hidden">
          <Link href="/products" className="btn-outline">
            View All Products <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );

}
