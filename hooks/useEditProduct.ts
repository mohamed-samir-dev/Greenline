"use client";
import { useState, useEffect, useMemo } from "react";
import { db } from "@/lib/firebase/firebaseClient";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Product } from "@/types/product";
import { ProductFormData } from "./useProductForm";

export const useEditProduct = (product: Product | null) => {
  const initialFormData = useMemo(() => {
    if (!product) {
      return {
        sequentialId: "",
        name: "",
        price: "",
        category: "",
        stockQuantity: "",
        mainImage: "",
        images: "",
        description: "",
        fullDescription: "",
        tags: "",
        sizes: [{ size: "1kg", price: "", stockQuantity: "" }],
      };
    }
    return {
      sequentialId: product.sequentialId?.toString() || "",
      name: product.name || "",
      price: product.price?.toString() || "",
      category: product.category || "",
      stockQuantity: product.stockQuantity?.toString() || "",
      mainImage: product.mainImage || "",
      images: product.images?.join(", ") || "",
      description: product.description || "",
      fullDescription: product.fullDescription || "",
      tags: product.tags?.join(", ") || "",
      sizes: product.sizes?.map(size => ({
        size: size.size,
        price: size.price.toString(),
        stockQuantity: size.stockQuantity.toString()
      })) || [{ size: "1kg", price: "", stockQuantity: "" }],
    };
  }, [product]);

  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    setUploading(true);
    try {
      const productRef = doc(db, "products", product.id);
      
      const stockQty = parseInt(formData.stockQuantity) || 0;
      const imagesArray = formData.images.split(',').map(img => img.trim()).filter(img => img);
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      const sizes = formData.sizes
        .filter(size => size.size && size.price && size.stockQuantity)
        .map(size => ({
          size: size.size,
          price: parseFloat(size.price),
          stockQuantity: parseInt(size.stockQuantity)
        }));
      
      const basePrice = sizes.length > 0 ? sizes[0].price : parseFloat(formData.price) || 0;
      
      const updateData = {
        name: formData.name,
        price: basePrice,
        category: formData.category,
        stockQuantity: stockQty,
        inStock: stockQty > 0,
        mainImage: formData.mainImage,
        images: imagesArray,
        description: formData.description,
        fullDescription: formData.fullDescription,
        tags: tagsArray,
        updatedAt: new Date().toISOString(),
        ...(sizes.length > 0 && { sizes }),
      };
      
      await updateDoc(productRef, updateData);
      toast.success("Product updated successfully!");
      
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product. Please try again.");
    }
    setUploading(false);
  };

  const setFormDataWithStockCalc = (data: ProductFormData) => {
    const totalStock = data.sizes.reduce((total, size) => {
      const stock = parseInt(size.stockQuantity) || 0;
      return total + stock;
    }, 0);
    
    const firstSizePrice = data.sizes.length > 0 && data.sizes[0].price ? data.sizes[0].price : data.price;
    
    setFormData({ ...data, stockQuantity: totalStock.toString(), price: firstSizePrice });
  };

  return { formData, setFormData: setFormDataWithStockCalc, uploading, handleSubmit };
};