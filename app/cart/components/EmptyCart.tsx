import Link from 'next/link';
import { ShoppingBag, Package } from 'lucide-react';

export default function EmptyCart() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center bg-white rounded-xl shadow-sm p-8">
          <ShoppingBag className="mx-auto h-12 w-12 text-green-600 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Add some products to get started</p>
          <Link
            href="/products"
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <Package className="mr-2 h-4 w-4" />
            Shop Products
          </Link>
        </div>
      </div>
    </div>
  );
}