import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import NavbarSkeleton from './NavbarSkeleton';
import FooterSkeleton from './FooterSkeleton';

export default function HomeSkeleton() {
  return (
    <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb">
      <NavbarSkeleton />
      <main className="bg-white py-8">
        {/* Hero Section Skeleton */}
        <section className="relative h-96 mb-12">
          <Skeleton height={384} className="rounded-lg" />
        </section>

        {/* Categories Section Skeleton */}
        <section className="container mx-auto px-4 mb-12">
          <Skeleton height={32} width={200} className="mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center">
                <Skeleton height={120} className="rounded-lg mb-3" />
                <Skeleton height={20} width="80%" />
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products Skeleton */}
        <section className="container mx-auto px-4 mb-12">
          <Skeleton height={32} width={250} className="mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="border rounded-lg p-4">
                <Skeleton height={200} className="mb-3" />
                <Skeleton height={20} className="mb-2" />
                <Skeleton height={16} width="60%" className="mb-2" />
                <Skeleton height={24} width="40%" />
              </div>
            ))}
          </div>
        </section>

        {/* Banner Skeleton */}
        <section className="container mx-auto px-4 mb-12">
          <Skeleton height={200} className="rounded-lg" />
        </section>

        {/* Features Section Skeleton */}
        <section className="container mx-auto px-4">
          <Skeleton height={32} width={200} className="mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="text-center p-6">
                <Skeleton height={60} width={60} className="mx-auto mb-4 rounded-full" />
                <Skeleton height={20} className="mb-2" />
                <Skeleton height={16} count={2} />
              </div>
            ))}
          </div>
        </section>
      </main>
      <FooterSkeleton />
    </SkeletonTheme>
  );
}