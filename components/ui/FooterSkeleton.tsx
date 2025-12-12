import Skeleton from 'react-loading-skeleton';

export default function FooterSkeleton() {
  return (
    <footer className="bg-green-100 py-8 sm:py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <Skeleton height={24} width={120} className="mb-3" />
              <div className="space-y-2">
                <Skeleton height={16} />
                <Skeleton height={16} width="80%" />
                <Skeleton height={16} width="90%" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-300 text-center">
          <Skeleton height={16} width={200} />
        </div>
      </div>
    </footer>
  );
}