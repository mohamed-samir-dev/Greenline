"use client";
import { Product } from "@/types/product";
import { useEditProduct } from "@/hooks/useEditProduct";
import ProductFormFields from "../add-product/ProductFormFields";

interface EditProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export default function EditProductModal({ product, isOpen, onClose, onUpdate }: EditProductModalProps) {
  const { formData, setFormData, uploading, handleSubmit } = useEditProduct(product);

  if (!isOpen || !product) return null;

  const onSubmit = async (e: React.FormEvent) => {
    await handleSubmit(e);
    onUpdate();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Edit Product</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-6">
          <ProductFormFields formData={formData} setFormData={setFormData} />
          
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={uploading}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {uploading ? "Updating..." : "Update Product"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}