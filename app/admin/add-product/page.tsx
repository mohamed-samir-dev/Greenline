"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AddProductForm from "@/components/admin/add-product/AddProductForm";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Toaster } from "sonner";

export default function AddProduct() {
  const { loading } = useAdminAuth();

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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
            <p className="text-gray-600 mt-2">Fill in the details to add a new product to your store</p>
          </div>
          <AddProductForm />
        </div>
      </div>
    </div>
  );
}
