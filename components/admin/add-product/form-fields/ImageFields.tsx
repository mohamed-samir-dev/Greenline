import Image from "next/image";
import { ProductFormData } from "@/hooks/useProductForm";

interface ImageFieldsProps {
  formData: ProductFormData;
  setFormData: (data: ProductFormData) => void;
}

export const ImageFields = ({ formData, setFormData }: ImageFieldsProps) => {
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <>
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
        {formData.mainImage && isValidUrl(formData.mainImage) && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Main Image Preview:</p>
            <Image 
              src={formData.mainImage} 
              alt="Preview" 
              width={128} 
              height={128} 
              className="object-cover rounded-lg" 
            />
          </div>
        )}
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
    </>
  );
};