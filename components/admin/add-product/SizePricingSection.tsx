import { ProductFormData } from "@/hooks/useProductForm";

interface SizePricingSectionProps {
  formData: ProductFormData;
  setFormData: (data: ProductFormData) => void;
}

export default function SizePricingSection({ formData, setFormData }: SizePricingSectionProps) {
  const addSize = () => {
    setFormData({
      ...formData,
      sizes: [...formData.sizes, { size: "", price: "", stockQuantity: "" }]
    });
  };

  const removeSize = (index: number) => {
    setFormData({
      ...formData,
      sizes: formData.sizes.filter((_, i) => i !== index)
    });
  };

  const updateSize = (index: number, field: string, value: string) => {
    const updatedSizes = formData.sizes.map((size, i) => 
      i === index ? { ...size, [field]: value } : size
    );
    setFormData({ ...formData, sizes: updatedSizes });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <label className="block text-sm font-semibold text-gray-700">
          Size-Based Pricing
        </label>
        <button
          type="button"
          onClick={addSize}
          className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
        >
          Add Size
        </button>
      </div>
      
      <div className="space-y-3">
        {formData.sizes.map((size, index) => (
          <div key={index} className="grid grid-cols-4 gap-3 p-3 bg-gray-50 rounded-lg">
            <div>
              <input
                type="text"
                value={size.size}
                onChange={(e) => updateSize(index, 'size', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900"
                placeholder="e.g., 1kg"
              />
            </div>
            <div>
              <input
                type="number"
                step="0.01"
                value={size.price}
                onChange={(e) => updateSize(index, 'price', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900"
                placeholder="Price"
              />
            </div>
            <div>
              <input
                type="number"
                value={size.stockQuantity}
                onChange={(e) => updateSize(index, 'stockQuantity', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900"
                placeholder="Stock"
              />
            </div>
            <div>
              {formData.sizes.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSize(index)}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-xs text-gray-500 mt-2">
        Add different sizes with their respective prices and stock quantities. Leave base price above for backward compatibility.
      </p>
    </div>
  );
}