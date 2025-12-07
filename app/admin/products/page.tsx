"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import ProductsTable from "@/components/admin/products/ProductsTable";
import { useProducts } from "@/hooks/useProducts";
import { Toaster } from "sonner";

export default function AdminProducts() {
  const { loading, products, handleDelete } = useProducts();

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
        <h1 className="text-3xl font-bold text-black mb-6">Product Management</h1>
        <ProductsTable products={products} onDelete={handleDelete} />
      </div>
    </div>
  );
}
