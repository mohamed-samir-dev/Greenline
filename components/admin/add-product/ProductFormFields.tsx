import Image from "next/image";
import { PRODUCT_CATEGORIES } from "@/constants/categories";
import { ProductFormData } from "@/hooks/useProductForm";
import SizePricingSection from "./SizePricingSection";

interface ProductFormFieldsProps {
  formData: ProductFormData;
  setFormData: (data: ProductFormData) => void;
}

export default function ProductFormFields({ formData, setFormData }: ProductFormFieldsProps) {
  return (
    <>
      {/* Product Name & Price */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Price ($) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
            placeholder="0.00"
            required
          />
        </div>
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
          </label>
          <input
            type="number"
            value={formData.stockQuantity}
            onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
            placeholder="0"
            required
          />
        </div>
      </div>

      {/* Main Image */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Main Image URL <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          value={formData.mainImage}
          onChange={(e) => setFormData({ ...formData, mainImage: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
          placeholder="https://example.com/main-image.jpg"
          required
        />
        {formData.mainImage && (() => {
          try {
            new URL(formData.mainImage);
            return (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Main Image Preview:</p>
                <Image src={formData.mainImage} alt="Preview" width={128} height={128} className="object-cover rounded-lg" />
              </div>
            );
          } catch {
            return null;
          }
        })()}
      </div>

      {/* Additional Images */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Additional Images (comma-separated URLs)
        </label>
        <textarea
          value={formData.images}
          onChange={(e) => setFormData({ ...formData, images: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
          rows={2}
          placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
          rows={3}
          placeholder="Enter short product description..."
          required
        />
      </div>

      {/* Full Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Full Description
        </label>
        <textarea
          value={formData.fullDescription}
          onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
          rows={6}
          placeholder="Enter detailed product description, benefits, usage instructions, etc..."
        />
      </div>

      {/* Size-Based Pricing */}
      <SizePricingSection formData={formData} setFormData={setFormData} />

      {/* Tags */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
          placeholder="organic, fertilizer, indoor"
        />
      </div>
    </>
  );
}
