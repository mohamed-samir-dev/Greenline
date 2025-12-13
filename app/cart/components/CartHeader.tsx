import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface CartHeaderProps {
  itemCount: number;
}

export default function CartHeader({ itemCount }: CartHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-4">
        <Link href="/products" className="text-green-600 hover:text-green-700 transition-colors">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </div>
      </div>
      <p className="text-gray-600">Review your items and proceed to checkout</p>
    </div>
  );
}