// app/page.jsx
import HeroSection from '@/components/home/HeroSection';
import CategorySection from '@/components/home/CategorySection';
import FeaturedProduct from '@/components/home/FeaturedProduct';
import FlashSale from '@/components/home/FlashSale';
import Newsletter from '@/components/home/Newsletter';
import WhyChooseUs from '@/components/home/WhyChooseUs';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <CategorySection />
      <FeaturedProduct />
      <FlashSale />
      <WhyChooseUs />
      <Newsletter />
    </main>
  );
}
