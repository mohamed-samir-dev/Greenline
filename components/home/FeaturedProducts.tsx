'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase/firebaseClient';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { Product } from '@/types/product';
import Skeleton from 'react-loading-skeleton';

const bgColors = ['bg-teal-600', 'bg-red-600', 'bg-green-600', 'bg-amber-700'];

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!db) {
          console.error('Database not initialized');
          return;
        }
        
        const q = query(collection(db, 'products'), limit(4));
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(productsData);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <div>
        <h2 className="text-xl sm:text-2xl text-black font-bold mb-4 sm:mb-6">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="bg-green-50 rounded-2xl overflow-hidden shadow-sm">
                <Skeleton height={200} />
                <div className="p-3 sm:p-4">
                  <Skeleton height={20} className="mb-2" />
                  <Skeleton height={16} width="60%" className="mb-3" />
                  <Skeleton height={36} />
                </div>
              </div>
            ))
          ) : (
            products.map((product, index) => (
            <div
              key={product.id}
              className="bg-green-50 rounded-2xl overflow-hidden shadow-sm"
            >
              <div className={`${bgColors[index % bgColors.length]} relative h-48 sm:h-56 lg:h-64`}>
                {product.mainImage && (
                  <Image
                    src={product.mainImage}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">
                  {product.name}
                </h3>
                <p className="text-sm sm:text-md font-bold text-gray-500 mb-3 sm:mb-4">
                  ${product.price}
                </p>
                <button 
                  onClick={() => router.push(`/products/${product.id}`)}
                  className="w-full bg-green-600 cursor-pointer text-white font-medium py-2 px-4 rounded transition-colors text-sm sm:text-base"
                >
                  View Details
                </button>
              </div>
            </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
