"use client";

import { useCartStore } from '@/stores/cartStore';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, Heart, Shield, Truck, CreditCard, ArrowLeft, Package, Star, Clock } from 'lucide-react';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import CartSkeleton from '@/components/ui/CartSkeleton';

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
  const savings = items.reduce((acc, item) => acc + (item.quantity * 2.5), 0); // Mock savings

  if (items.length === 0) {
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

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/products" className="text-green-600 hover:text-green-700 transition-colors">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </div>
          </div>
          <p className="text-gray-600">Review your items and proceed to checkout</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trust Badges */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <Shield className="h-8 w-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Secure Payment</span>
                  <span className="text-xs text-gray-500">SSL Protected</span>
                </div>
                <div className="flex flex-col items-center">
                  <Truck className="h-8 w-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Free Shipping</span>
                  <span className="text-xs text-gray-500">Orders over $50</span>
                </div>
                <div className="flex flex-col items-center">
                  <Clock className="h-8 w-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Fast Delivery</span>
                  <span className="text-xs text-gray-500">2-3 business days</span>
                </div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.size || 'default'}`} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
                  <div className="p-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="relative w-32 h-32 shrink-0 bg-linear-to-br from-green-50 to-gray-50 rounded-xl overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <button className="bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm hover:bg-white transition-colors">
                            <Heart className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">(4.8)</span>
                            </div>
                            {item.size && (
                              <div className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                                Size: {item.size}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={async () => {
                              try {
                                await removeItem(item.id, item.size);
                              } catch (error) {
                                console.error('Failed to remove item:', error);
                              }
                            }}
                            className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>

                        {/* Stock Status */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className={`w-2 h-2 rounded-full ${
                            item.stockQuantity > 10 ? 'bg-green-500' : 
                            item.stockQuantity > 0 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                          <span className="text-sm text-gray-600">
                            {item.stockQuantity > 10 ? 'In Stock' : 
                             item.stockQuantity > 0 ? `Only ${item.stockQuantity} left` : 'Out of Stock'
                            }
                          </span>
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200">
                              <button
                                onClick={async () => {
                                  try {
                                    await updateQuantity(item.id, item.quantity - 1, item.size);
                                  } catch (error) {
                                    console.error('Failed to update quantity:', error);
                                  }
                                }}
                                className="p-3 hover:bg-gray-100 transition-colors rounded-l-xl"
                              >
                                <Minus className="h-4 w-4 text-gray-600" />
                              </button>
                              <span className="px-4 py-3 font-semibold text-gray-900 min-w-12 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={async () => {
                                  try {
                                    await updateQuantity(item.id, item.quantity + 1, item.size);
                                  } catch (error) {
                                    console.error('Failed to update quantity:', error);
                                    // Show user-friendly error message
                                  }
                                }}
                                className="p-3 hover:bg-gray-100 transition-colors rounded-r-xl"
                                disabled={item.quantity >= item.stockQuantity}
                              >
                                <Plus className="h-4 w-4 text-gray-600" />
                              </button>
                            </div>
                            <div className="text-sm text-gray-500">
                              ${item.price.toFixed(2)} each
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-sm text-green-600 font-medium">
                              Save ${(item.quantity * 2.5).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 sticky top-8">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                {/* Summary Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-green-600 font-semibold">
                      <span>You Save</span>
                      <span>-${savings.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Free Shipping Progress */}
                {shipping > 0 && (
                  <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-green-800">Free Shipping Progress</span>
                      <span className="text-sm text-green-600">${(50 - total).toFixed(2)} to go</span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((total / 50) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Proceed to Checkout
                  </button>
                  <Link
                    href="/products"
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 px-6 rounded-xl text-center transition-colors block"
                  >
                    Continue Shopping
                  </Link>
                </div>

                {/* Payment Methods */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 text-center mb-3">We accept</p>
                  <div className="flex justify-center items-center space-x-4">
                    <FaCcVisa className="h-8 w-12 text-blue-600" />
                    <FaCcMastercard className="h-8 w-12 text-red-500" />
                    <FaCcAmex className="h-8 w-12 text-blue-500" />
                    <FaCcPaypal className="h-8 w-12 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}