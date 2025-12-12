"use client";

import { useCartStore } from '@/stores/cartStore';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';

interface MiniCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MiniCart({ isOpen, onClose }: MiniCartProps) {
  const { items, total, removeItem } = useCartStore();

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Shopping Cart</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="p-3 text-center text-gray-500 text-sm">
          Cart is empty
        </div>
      ) : (
        <>
          <div className="max-h-64 overflow-y-auto">
            {items.slice(0, 3).map((item) => (
              <div key={`${item.id}-${item.size || 'default'}`} className="p-4 border-b border-gray-100 flex items-center gap-3">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                  {item.size && <p className="text-xs text-gray-500">{item.size}</p>}
                  <p className="text-sm text-gray-600">{item.quantity} × ${item.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={async () => {
                    try {
                      await removeItem(item.id, item.size);
                    } catch (error) {
                      console.error('Failed to remove item:', error);
                    }
                  }}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            {items.length > 3 && (
              <div className="p-2 text-center text-sm text-gray-500">
                +{items.length - 3} more items
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-gray-900">Total: ${total.toFixed(2)}</span>
            </div>
            <Link
              href="/cart"
              onClick={onClose}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg text-center block transition-colors"
            >
              View Cart
            </Link>
          </div>
        </>
      )}
    </div>
  );
}