'use client';

import { useProductsData } from '@/hooks/useProductsData';
import { useProductFilters } from '@/hooks/useProductFilters';
import {
  ProductFilters,
  ProductGrid,
  ProductHeader,
  ProductPagination
} from '@/components/products/products-list';

export default function ProductsPage() {
  const { products, loading } = useProductsData();
  const {
    priceRange,
    setPriceRange,
    selectedCrop,
    setSelectedCrop,
    selectedTypes,
    toggleType,
    sortBy,
    setSortBy,
    crops,
    types,
    filteredProducts,
    handleReset
  } = useProductFilters(products);

  const handleApply = () => {
    // Filters are already applied in real-time
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          <ProductFilters
            types={types}
            selectedTypes={selectedTypes}
            onTypeToggle={toggleType}
            crops={crops}
            selectedCrop={selectedCrop}
            onCropChange={setSelectedCrop}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            onApply={handleApply}
            onReset={handleReset}
          />

          <main className="flex-1">
            <ProductHeader
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
            <ProductGrid products={filteredProducts} />
            <ProductPagination />
          </main>
        </div>
      </div>
    </div>
  );
}
