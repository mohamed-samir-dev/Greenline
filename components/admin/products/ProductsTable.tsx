import { Product } from "@/types/product";
import ProductTableRow from "./ProductTableRow";
import { useState, useMemo } from "react";

interface ProductsTableProps {
  products: Product[];
  onDelete: (id: string) => void;
}

export default function ProductsTable({ products, onDelete }: ProductsTableProps) {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.sequentialId - b.sequentialId;
      } else {
        return b.sequentialId - a.sequentialId;
      }
    });
  }, [products, sortOrder]);

  const toggleSort = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-gray-900 font-semibold">
              <button 
                onClick={toggleSort}
                className="flex items-center gap-1 hover:text-blue-600 transition-colors"
              >
                ID
                <span className="text-xs">
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </span>
              </button>
            </th>
            <th className="px-4 py-3 text-left text-gray-900 font-semibold">Image</th>
            <th className="px-4 py-3 text-left text-gray-900 font-semibold">Name</th>
            <th className="px-4 py-3 text-left text-gray-900 font-semibold">Price</th>
            <th className="px-4 py-3 text-left text-gray-900 font-semibold">Category</th>
            <th className="px-4 py-3 text-left text-gray-900 font-semibold">Stock</th>
            <th className="px-4 py-3 text-left text-gray-900 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => (
            <ProductTableRow key={product.id} product={product} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
