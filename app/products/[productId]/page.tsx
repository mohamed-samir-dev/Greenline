"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useProductData } from "@/hooks/useProductData";
import {
  ProductImageGallery,
  ProductInfo,
  ProductTabs
} from "@/components/products/product-detail";
import ProductDetailSkeleton from "@/components/ui/ProductDetailSkeleton";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.productId as string;
  const [selectedImage, setSelectedImage] = useState(0);

  const {
    product,
    specifications,
    usageGuide,
    dosage,
    safety,
    visualGuide,
    reviews,
    setReviews,
    loading
  } = useProductData(productId);

  if (loading) {
    return <ProductDetailSkeleton />;
  }
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Breadcrumb */}
        <div className="text-sm mb-4 sm:mb-6">
          <Link href="/" className="text-green-600 hover:text-green-700">
            Home
          </Link>
          <span className="mx-2 text-green-600">/</span>
          <Link
            href="/products"
            className="text-green-600 hover:text-green-700"
          >
            Products
          </Link>
          <span className="mx-2 text-green-600">/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-8 lg:mb-12">
          {/* Left: Image Gallery */}
          <ProductImageGallery
            mainImage={product.mainImage}
            images={product.images || []}
            visualGuide={visualGuide}
            productName={product.name}
            selectedImage={selectedImage}
            onImageSelect={setSelectedImage}
          />

          {/* Right: Product Details */}
          <ProductInfo product={product} />
        </div>

        {/* Tabs Section */}
        <ProductTabs
          product={product}
          specifications={specifications}
          usageGuide={usageGuide}
          dosage={dosage}
          safety={safety}
          reviews={reviews}
          onReviewsUpdate={setReviews}
 />
      </div>
    </div>
  );
}
