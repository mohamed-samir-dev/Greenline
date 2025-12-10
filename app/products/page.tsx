'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase/firebaseClient';
import { collection, getDocs } from 'firebase/firestore';
import { Product } from '@/types/product';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCrop, setSelectedCrop] = useState('All Crops');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, 'products'));
      const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(productsData);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const crops = ['All Crops', ...new Set(products.map(p => p.category))];
  const types = ['Organic', 'Synthetic', 'Liquid'];

  const toggleType = (type: string) => {
    setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  const filteredProducts = products.filter(p => {
    const matchesCrop = selectedCrop === 'All Crops' || p.category === selectedCrop;
    const matchesType = selectedTypes.length === 0 || selectedTypes.some(t => p.name.toLowerCase().includes(t.toLowerCase()));
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return matchesCrop && matchesType && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const handleApply = () => {
    // Filters are already applied in real-time
  };

  const handleReset = () => {
    setPriceRange([0, 100]);
    setSelectedCrop('All Crops');
    setSelectedTypes([]);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className="w-72 flex-shrink-0">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Filter By</h2>
              
              {/* Type Checkboxes */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Type</h3>
                {types.map(type => (
                  <label key={type} className="flex items-center mb-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleType(type)}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="ml-2 text-gray-700">{type}</span>
                  </label>
                ))}
              </div>

              {/* Crop Dropdown */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Crop</label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {crops.map(crop => (
                    <option key={crop} value={crop}>{crop}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Price Range</h3>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-600 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-green-600 [&::-moz-range-thumb]:border-0"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-3">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}+</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleApply}
                  className="flex-1 bg-green-600 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Apply
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 bg-white text-gray-700 font-medium py-2.5 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Breadcrumb and Sort */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm">
                <Link href="/" className="text-green-600 hover:text-green-700">Home</Link>
                <span className="mx-2 text-green-600">/</span>
                <Link href="/products" className="text-green-600 hover:text-green-700">Products</Link>
                <span className="mx-2 text-green-600">/</span>
                <span className="text-gray-900">Fertilizers</span>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Fertilizers</h2>

            {/* Product Grid */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {filteredProducts.map(product => (
                <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition h-full flex flex-col">
                  <div className="h-80 w-full bg-gray-100 flex items-center justify-center">
                    <Image 
                      src={product.mainImage || '/images/placeholder-product.png'} 
                      alt={product.name} 
                      width={400} 
                      height={320} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder-product.png';
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-green-700 font-bold text-lg">${product.price}</p>
                    <p className="text-sm text-gray-600 mt-1 mb-3">{product.category}</p>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                        Add to Cart
                      </button>
                      <Link href={`/products/${product.id}`} className="flex-1">
                        <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                          Info
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-8">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">Previous</button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg">1</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">2</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">3</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">4</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">Next</button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
