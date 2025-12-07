"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Search, User, ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  if (pathname?.startsWith('/admin')) return null;
return (
    <nav className="bg-white border-b-2 border-green-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center">
              <Image src="/images/logo.png" alt="Green Line Logo" width={200} height={100} className="object-contain" />
            </Link>
            <div className="hidden md:flex items-center gap-10">
              <Link href="/shop" className="text-base text-black text-bold">Shop by Category</Link>
              <Link href="/about" className="text-base text-black text-bold ">About Us</Link>
              <Link href="/contact" className="text-base text-black text-bold">Contact</Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-green-200 border-0 rounded px-4 py-2 pl-10 w-64 text-black  focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button className="p-2 bg-green-200 rounded hover:bg-green-100">
              <User className="h-5 w-5 text-gray-700" />
            </button>
            <button className="p-2 bg-green-200 rounded hover:bg-green-100">
              <ShoppingCart className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
