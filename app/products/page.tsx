'use client';

import { useState } from 'react';

export default function ProductsPage() {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const products = [
    { id: 1, name: 'All-Purpose Plant Food', price: 12.99, type: 'Synthetic' },
    { id: 2, name: 'Rose & Flower Fertilizer', price: 15.49, type: 'Organic' },
    { id: 3, name: 'Lawn Starter Mix', price: 24.99, type: 'Synthetic' },
    { id: 4, name: 'Organic Vegetable Growth', price: 18.99, type: 'Organic' },
    { id: 5, name: 'Citrus Tree Fertilizer', price: 16.99, type: 'Liquid' },
    { id: 6, name: 'Indoor Plant Nutrient', price: 11.99, type: 'Liquid' },
    { id: 7, name: 'Tomato & Pepper Boost', price: 14.99, type: 'Organic' },
    { id: 8, name: 'Orchid Bloom Fertilizer', price: 13.49, type: 'Liquid' },
  ];

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const filteredProducts = products.filter(p => {
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(p.type);
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesPrice && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-gray-500 p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Filter By</h2>
              
              <div className="mb-6">
                <h3 className="font-medium mb-3">Type</h3>
                {['Organic', 'Synthetic', 'Liquid'].map(type => (
                  <label key={type} className="flex items-center mb-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleType(type)}
                      className="mr-2"
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>

              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="text-sm text-gray-600 mt-2">
                  ${priceRange[0]} - ${priceRange[1]}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border rounded-lg w-96"
              />
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Cart (0)
              </button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="border rounded-lg p-4 hover:shadow-lg transition">
                  <div className="bg-gray-100 h-48 rounded mb-4 flex items-center justify-center text-gray-500">
                    Image from Firebase
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-green-700 font-bold text-lg">${product.price}</p>
                  <button className="w-full mt-3 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
