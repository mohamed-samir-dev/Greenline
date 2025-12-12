'use client';

import { useProductsData } from '@/hooks/useProductsData';
import { useProductFilters } from '@/hooks/useProductFilters';
import { usePagination } from '@/hooks/usePagination';
import {
  ProductFilters,
  ProductGrid,
  ProductHeader,
  ProductPagination
} from '@/components/products/products-list';
import ProductsSkeleton from '@/components/ui/ProductsSkeleton';

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

  const {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
    showPagination
  } = usePagination({ items: filteredProducts, itemsPerPage: 9 });

  const handleApply = () => {
    // Filters are already applied in real-time
  };

  if (loading) return <ProductsSkeleton />;

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
            <ProductGrid products={paginatedItems} />
            <ProductPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
              onPrevPage={prevPage}
              onNextPage={nextPage}
              hasPrevPage={hasPrevPage}
              hasNextPage={hasNextPage}
              showPagination={showPagination}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
