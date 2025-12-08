import HeroSection from '@/components/home/HeroSection';
import ShopByCategory from '@/components/home/ShopByCategory';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import SeasonalBanner from '@/components/home/SeasonalBanner';
import FeaturesSection from '@/components/home/FeaturesSection';


export default function Home() {
  return (
    <main className="bg-white py-8">
      <HeroSection />
      <ShopByCategory />
      <FeaturedProducts />
      <SeasonalBanner />
      <FeaturesSection />
    </main>
  );
}
