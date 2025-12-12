"use client";

import { useCartStore } from '@/stores/cartStore';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface CartIconProps {
  className?: string;
}

export default function CartIcon({ className = "" }: CartIconProps) {
  const itemCount = useCartStore((state) => state.itemCount);

  return (
    <Link href="/cart" className={`relative ${className}`}>
      <ShoppingCart className="h-5 w-5 text-gray-700" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  );
}