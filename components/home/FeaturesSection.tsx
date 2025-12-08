import { Beaker, Truck, ThumbsUp } from 'lucide-react';

export default function FeaturesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 relative before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-green-300 before:to-transparent after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-green-300 after:to-transparent">
        <div className="flex flex-col items-center text-center">
          <Beaker className="w-12 h-12 text-green-600 mb-4" strokeWidth={1.5} />
          <h3 className="font-semibold text-gray-900 mb-2">Expert Recommended</h3>
          <p className="text-gray-600 text-sm">Formulated by plant scientists for optimal growth.</p>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <Truck className="w-12 h-12 text-green-600 mb-4" strokeWidth={1.5} />
          <h3 className="font-semibold text-gray-900 mb-2">Fast Shipping</h3>
          <p className="text-gray-600 text-sm">Get your order delivered to your door in days.</p>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <ThumbsUp className="w-12 h-12 text-green-600 mb-4" strokeWidth={1.5} />
          <h3 className="font-semibold text-gray-900 mb-2">Satisfaction Guaranteed</h3>
          <p className="text-gray-600 text-sm">Love our products or your money back, no questions asked.</p>
        </div>
      </div>
    </section>
  );
}
