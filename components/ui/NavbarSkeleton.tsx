import Skeleton from 'react-loading-skeleton';

export default function NavbarSkeleton() {
  return (
    <nav className="bg-white relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-linear-to-r after:from-transparent after:via-green-300 after:to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden lg:flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Skeleton height={50} width={200} />
            <div className="flex items-center gap-10">
              <Skeleton height={20} width={80} />
              <Skeleton height={20} width={70} />
              <Skeleton height={20} width={60} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Skeleton height={40} width={256} />
            <Skeleton height={40} width={40} />
            <Skeleton height={40} width={40} />
          </div>
        </div>
        <div className="lg:hidden">
          <div className="flex items-center justify-between h-16">
            <Skeleton height={50} width={200} />
            <div className="flex items-center gap-3">
              <Skeleton height={40} width={40} />
              <Skeleton height={40} width={40} />
            </div>
          </div>
          <div className="pb-4">
            <Skeleton height={40} />
          </div>
        </div>
      </div>
    </nav>
  );
}