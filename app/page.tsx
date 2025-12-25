import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import ShopByCategory from '@/components/home/ShopByCategory';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import SeasonalBanner from '@/components/home/SeasonalBanner';
import FeaturesSection from '@/components/home/FeaturesSection';

export const metadata: Metadata = {
  title: 'Greenline - Premium Fertilizer E-Commerce Platform',
  description: 'Premium agricultural fertilizers and plant nutrition products. Organic fertilizers, chemical formulas, liquid concentrates, and granular products for sustainable agriculture and optimal crop growth.',
  keywords: ['fertilizers', 'agriculture', 'organic fertilizers', 'plant nutrition', 'farming', 'crop nutrition', 'sustainable agriculture', 'liquid fertilizers', 'granular fertilizers', 'chemical fertilizers'],
  openGraph: {
    title: 'Greenline - Premium Fertilizer E-Commerce Platform',
    description: 'Premium agricultural fertilizers and plant nutrition products for sustainable agriculture and optimal crop growth.',
    images: ['/images/logo.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Greenline - Premium Fertilizer E-Commerce Platform',
    description: 'Premium agricultural fertilizers and plant nutrition products for sustainable agriculture.',
    images: ['/images/logo.png'],
  },
  alternates: {
    canonical: '/',
  },
};


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
