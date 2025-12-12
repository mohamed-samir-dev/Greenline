"use client";

import { useRealTimeStock } from '@/hooks/useRealTimeStock';
import { ProductSize } from '@/types/product';

interface RealTimeStockDisplayProps {
  productId: string;
  selectedSize?: ProductSize;
  className?: string;
}

export default function RealTimeStockDisplay({ productId, selectedSize, className = "" }: RealTimeStockDisplayProps) {
  const { product, loading } = useRealTimeStock(productId);

  if (loading || !product) return null;

  const liveSize = selectedSize && product.sizes?.find(s => s.size === selectedSize.size);
  const stockQuantity = liveSize ? liveSize.stockQuantity : product.stockQuantity;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`w-2 h-2 rounded-full ${
        stockQuantity > 10 ? 'bg-green-500' : 
        stockQuantity > 0 ? 'bg-yellow-500' : 'bg-red-500'
      }`}></div>
      <span className="text-sm text-gray-600">
        {stockQuantity > 10 ? 'In Stock' : 
         stockQuantity > 0 ? `Only ${stockQuantity} left` : 'Out of Stock'
        }
      </span>
    </div>
  );
}