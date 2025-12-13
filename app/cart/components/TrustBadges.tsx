import { Shield, Truck, Clock } from 'lucide-react';

export default function TrustBadges() {
  return (
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
  );
}