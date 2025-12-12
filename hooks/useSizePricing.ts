import { ProductFormData } from "./useProductForm";

export const useSizePricing = (formData: ProductFormData, setFormData: (data: ProductFormData) => void) => {
  const addSize = () => {
    setFormData({
      ...formData,
      sizes: [...formData.sizes, { size: "", price: "", stockQuantity: "" }]
    });
  };

  const removeSize = (index: number) => {
    if (formData.sizes.length > 1) {
      setFormData({
        ...formData,
        sizes: formData.sizes.filter((_, i) => i !== index)
      });
    }
  };

  const updateSize = (index: number, field: string, value: string) => {
    const updatedSizes = formData.sizes.map((size, i) => 
      i === index ? { ...size, [field]: value } : size
    );
    setFormData({ ...formData, sizes: updatedSizes });
  };

  return {
    addSize,
    removeSize,
    updateSize
  };
};