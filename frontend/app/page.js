import HeroSection from '@/components/home/HeroSection';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import FlashSale from '@/components/home/FlashSale';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import NewArrivals from '@/components/home/NewArrivals';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Newsletter from '@/components/home/Newsletter';
import { LayoutGrid } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f4f7f9]">
      {/* Hero Slider Section */}
      <section>
        <HeroSection />
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Section Title Style Like Screenshot */}
        <div className="flex items-center gap-2 mb-8 border-b-2 border-[#004a7c] pb-2">
           <span className="bg-[#004a7c] p-1.5 text-white rounded-sm">
             <LayoutGrid size={18}/>
           </span>
           <h2 className="text-lg md:text-xl font-bold uppercase text-gray-800 tracking-tight">
             Shop By Categories
           </h2>
        </div>

        {/* Categories Grid */}
        <FeaturedCategories />

        {/* Flash Sale - হাইলাইট সেকশন */}
        <div className="mt-16">
          <FlashSale />
        </div>

        {/* Featured Products - আপনার সেই ব্লু থিম কার্ডগুলো এখানে থাকবে */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-3">
            <h2 className="text-xl font-bold uppercase text-[#004a7c]">Featured Products</h2>
            <button className="text-[11px] font-bold text-blue-600 hover:underline uppercase">View All</button>
          </div>
          <FeaturedProducts />
        </div>

        {/* New Arrivals */}
        <div className="mt-16">
          <NewArrivals />
        </div>
      </div>

      {/* Trust Badges - এখানে সেই আইকন এরর ফিক্স করা ফাইলটি কাজ করবে */}
      <div className="mt-20">
        <WhyChooseUs />
      </div>

      {/* Newsletter */}
      <Newsletter />
    </main>
  );
}
