import { useState, useMemo } from 'react';
import { Product } from '@/types/product';

export const useProductFilters = (products: Product[], searchQuery?: string) => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCrop, setSelectedCrop] = useState('All Crops');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('default');

  const crops = useMemo(() => ['All Crops', ...new Set(products.map(p => p.category))], [products]);
  const types = ['Organic', 'Synthetic', 'Liquid'];

  const toggleType = (type: string) => {
    setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCrop = selectedCrop === 'All Crops' || p.category === selectedCrop;
      const matchesType = selectedTypes.length === 0 || selectedTypes.some(t => p.name.toLowerCase().includes(t.toLowerCase()));
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchesSearch = !searchQuery || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCrop && matchesType && matchesPrice && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [products, selectedCrop, selectedTypes, priceRange, sortBy, searchQuery]);

  const handleReset = () => {
    setPriceRange([0, 100]);
    setSelectedCrop('All Crops');
    setSelectedTypes([]);
  };

  return {
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
  };
};