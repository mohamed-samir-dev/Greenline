"use client";

import { useCartStore } from '@/stores/cartStore';
import { useState, useEffect } from 'react';
import CartSkeleton from '@/components/ui/CartSkeleton';
import EmptyCart from './components/EmptyCart';
import CartHeader from './components/CartHeader';
import TrustBadges from './components/TrustBadges';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';

export default function CartPage() {
  const { items, total, updateQuantity, removeItem, clearCart } = useCartStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.resolve().then(() => setLoading(false));
  }, []);

  if (loading) {
    return <CartSkeleton />;
  }

  const subtotal = total;
  const shipping = total > 50 ? 0 : 9.99;
  const tax = total * 0.08;
  const finalTotal = subtotal + shipping + tax;
  const savings = items.reduce((acc, item) => acc + (item.quantity * 2.5), 0);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <CartHeader itemCount={items.length} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <TrustBadges />

            {/* Cart Items List */}
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem
                  key={`${item.id}-${item.size || 'default'}`}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={removeItem}
                />
              ))}
            </div>

            {/* Clear Cart */}
            <div className="flex justify-center">
              <button
                onClick={async () => {
                  try {
                    await clearCart();
                  } catch (error) {
                    console.error('Failed to clear cart:', error);
                  }
                }}
                className="text-red-600 hover:text-red-700 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                Clear All Items
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              finalTotal={finalTotal}
              savings={savings}
              itemCount={itemCount}
              total={total}
            />
          </div>
        </div>
      </div>
    </div>
  );
}