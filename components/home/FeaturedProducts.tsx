'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { db } from '@/lib/firebase/firebaseClient';
import { collection, getDocs, query } from 'firebase/firestore';
import { Product } from '@/types/product';

const bgColors = ['bg-teal-600', 'bg-red-600', 'bg-green-600', 'bg-amber-700'];

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, 'products'));
      const querySnapshot = await getDocs(q);
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(productsData);
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl text-black font-bold mb-6">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="bg-green-50 rounded-2xl overflow-hidden shadow-sm"
            >
              <div className={`${bgColors[index % bgColors.length]} relative h-64`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-md font-bold text-gray-500 mb-4">
                  ${product.price}
                </p>
                <button className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-4 rounded transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
