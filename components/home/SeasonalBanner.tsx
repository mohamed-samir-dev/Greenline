import Image from 'next/image';
import Link from 'next/link';

export default function SeasonalBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
        <Image
          src="/images/tulips-banner.webp"
          alt="Spring tulips field"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative h-full flex items-center justify-between px-12">
          <div className="text-white max-w-md">
            <h2 className="text-4xl font-bold mb-3">Spring Growth Boosters</h2>
            <p className="text-lg mb-6">Save on premium fertilizers for your spring garden. Get up to 30% off on selected products.</p>
          </div>
          <Link
            href="/products?category=fertilizers"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Shop Seasonal Offers
          </Link>
        </div>
      </div>
    </section>
  );
}
