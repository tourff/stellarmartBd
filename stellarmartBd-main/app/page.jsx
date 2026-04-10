'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { ArrowRight as ArrowRightIcon } from 'lucide-react';

// Lazy load heavy components
const HeroBanner = dynamic(() => import('./components/HeroBanner'), {
  loading: () => <div className="h-96 bg-gray-200 animate-pulse" />,
});
const Features = dynamic(() => import('./components/Features'), {
  loading: () => <div className="h-24 bg-gray-200 animate-pulse" />,
});
const ProductCard = dynamic(() => import('./components/ProductCard'), {
  loading: () => <div className="h-64 bg-gray-200 animate-pulse rounded-lg" />,
});

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  const staticCategories = useMemo(
    () => [
      { name: 'Electronics', slug: 'electronics', icon: '📱' },
      { name: 'Fashion', slug: 'fashion', icon: '👔' },
      { name: 'Home & Living', slug: 'home-living', icon: '🏠' },
      { name: 'Sports', slug: 'sports', icon: '⚽' },
      { name: 'Beauty', slug: 'beauty', icon: '💄' },
      { name: 'Books', slug: 'books', icon: '📚' },
    ],
    []
  );

  useEffect(() => {
    // Check cache first
    const cachedData = localStorage.getItem('homePageData');
    const cachedTime = localStorage.getItem('homePageCacheTime');
    const now = Date.now();

    // Use cache if less than 5 minutes old
    if (cachedData && cachedTime && now - parseInt(cachedTime) < 5 * 60 * 1000) {
      const data = JSON.parse(cachedData);
      setCategories(data.categories || []);
      setFeaturedProducts(data.featured || []);
      setNewArrivals(data.arrivals || []);
      setLoading(false);
      return;
    }

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch all data in parallel
      const [categoriesRes, featuredRes, newArrivalsRes] = await Promise.all([
        fetch('/api/categories', { 
          next: { revalidate: 300 } // Cache for 5 minutes
        }),
        fetch('/api/products?featured=true&limit=8', {
          next: { revalidate: 300 }
        }),
        fetch('/api/products?sort=-createdAt&limit=5', {
          next: { revalidate: 300 }
        }),
      ]);

      const [categoriesData, featuredData, newArrivalsData] = await Promise.all([
        categoriesRes.json(),
        featuredRes.json(),
        newArrivalsRes.json(),
      ]);

      const data = {
        categories: categoriesData.categories || [],
        featured: featuredData.products || [],
        arrivals: newArrivalsData.products || [],
      };

      // Cache the data
      localStorage.setItem('homePageData', JSON.stringify(data));
      localStorage.setItem('homePageCacheTime', Date.now().toString());

      setCategories(data.categories);
      setFeaturedProducts(data.featured);
      setNewArrivals(data.arrivals);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const displayCategories = categories.length > 0 ? categories : staticCategories;
  const displayFeatured = featuredProducts.length > 0 ? featuredProducts : [];
  const displayNewArrivals = newArrivals.length > 0 ? newArrivals : [];

  return (
    <div className="min-h-screen bg-white">
      <HeroBanner />
      <Features />

      <section className="py-6 md:py-12">
        <div className="max-w-7xl mx-auto px-2 md:px-4">
          <div className="flex items-center justify-between mb-4 md:mb-8">
            <h2 className="text-lg md:text-2xl font-bold text-gray-900">Shop by Category</h2>
            <Link href="/categories" className="text-blue-700 hover:underline flex items-center gap-1 font-semibold text-sm md:text-base">
              View All <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
            {displayCategories.slice(0, 6).map((category) => (
              <Link
                key={category._id || category.slug}
                href={`/category/${category.slug}`}
                className="group bg-gray-50 rounded-lg md:rounded-xl p-3 md:p-6 text-center hover:bg-blue-50 transition-all hover:shadow-lg"
              >
                <div className="text-2xl md:text-4xl mb-1 md:mb-3">{category.icon || '📦'}</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 text-xs md:text-base">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6 md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-2 md:px-4">
          <div className="flex items-center justify-between mb-4 md:mb-8">
            <div className="flex items-center gap-2 md:gap-3">
              <h2 className="text-lg md:text-2xl font-bold text-gray-900">Featured Products</h2>
              <span className="px-2 md:px-3 py-0.5 md:py-1 bg-red-500 text-white text-[10px] md:text-xs font-bold rounded-full">HOT</span>
            </div>
            <Link href="/shop" className="text-blue-700 hover:underline flex items-center gap-1 font-semibold text-sm md:text-base">
              View All <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-8 md:py-12">
              <Loader2 className="w-6 h-6 md:w-8 md:h-8 text-blue-600 animate-spin" />
            </div>
          ) : displayFeatured.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6">
              {displayFeatured.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 md:py-12">
              <p className="text-gray-600 text-sm md:text-base">No featured products yet.</p>
              <Link href="/admin/products" className="text-blue-700 hover:underline mt-2 inline-block text-sm md:text-base">
                Add products from admin panel
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-6 md:py-12">
        <div className="max-w-7xl mx-auto px-2 md:px-4">
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl md:rounded-2xl p-4 md:p-8 text-white">
              <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-2">Super Sale</h3>
              <p className="mb-3 md:mb-4 opacity-95 text-sm md:text-base">Up to 50% off on electronics</p>
              <Link href="/shop" className="inline-block px-4 md:px-6 py-2 md:py-2.5 bg-white text-pink-600 rounded-lg font-bold hover:bg-gray-100 text-sm md:text-base">
                Shop Now
              </Link>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl md:rounded-2xl p-4 md:p-8 text-white">
              <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-2">New Collection</h3>
              <p className="mb-3 md:mb-4 opacity-95 text-sm md:text-base">Explore the latest fashion trends</p>
              <Link href="/shop" className="inline-block px-4 md:px-6 py-2 md:py-2.5 bg-white text-purple-600 rounded-lg font-bold hover:bg-gray-100 text-sm md:text-base">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-2 md:px-4">
          <div className="flex items-center justify-between mb-4 md:mb-8">
            <div className="flex items-center gap-2 md:gap-3">
              <h2 className="text-lg md:text-2xl font-bold text-gray-900">New Arrivals</h2>
              <span className="px-2 md:px-3 py-0.5 md:py-1 bg-green-500 text-white text-[10px] md:text-xs font-bold rounded-full">NEW</span>
            </div>
            <Link href="/shop" className="text-blue-700 hover:underline flex items-center gap-1 font-semibold text-sm md:text-base">
              View All <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-8 md:py-12">
              <Loader2 className="w-6 h-6 md:w-8 md:h-8 text-blue-600 animate-spin" />
            </div>
          ) : displayNewArrivals.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6">
              {displayNewArrivals.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 md:py-12">
              <p className="text-gray-600 text-sm md:text-base">No new arrivals yet.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-8 md:py-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-2 md:px-4 text-center">
          <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-5 md:mb-8 opacity-95 text-sm md:text-lg">Get the latest updates on new products and upcoming sales</p>
          <div className="max-w-lg mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-3 md:px-5 py-2 md:py-4 rounded-lg text-gray-900 text-sm md:text-lg font-medium"
            />
            <button className="px-4 md:px-8 py-2 md:py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-gray-100 transition-colors text-sm md:text-base">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-white">
      <HeroBanner />
      <Features />

      <section className="py-6 md:py-12">
        <div className="max-w-7xl mx-auto px-2 md:px-4">
          <div className="flex items-center justify-between mb-4 md:mb-8">
            <h2 className="text-lg md:text-2xl font-bold text-gray-900">Shop by Category</h2>
            <Link href="/categories" className="text-blue-700 hover:underline flex items-center gap-1 font-semibold text-sm md:text-base">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
            {displayCategories.slice(0, 6).map((category) => (
              <Link
                key={category._id || category.slug}
                href={`/category/${category.slug}`}
                className="group bg-gray-50 rounded-lg md:rounded-xl p-3 md:p-6 text-center hover:bg-blue-50 transition-all hover:shadow-lg"
              >
                <div className="text-2xl md:text-4xl mb-1 md:mb-3">{category.icon || '📦'}</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 text-xs md:text-base">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6 md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-2 md:px-4">
          <div className="flex items-center justify-between mb-4 md:mb-8">
            <div className="flex items-center gap-2 md:gap-3">
              <h2 className="text-lg md:text-2xl font-bold text-gray-900">Featured Products</h2>
              <span className="px-2 md:px-3 py-0.5 md:py-1 bg-red-500 text-white text-[10px] md:text-xs font-bold rounded-full">HOT</span>
            </div>
            <Link href="/shop" className="text-blue-700 hover:underline flex items-center gap-1 font-semibold text-sm md:text-base">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-8 md:py-12">
              <Loader2 className="w-6 h-6 md:w-8 md:h-8 text-blue-600 animate-spin" />
            </div>
          ) : displayFeatured.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {displayFeatured.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 md:py-12">
              <p className="text-gray-600 text-sm md:text-base">No featured products yet.</p>
              <Link href="/admin/products" className="text-blue-700 hover:underline mt-2 inline-block text-sm md:text-base">
                Add products from admin panel
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-6 md:py-12">
        <div className="max-w-7xl mx-auto px-2 md:px-4">
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl md:rounded-2xl p-4 md:p-8 text-white">
              <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-2">Super Sale</h3>
              <p className="mb-3 md:mb-4 opacity-95 text-sm md:text-base">Up to 50% off on electronics</p>
              <Link href="/shop" className="inline-block px-4 md:px-6 py-2 md:py-2.5 bg-white text-pink-600 rounded-lg font-bold hover:bg-gray-100 text-sm md:text-base">
                Shop Now
              </Link>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl md:rounded-2xl p-4 md:p-8 text-white">
              <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-2">New Collection</h3>
              <p className="mb-3 md:mb-4 opacity-95 text-sm md:text-base">Explore the latest fashion trends</p>
              <Link href="/shop" className="inline-block px-4 md:px-6 py-2 md:py-2.5 bg-white text-purple-600 rounded-lg font-bold hover:bg-gray-100 text-sm md:text-base">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-2 md:px-4">
          <div className="flex items-center justify-between mb-4 md:mb-8">
            <div className="flex items-center gap-2 md:gap-3">
              <h2 className="text-lg md:text-2xl font-bold text-gray-900">New Arrivals</h2>
              <span className="px-2 md:px-3 py-0.5 md:py-1 bg-green-500 text-white text-[10px] md:text-xs font-bold rounded-full">NEW</span>
            </div>
            <Link href="/shop" className="text-blue-700 hover:underline flex items-center gap-1 font-semibold text-sm md:text-base">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-8 md:py-12">
              <Loader2 className="w-6 h-6 md:w-8 md:h-8 text-blue-600 animate-spin" />
            </div>
          ) : displayNewArrivals.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {displayNewArrivals.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 md:py-12">
              <p className="text-gray-600 text-sm md:text-base">No new arrivals yet.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-8 md:py-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-2 md:px-4 text-center">
          <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-5 md:mb-8 opacity-95 text-sm md:text-lg">Get the latest updates on new products and upcoming sales</p>
          <div className="max-w-lg mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-3 md:px-5 py-2 md:py-4 rounded-lg text-gray-900 text-sm md:text-lg font-medium"
            />
            <button className="px-4 md:px-8 py-2 md:py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-gray-100 transition-colors text-sm md:text-base">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
