"use client";

import { useParams, useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ProductDetailsManager from "@/components/admin/product-details/ProductDetailsManager";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Toaster } from "sonner";

export default function ManageProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.productId as string;
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
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Product Details</h1>
              <p className="text-gray-600 mt-2">Add specifications, usage guides, and other product details</p>
            </div>
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
            >
              Back to Dashboard
            </button>
          </div>
          <ProductDetailsManager productId={productId} />
        </div>
      </div>
    </div>
  );
}
