import { ProductFormData } from "@/hooks/useProductForm";
import { useSizePricing } from "@/hooks/useSizePricing";
import { SizeHeader, SizeRow } from "./size-pricing";

interface SizePricingSectionProps {
  formData: ProductFormData;
  setFormData: (data: ProductFormData) => void;
}

export default function SizePricingSection({ formData, setFormData }: SizePricingSectionProps) {
  const { addSize, removeSize, updateSize } = useSizePricing(formData, setFormData);

  return (
    <div>
      <SizeHeader onAddSize={addSize} />
      
      <div className="space-y-3">
        {formData.sizes.map((size, index) => (
          <SizeRow
            key={index}
            size={size}
            index={index}
            onUpdate={updateSize}
            onRemove={removeSize}
            canRemove={formData.sizes.length > 1}
          />
        ))}
      </div>
      
      <p className="text-xs text-gray-500 mt-2">
        Add different sizes with their respective prices and stock quantities. Leave base price above for backward compatibility.
      </p>
    </div>
  );
}