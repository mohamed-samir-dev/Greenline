import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface CartHeaderProps {
  itemCount: number;
}

export default function CartHeader({ itemCount }: CartHeaderProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
        <Link href="/products" className="text-green-600 hover:text-green-700 transition-colors self-start">
          <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">Shopping Cart</h1>
          <div className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold self-start">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </div>
        </div>
      </div>
      <p className="text-gray-600 text-sm sm:text-base">Review your items and proceed to checkout</p>
    </div>
  );
}