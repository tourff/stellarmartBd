// Instead of @/components use relative path
import HeroSection from '@/components/home/HeroSection';
import CategorySection from '@/components/home/CategorySection';
import FeaturedProduct from '@/app/components/home/FeaturedProduct';
import FlashSale from '@/app/components/home/FlashSale';
import Newsletter from '@/app/components/home/Newsletter';
import WhyChooseUs from '@/app/components/home/WhyChooseUs';

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
