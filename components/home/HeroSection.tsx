import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative h-[500px] w-full overflow-hidden rounded-lg">
        <Image
          src="/images/hero-leaves.webp"
          alt="Fresh organic green leaves with water droplets"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative h-full flex items-end pb-12 px-12">
          <div className="w-full">
            <h1 className="text-5xl  font-bold text-white mb-4">
              New Arrival: Our Premium Organic Mix
            </h1>
            <p className="text-lg text-white mb-6 max-w-3xl">
              Premium organic fertilizer enriched with natural nutrients for healthier plants and vibrant growth
            </p>
            <Link
              href="/shop"
              className="inline-block bg-green-800 hover:bg-green-900 text-white font-semibold px-8 py-3 rounded transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
