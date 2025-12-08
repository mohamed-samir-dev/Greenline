import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full overflow-hidden rounded-lg">
        <Image
          src="/images/hero-leaves.webp"
          alt="Fresh organic green leaves with water droplets"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative h-full flex items-end pb-6 px-6 sm:pb-8 sm:px-8 lg:pb-12 lg:px-12">
          <div className="w-full">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 lg:mb-4">
              New Arrival: Our Premium Organic Mix
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-white mb-4 sm:mb-5 lg:mb-6 max-w-3xl">
              Premium organic fertilizer enriched with natural nutrients for healthier plants and vibrant growth
            </p>
            <Link
              href="/shop"
              className="inline-block bg-green-600 hover:bg-green-900 text-white font-semibold px-6 py-2 sm:px-7 sm:py-2.5 lg:px-8 lg:py-3 rounded transition-colors text-sm sm:text-base"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
