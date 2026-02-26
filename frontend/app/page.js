import HeroSection from '@/components/home/HeroSection';
import CategorySection from '@/components/home/CategorySection';
import FlashSale from '@/components/home/FlashSale';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import NewArrivals from '@/components/home/NewArrivals';
import BannerSection from '@/components/home/BannerSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Newsletter from '@/components/home/Newsletter';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f7f9]">
      {/* ১. হিরো সেকশন বা মেইন স্লাইডার */}
      <HeroSection />

      {/* ২. শপ বাই ক্যাটাগরি */}
      <div className="container mx-auto px-4 py-8">
        <CategorySection />
      </div>

      {/* ৩. ফ্ল্যাশ সেল (অফার সেকশন) */}
      <section className="bg-white py-10">
        <div className="container mx-auto px-4">
          <FlashSale />
        </div>
      </section>

      {/* ৪. মিডল ব্যানার (প্রোমোশন) */}
      <BannerSection />

      {/* ৫. ফিচারড প্রোডাক্টস (সবচেয়ে জনপ্রিয় পণ্য) */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-tight border-l-4 border-[#083b66] pl-3">
            Featured Products
          </h2>
          <button className="text-[#083b66] font-semibold text-sm hover:underline">
            View All
          </button>
        </div>
        <FeaturedProducts />
      </section>

      {/* ৬. নিউ অ্যারাইভালস (নতুন আসা পণ্য) */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
           <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-tight mb-8 text-center">
            New Arrivals
          </h2>
          <NewArrivals />
        </div>
      </section>

      {/* ৭. কেন আমাদের বেছে নেবেন (Service Features) */}
      <WhyChooseUs />

      {/* ৮. নিউজলেটার বা সাবস্ক্রিপশন */}
      <Newsletter />
    </main>
  );
}
