import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import NavbarSkeleton from './NavbarSkeleton';
import FooterSkeleton from './FooterSkeleton';

export default function CartSkeleton() {
  return (
    <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb">
      <NavbarSkeleton />
      <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Skeleton height={24} width={24} />
              <Skeleton height={36} width={200} />
              <Skeleton height={24} width={60} />
            </div>
            <Skeleton height={16} width={300} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Skeleton */}
            <div className="lg:col-span-2 space-y-6">
              {/* Trust Badges Skeleton */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <Skeleton height={32} width={32} className="mb-2" />
                      <Skeleton height={16} width={80} />
                      <Skeleton height={12} width={60} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Cart Items List Skeleton */}
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex gap-6">
                      <Skeleton height={128} width={128} className="rounded-xl" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <Skeleton height={24} width={200} className="mb-1" />
                            <Skeleton height={16} width={100} className="mb-2" />
                            <Skeleton height={20} width={80} />
                          </div>
                          <Skeleton height={20} width={20} />
                        </div>
                        <Skeleton height={16} width={120} className="mb-4" />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Skeleton height={48} width={120} />
                            <Skeleton height={16} width={80} />
                          </div>
                          <div className="text-right">
                            <Skeleton height={32} width={80} />
                            <Skeleton height={16} width={60} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart Button Skeleton */}
              <div className="flex justify-center">
                <Skeleton height={40} width={120} />
              </div>
            </div>

            {/* Order Summary Skeleton */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <Skeleton height={32} width={150} className="mb-6" />
                
                <div className="space-y-4 mb-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex justify-between">
                      <Skeleton height={16} width={100} />
                      <Skeleton height={16} width={60} />
                    </div>
                  ))}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <Skeleton height={24} width={60} />
                      <Skeleton height={24} width={80} />
                    </div>
                  </div>
                </div>

                <Skeleton height={16} width="100%" className="mb-6" />

                <div className="space-y-3">
                  <Skeleton height={56} />
                  <Skeleton height={56} />
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Skeleton height={16} width={80} className="mx-auto mb-3" />
                  <div className="flex justify-center space-x-4">
                    {[...Array(4)].map((_, i) => (
                      <Skeleton key={i} height={32} width={48} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterSkeleton />
    </SkeletonTheme>
  );
}