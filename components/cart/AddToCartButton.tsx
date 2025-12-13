"use client";

import { useCartStore } from '@/stores/cartStore';
import { Product, ProductSize } from '@/types/product';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { useRealTimeStock } from '@/hooks/useRealTimeStock';

interface AddToCartButtonProps {
  product: Product;
  selectedSize?: ProductSize;
  className?: string;
  icon?: React.ReactNode;
}

export default function AddToCartButton({ product, selectedSize, className = "", icon }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { product: liveProduct } = useRealTimeStock(product.id);
  
  const currentProduct = liveProduct || product;

  const handleAddToCart = async () => {
    // Auto-select first size if no size selected but product has sizes
    const autoSelectedSize = !selectedSize && currentProduct.sizes && currentProduct.sizes.length > 0 
      ? currentProduct.sizes[0] 
      : selectedSize;
    
    const price = autoSelectedSize ? autoSelectedSize.price : currentProduct.price;
    const size = autoSelectedSize ? autoSelectedSize.size : undefined;
    const liveSize = autoSelectedSize && currentProduct.sizes?.find(s => s.size === autoSelectedSize.size);
    const stockQuantity = liveSize ? liveSize.stockQuantity : currentProduct.stockQuantity;

    if (stockQuantity <= 0) {
      toast.error('This item is out of stock');
      return;
    }

    try {
      await addItem({
        id: currentProduct.id,
        name: currentProduct.name,
        price,
        size,
        image: currentProduct.mainImage,
        stockQuantity
      });

      toast.success('Added to cart!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to add item to cart');
    }
  };

  const autoSelectedSize = !selectedSize && currentProduct.sizes && currentProduct.sizes.length > 0 
    ? currentProduct.sizes[0] 
    : selectedSize;
  const liveSize = autoSelectedSize && currentProduct.sizes?.find(s => s.size === autoSelectedSize.size);
  const isOutOfStock = liveSize ? liveSize.stockQuantity <= 0 : currentProduct.stockQuantity <= 0;

  return (
    <button
      onClick={handleAddToCart}
      disabled={isOutOfStock}
      className={`flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors ${className}`}
    >
      {icon || <ShoppingCart className="h-5 w-5" />}
      {!icon && (isOutOfStock ? 'Out of Stock' : 'Add to Cart')}
    </button>
  );
}