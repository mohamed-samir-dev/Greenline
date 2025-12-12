"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Search, User, Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import CartIcon from '@/components/cart/CartIcon';
import MiniCart from '@/components/cart/MiniCart';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  
  // Prefetch products page on mount
  useEffect(() => {
    router.prefetch('/products');
  }, [router]);
  
  if (pathname?.startsWith('/admin')) return null;

  return (
    <nav className="bg-white relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-linear-to-r after:from-transparent after:via-green-300 after:to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center">
              <Image src="/images/logo.png" alt="Green Line Logo" width={200} height={100} className="object-contain" />
            </Link>
            <div className="flex items-center gap-10">
              <Link href="/products" prefetch={true} className="text-base text-black font-semibold hover:text-green-600 transition-colors">Products</Link>
              <Link href="/about" className="text-base text-black font-semibold hover:text-green-600 transition-colors">About Us</Link>
              <Link href="/contact" className="text-base text-black font-semibold hover:text-green-600 transition-colors">Contact</Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-green-200 border-0 rounded px-4 py-2 pl-10 w-64 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button className="p-2 bg-green-200 rounded hover:bg-green-100">
              <User className="h-5 w-5 text-gray-700" />
            </button>
            <div className="relative">
              <button 
                onClick={() => setIsMiniCartOpen(!isMiniCartOpen)}
                className="p-2 bg-green-200 rounded hover:bg-green-100"
              >
                <CartIcon />
              </button>
              <MiniCart 
                isOpen={isMiniCartOpen} 
                onClose={() => setIsMiniCartOpen(false)} 
              />
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <Image src="/images/logo.png" alt="Green Line Logo" width={200} height={100} className="object-contain" />
            </Link>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 bg-green-200 rounded hover:bg-green-100"
                aria-label="Menu"
              >
                {isMenuOpen ? <X className="h-5 w-5 text-gray-700" /> : <Menu className="h-5 w-5 text-gray-700" />}
              </button>
              <CartIcon className="p-2 bg-green-200 rounded hover:bg-green-100" />
            </div>
          </div>
          <div className="pb-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-green-200 border-0 rounded px-4 py-2 pl-10 w-full text-black focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50 border-t border-green-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-base text-black font-semibold hover:text-green-600 py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/products" prefetch={true} className="text-base text-black font-semibold hover:text-green-600 py-2" onClick={() => setIsMenuOpen(false)}>Products</Link>
              <Link href="/about" className="text-base text-black font-semibold hover:text-green-600 py-2" onClick={() => setIsMenuOpen(false)}>About Us</Link>
              <Link href="/contact" className="text-base text-black font-semibold hover:text-green-600 py-2" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <Link href="/account" className="text-base text-black font-semibold hover:text-green-600 py-2 border-t border-green-100 pt-4" onClick={() => setIsMenuOpen(false)}>My Account</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
