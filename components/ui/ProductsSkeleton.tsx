import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import NavbarSkeleton from './NavbarSkeleton';
import FooterSkeleton from './FooterSkeleton';

export default function ProductsSkeleton() {
  return (
    <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb">
      <NavbarSkeleton />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Filters Sidebar Skeleton */}
            <aside className="w-64 space-y-6">
              <div>
                <Skeleton height={24} width={100} className="mb-3" />
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton height={16} width={16} />
                      <Skeleton height={16} width={80} />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Skeleton height={24} width={80} className="mb-3" />
                <Skeleton height={40} className="mb-2" />
              </div>
              <div>
                <Skeleton height={24} width={90} className="mb-3" />
                <Skeleton height={32} className="mb-2" />
              </div>
            </aside>

            {/* Main Content Skeleton */}
            <main className="flex-1">
              {/* Header Skeleton */}
              <div className="flex justify-between items-center mb-6">
                <Skeleton height={24} width={150} />
                <Skeleton height={40} width={120} />
              </div>

              {/* Products Grid Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <Skeleton height={200} className="mb-3" />
                    <Skeleton height={20} className="mb-2" />
                    <Skeleton height={16} width="60%" className="mb-2" />
                    <Skeleton height={24} width="40%" className="mb-3" />
                    <Skeleton height={36} />
                  </div>
                ))}
              </div>

              {/* Pagination Skeleton */}
              <div className="flex justify-center">
                <div className="flex gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} height={36} width={36} />
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <FooterSkeleton />
    </SkeletonTheme>
  );
}