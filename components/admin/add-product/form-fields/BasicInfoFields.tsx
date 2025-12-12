import { PRODUCT_CATEGORIES } from "@/constants/categories";
import { ProductFormData } from "@/hooks/useProductForm";
import { useMemo } from "react";

interface BasicInfoFieldsProps {
  formData: ProductFormData;
  setFormData: (data: ProductFormData) => void;
}

export const BasicInfoFields = ({ formData, setFormData }: BasicInfoFieldsProps) => {
  const totalStock = useMemo(() => {
    return formData.sizes.reduce((total, size) => {
      const stock = parseInt(size.stockQuantity) || 0;
      return total + stock;
    }, 0);
  }, [formData.sizes]);
  return (
    <>
      {/* Product Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Product Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
          placeholder="Enter product name"
          required
        />
      </div>

      {/* Category & Stock */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
            required
          >
            <option value="">Select a category</option>
            {PRODUCT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Stock Quantity <span className="text-red-500">*</span>
            <span className="text-xs text-gray-500 font-normal ml-2">(Auto-calculated from sizes)</span>
          </label>
          <input
            type="number"
            value={totalStock}
            readOnly
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed"
            placeholder="0"
          />
        </div>
      </div>
    </>
  );
};