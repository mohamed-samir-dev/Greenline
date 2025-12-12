import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebaseClient';
import { Product } from '@/types/product';

export const useRealTimeStock = (productId: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    const unsubscribe = onSnapshot(
      doc(db, 'products', productId),
      (doc) => {
        if (doc.exists()) {
          setProduct({ id: doc.id, ...doc.data() } as Product);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error listening to product:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [productId]);

  return { product, loading };
};