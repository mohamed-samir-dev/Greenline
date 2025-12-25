import type { Metadata } from 'next';
import ProductsPageContent from './ProductsPageContent';

export const metadata: Metadata = {
  title: 'Premium Fertilizers & Plant Nutrition Products',
  description: 'Browse our extensive collection of organic fertilizers, chemical formulas, liquid concentrates, and granular products. Find the perfect nutrition solution for your crops.',
  keywords: ['fertilizers', 'organic fertilizers', 'liquid fertilizers', 'granular fertilizers', 'plant nutrition', 'crop fertilizers', 'agricultural products'],
  openGraph: {
    title: 'Premium Fertilizers & Plant Nutrition Products | Greenline',
    description: 'Browse our extensive collection of premium fertilizers and plant nutrition products for optimal crop growth.',
    images: ['/images/logo.png'],
  },
  alternates: {
    canonical: '/products',
  },
};

export default function ProductsPage() {
  return <ProductsPageContent />;
}

