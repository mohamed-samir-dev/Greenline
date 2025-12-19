import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';
import AddToCartButton from '@/components/cart/AddToCartButton';
import { useProductReviews } from '@/hooks/useProductReviews';
import RealTimeStockDisplay from '@/components/products/RealTimeStockDisplay';
import { Star, Eye, Tag, Package } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { averageRating, totalReviews } = useProductReviews(product.id);
  const hasDiscount = product.sizes && product.sizes.length > 0;
  const lowestPrice = hasDiscount ? Math.min(...product.sizes!.map(s => s.price)) : product.price;
  const isOnSale = hasDiscount && lowestPrice < product.price;

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
      {/* Image Container */}
      <div className="relative h-48 sm:h-56 overflow-hidden bg-linear-to-br from-green-50 to-gray-50">
        {isOnSale && (
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Sale
          </div>
        )}
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link href={`/products/${product.id}`}>
            <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors">
              <Eye className="h-4 w-4 text-gray-700" />
            </button>
          </Link>
        </div>
        <Image 
          src={product.mainImage || '/images/placeholder-product.png'} 
          alt={product.name} 
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/placeholder-product.png';
          }}
        />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
            <Tag className="h-3 w-3" />
            {product.category}
          </div>
          {product.inStock && (
            <div className="flex items-center gap-1 text-green-600 text-xs">
              <Package className="h-3 w-3" />
              <span className="hidden sm:inline">In Stock</span>
            </div>
          )}
        </div>

        {/* Product Name */}
        <h3 className="font-bold text-gray-900 mb-2 text-base sm:text-lg leading-tight line-clamp-2 group-hover:text-green-700 transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 sm:mb-4 line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3 sm:mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-3 sm:h-4 w-3 sm:w-4 ${i < Math.floor(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
          ))}
          <span className="text-xs sm:text-sm text-gray-500 ml-1">({averageRating > 0 ? averageRating.toFixed(1) : 'No reviews'})</span>
        </div>

        {/* Price Section */}
        <div className="mb-3 sm:mb-4">
          {isOnSale ? (
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold text-green-600">${lowestPrice.toFixed(2)}</span>
              <span className="text-base sm:text-lg text-gray-400 line-through">${product.price.toFixed(2)}</span>
            </div>
          ) : (
            <span className="text-xl sm:text-2xl font-bold text-green-600">${product.price.toFixed(2)}</span>
          )}
          {hasDiscount && (
            <p className="text-xs text-gray-500 mt-1">Starting from ${lowestPrice.toFixed(2)}</p>
          )}
        </div>

        {/* Stock Info */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <RealTimeStockDisplay productId={product.id} className="text-xs" />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          <AddToCartButton 
            product={product}
            className="flex-1 py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold"
          />
          <Link href={`/products/${product.id}`} className="flex-shrink-0">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 sm:p-3 rounded-lg transition-colors">
              <Eye className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};