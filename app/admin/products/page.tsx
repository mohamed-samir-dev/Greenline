"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import ProductsTable from "@/components/admin/products/ProductsTable";
import { useProducts } from "@/hooks/useProducts";
import { reorganizeSequentialIds } from "@/lib/firebase/productIdManager";
import { toast, Toaster } from "sonner";
import { useState } from "react";

export default function AdminProducts() {
  const { loading, products, handleDelete, refetch } = useProducts();
  const [reorganizing, setReorganizing] = useState(false);
  
  const handleReorganize = async () => {
    setReorganizing(true);
    try {
      await reorganizeSequentialIds();
      toast.success("Product IDs reorganized successfully!");
      refetch();
    } catch {
      toast.error("Failed to reorganize product IDs");
    }
    setReorganizing(false);
  };

  if (loading) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="ml-64 p-8">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Toaster position="top-center" richColors />
      <AdminSidebar />
      <div className="ml-64 flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black">Product Management</h1>
          <button
            onClick={handleReorganize}
            disabled={reorganizing}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {reorganizing ? "Reorganizing..." : "Reorganize IDs"}
          </button>
        </div>
        <ProductsTable products={products} onDelete={handleDelete} onUpdate={refetch} />
      </div>
    </div>
  );
}
