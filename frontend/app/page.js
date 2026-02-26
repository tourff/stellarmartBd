import HeroSection from '@/components/home/HeroSection';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import { LayoutGrid } from 'lucide-react';

export default function HomePage() {
  return (
    <main>
      {/* Hero Section with Slider Look */}
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Section Header like Screenshot */}
        <div className="flex items-center gap-2 mb-6 border-b-2 border-[#004a7c] pb-2">
           <span className="bg-[#004a7c] p-1 text-white"><LayoutGrid size={18}/></span>
           <h2 className="text-lg font-bold uppercase text-gray-800">Shop</h2>
        </div>

        {/* Featured Categories Grid */}
        <FeaturedCategories />

        {/* Products Grid */}
        <div className="mt-10">
           <FeaturedProducts />
        </div>
      </div>

      {/* Trust Badges */}
      <WhyChooseUs />
    </main>
  );
}
