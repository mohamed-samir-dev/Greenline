import Image from 'next/image';
import categories from '@/app/data/categories';

export default function ShopByCategory() {
  return (
    <section className="max-w-7xl mx-auto  sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl text-black font-bold mb-6">Shop by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div key={category.title} className="bg-white  rounded-lg overflow-hidden">
            <div className="relative h-80 w-full">
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="p-4 text-left">
              <h3 className="font-semibold text-lg  text-black">{category.title}</h3>
              <p className="text-sm text-gray-500">{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
