import { ProductFormData } from "@/hooks/useProductForm";

interface DescriptionFieldsProps {
  formData: ProductFormData;
  setFormData: (data: ProductFormData) => void;
}

export const DescriptionFields = ({ formData, setFormData }: DescriptionFieldsProps) => {
  return (
    <>
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
    </>
  );
};