'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Demo banners for when no database is connected
const defaultBanners = [
  {
    id: 1,
    title: 'Mega Sale',
    description: 'Up to 50% Off on Electronics',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=400&fit=crop',
    link: '/flash-sale',
    bgColor: 'from-blue-600 to-blue-800'
  },
  {
    id: 2,
    title: 'New Collection',
    description: 'Explore Latest Fashion Trends',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop',
    link: '/category/fashion',
    bgColor: 'from-purple-600 to-purple-800'
  },
  {
    id: 3,
    title: 'Free Shipping',
    description: 'On Orders Over ৳500',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
    link: '/shop',
    bgColor: 'from-green-600 to-green-800'
  }
];

const sideBanners = [
  {
    id: 4,
    title: 'Smartphones',
    description: 'Best Deals',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=200&fit=crop',
    link: '/category/electronics',
    bgColor: 'from-pink-500 to-pink-700'
  },
  {
    id: 5,
    title: 'Fashion Week',
    description: 'Up to 40% Off',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=200&fit=crop',
    link: '/category/fashion',
    bgColor: 'from-orange-500 to-orange-700'
  }
];

export default function HeroBanner({ autoPlayInterval = 3000 }) {
  const [banners, setBanners] = useState(defaultBanners);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch('/api/banners?position=hero');
        const data = await res.json();
        
        if (data.banners && data.banners.length > 0) {
          // Transform database banners to match our format
          const heroBanners = data.banners.map(b => ({
            id: b._id,
            title: b.title,
            description: b.description,
            image: b.image,
            link: b.link || '/shop',
            bgColor: 'from-blue-600 to-blue-800'
          }));
          setBanners(heroBanners);
        }
      } catch (error) {
        console.log('Using default banners');
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [banners.length, autoPlayInterval]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  if (loading) {
    return (
      <section className="py-6 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-[400px] bg-gray-200 animate-pulse rounded-2xl"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Left - Main Carousel */}
          <div className="lg:col-span-2 relative h-[400px] rounded-2xl overflow-hidden group">
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="relative h-full">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                  <div className="absolute inset-0 flex items-center">
                    <div className="p-8 md:p-12 max-w-lg">
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
                        {banner.title}
                      </h2>
                      <p className="text-lg md:text-xl text-white/90 mb-6">
                        {banner.description}
                      </p>
                      <Link
                        href={banner.link || '/shop'}
                        className="inline-block px-8 py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation Arrows */}
            {banners.length > 1 && (
              <>
                <button
                  onClick={goToPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-white"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-800" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-white"
                >
                  <ChevronRight className="w-6 h-6 text-gray-800" />
                </button>

                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {banners.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentSlide
                          ? 'bg-white w-8'
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right - Side Banners */}
          <div className="flex flex-col gap-4">
            {sideBanners.map((banner) => (
              <Link
                key={banner.id}
                href={banner.link}
                className="relative h-[190px] rounded-2xl overflow-hidden group"
              >
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${banner.bgColor} opacity-80`} />
                <div className="absolute inset-0 flex items-center p-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {banner.title}
                    </h3>
                    <p className="text-white/90 font-medium">
                      {banner.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
