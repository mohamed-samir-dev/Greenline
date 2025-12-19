import Link from 'next/link';
import { Search } from 'lucide-react';
import { useSearch } from '@/contexts';

interface ProductHeaderProps {
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

export const ProductHeader = ({ sortBy, onSortChange }: ProductHeaderProps) => {
  const { searchQuery, setSearchQuery } = useSearch();
  return (
    <>
      {/* Breadcrumb and Sort */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-4 gap-4">
        <div className="text-sm order-2 lg:order-1">
          <Link href="/" className="text-green-600 hover:text-green-700">Home</Link>
          <span className="mx-2 text-green-600">/</span>
          <Link href="/products" className="text-green-600 hover:text-green-700">Products</Link>
          <span className="mx-2 text-green-600">/</span>
          <span className="text-gray-900">Fertilizers</span>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 order-1 lg:order-2">
          <div className="relative flex-1 sm:flex-none">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-green-100 border-0 rounded px-4 py-2 pl-10 w-full sm:w-64 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="text-sm text-gray-700 whitespace-nowrap hidden sm:block">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto min-w-0"
            >
              <option value="default">Sort by Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Fertilizers</h2>
    </>
  );
};