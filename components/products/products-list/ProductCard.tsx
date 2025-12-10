import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition h-full flex flex-col">
      <div className="h-80 w-full bg-gray-100 flex items-center justify-center">
        <Image 
          src={product.mainImage || '/images/placeholder-product.png'} 
          alt={product.name} 
          width={400} 
          height={320} 
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/placeholder-product.png';
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-green-700 font-bold text-lg">${product.price}</p>
        <p className="text-sm text-gray-600 mt-1 mb-3">{product.category}</p>
        <div className="flex gap-2">
          <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
            Add to Cart
          </button>
          <Link href={`/products/${product.id}`} className="flex-1">
            <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
              Info
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};