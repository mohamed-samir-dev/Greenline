import { ProductFormData } from "@/hooks/useProductForm";

interface TagsFieldProps {
  formData: ProductFormData;
  setFormData: (data: ProductFormData) => void;
}

export const TagsField = ({ formData, setFormData }: TagsFieldProps) => {
  return (
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
  );
};