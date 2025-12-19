import Link from 'next/link';
import { CreditCard } from 'lucide-react';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal } from 'react-icons/fa';

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  finalTotal: number;
  savings: number;
  itemCount: number;
  total: number;
}

export default function OrderSummary({ 
  subtotal, 
  shipping, 
  tax, 
  finalTotal, 
  savings, 
  itemCount,
  total 
}: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 sticky top-4 sm:top-8">
      <div className="p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Order Summary</h2>
        
        {/* Summary Details */}
        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          <div className="flex justify-between text-gray-600 text-sm sm:text-base">
            <span>Subtotal ({itemCount} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600 text-sm sm:text-base">
            <span>Shipping</span>
            <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
              {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between text-gray-600 text-sm sm:text-base">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          {savings > 0 && (
            <div className="flex justify-between text-green-600 font-semibold text-sm sm:text-base">
              <span>You Save</span>
              <span>-${savings.toFixed(2)}</span>
            </div>
          )}
          <div className="border-t border-gray-200 pt-3 sm:pt-4">
            <div className="flex justify-between text-lg sm:text-xl font-bold text-gray-900">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Free Shipping Progress */}
        {shipping > 0 && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 rounded-lg sm:rounded-xl border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-medium text-green-800">Free Shipping Progress</span>
              <span className="text-xs sm:text-sm text-green-600">${(50 - total).toFixed(2)} to go</span>
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
          <button className="w-full bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center text-sm sm:text-base">
            <CreditCard className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Proceed to Checkout
          </button>
          <Link
            href="/products"
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl text-center transition-colors block text-sm sm:text-base"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Payment Methods */}
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
          <p className="text-xs sm:text-sm text-gray-600 text-center mb-3">We accept</p>
          <div className="flex justify-center items-center space-x-3 sm:space-x-4">
            <FaCcVisa className="h-6 w-8 sm:h-8 sm:w-12 text-blue-600" />
            <FaCcMastercard className="h-6 w-8 sm:h-8 sm:w-12 text-red-500" />
            <FaCcAmex className="h-6 w-8 sm:h-8 sm:w-12 text-blue-500" />
            <FaCcPaypal className="h-6 w-8 sm:h-8 sm:w-12 text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
}