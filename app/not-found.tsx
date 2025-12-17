'use client';

import Link from 'next/link';
import { Home, ShoppingBag, Sprout } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-green-200 relative overflow-hidden flex items-center justify-center px-4">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-green-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-green-300/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Glowing 404 */}
        <div className="mb-8">
          <h1 className="text-9xl font-black text-transparent bg-linear-to-r from-green-600 via-green-700 to-green-800 bg-clip-text animate-pulse">
            404
          </h1>
          <div className="flex justify-center mt-4">
            <Sprout className="w-12 h-12 text-green-700 animate-bounce" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-green-800 mb-4">
          Lost in the Digital Garden
        </h2>
        
        <p className="text-green-700 mb-8 text-lg leading-relaxed">
          Oops! It looks like this page has grown away from our garden. The seeds you&apos;re looking for might have been planted elsewhere or moved to a new location.
        </p>

        {/* Quick suggestions */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-green-300/30">
          <h3 className="text-lg font-semibold text-green-800 mb-4">What you can do:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
              <span>Check the URL for typos</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
              <span>Browse our product categories</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
              <span>Return to homepage</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
              <span>Contact our support team</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link 
            href="/"
            className="group relative px-8 py-4 bg-linear-to-r from-green-700 to-green-800 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-600/25"
          >
            <div className="absolute inset-0 bg-linear-to-r from-green-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </div>
          </Link>
          
          <Link 
            href="/products"
            className="group relative px-8 py-4 bg-white border border-green-600/30 text-green-700 font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:border-green-700 hover:shadow-xl hover:shadow-green-600/20"
          >
            <div className="absolute inset-0 bg-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Browse Products
            </div>
          </Link>
        </div>

        {/* Popular categories */}
        <div className="text-center">
          <p className="text-green-600 text-sm mb-3">Or explore our popular categories:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link href="/products" className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs hover:bg-green-200 transition-colors">
              Organic Fertilizers
            </Link>
            <Link href="/products" className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs hover:bg-green-200 transition-colors">
              Liquid Concentrates
            </Link>
            <Link href="/products" className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs hover:bg-green-200 transition-colors">
              Chemical Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}