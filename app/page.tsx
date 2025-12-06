import HeroSection from '@/components/home/HeroSection';
import ShopByCategory from '@/components/home/ShopByCategory';

export default function Home() {
  return (
    <main className="bg-white py-8">
      <HeroSection />
      <ShopByCategory />
    </main>
  );
}
