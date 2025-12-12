import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import NavbarSkeleton from './NavbarSkeleton';
import FooterSkeleton from './FooterSkeleton';

export default function ProductDetailSkeleton() {
  return (
    <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb">
      <NavbarSkeleton />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb Skeleton */}
          <div className="mb-6">
            <Skeleton height={16} width={200} />
          </div>

          <div className="grid grid-cols-2 gap-12 mb-12">
            {/* Left: Image Gallery Skeleton */}
            <div>
              <Skeleton height={600} className="rounded-lg mb-4" />
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} height={80} width={80} className="rounded" />
                ))}
              </div>
            </div>

            {/* Right: Product Info Skeleton */}
            <div>
              <Skeleton height={36} className="mb-4" />
              <Skeleton height={20} count={2} className="mb-6" />
              <Skeleton height={48} width={120} className="mb-3" />
              <Skeleton height={16} width={150} className="mb-6" />
              
              {/* Size Options Skeleton */}
              <div className="mb-6">
                <Skeleton height={16} width={40} className="mb-2" />
                <div className="flex gap-3">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} height={40} width={80} />
                  ))}
                </div>
              </div>

              {/* Add to Cart Skeleton */}
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <Skeleton height={48} className="flex-1" />
                  <Skeleton height={48} width={48} />
                </div>
              </div>

              {/* Badges Skeleton */}
              <div className="flex gap-4">
                <Skeleton height={20} width={120} />
                <Skeleton height={20} width={140} />
              </div>
            </div>
          </div>

          {/* Tabs Section Skeleton */}
          <div>
            <div className="flex gap-6 mb-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} height={40} width={100} />
              ))}
            </div>
            <div className="space-y-4">
              <Skeleton height={20} />
              <Skeleton height={20} width="90%" />
              <Skeleton height={20} width="80%" />
              <Skeleton height={100} />
            </div>
          </div>
        </div>
      </div>
      <FooterSkeleton />
    </SkeletonTheme>
  );
}