"use client";

import { useProductForm } from "@/hooks/useProductForm";
import ProductFormFields from "./ProductFormFields";
import ProductFormActions from "./ProductFormActions";

export default function AddProductForm() {
  const { formData, setFormData, uploading, handleSubmit, clearForm } = useProductForm();

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <ProductFormFields formData={formData} setFormData={setFormData} />
        <ProductFormActions uploading={uploading} onClear={clearForm} />
      </form>
    </div>
  );
}
