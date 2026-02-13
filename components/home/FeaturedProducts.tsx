import { adminDb } from '@/lib/firebase/firebaseAdmin';
import { Product } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';

const bgColors = ['bg-teal-600', 'bg-red-600', 'bg-green-600', 'bg-amber-700'];

async function getProducts() {
  try {
    const snapshot = await adminDb.collection('products').limit(4).get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  } catch {
    return [];
  }
}

export default async function FeaturedProducts() {
  const products = await getProducts();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <div>
        <h2 className="text-xl sm:text-2xl text-black font-bold mb-4 sm:mb-6">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product, index) => (
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
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                    loading="lazy"
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
                <Link 
                  href={`/products/${product.id}`}
                  className="block w-full bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-4 rounded transition-colors text-sm sm:text-base text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
