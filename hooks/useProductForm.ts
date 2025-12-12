"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase/firebaseClient";
import { collection, doc, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getNextSequentialId } from "@/lib/firebase/productIdManager";

export interface ProductFormData {
  sequentialId: string;
  name: string;
  price: string;
  category: string;
  stockQuantity: string;
  mainImage: string;
  images: string;
  description: string;
  fullDescription: string;
  tags: string;
  sizes: { size: string; price: string; stockQuantity: string }[];
}

const initialFormData: ProductFormData = {
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

export const useProductForm = () => {
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const loadNextId = async () => {
      const nextId = await getNextSequentialId();
      setFormData(prev => ({ ...prev, sequentialId: nextId.toString() }));
    };
    loadNextId();
  }, []);

  const setFormDataWithStockCalc = (data: ProductFormData) => {
    const totalStock = data.sizes.reduce((total, size) => {
      const stock = parseInt(size.stockQuantity) || 0;
      return total + stock;
    }, 0);
    
    // Set price from first size if available
    const firstSizePrice = data.sizes.length > 0 && data.sizes[0].price ? data.sizes[0].price : data.price;
    
    setFormData({ ...data, stockQuantity: totalStock.toString(), price: firstSizePrice });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const sequentialId = parseInt(formData.sequentialId);
      
      // Create structured document ID: category_productname_timestamp
      const timestamp = Date.now();
      const sanitizedName = formData.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      const sanitizedCategory = formData.category.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const productId = `${sanitizedCategory}_${sanitizedName}_${timestamp}`;
      
      const productRef = doc(db, "products", productId);
      
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
      
      // Use first size price as base price
      const basePrice = sizes.length > 0 ? sizes[0].price : parseFloat(formData.price) || 0;
      
      const productData = {
        sequentialId: sequentialId,
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
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      if (sizes.length > 0) {
        productData.sizes = sizes;
      }
      
      await setDoc(productRef, productData);

      const nextId = await getNextSequentialId();
      setFormData({
        ...initialFormData,
        sequentialId: nextId.toString(),
        sizes: [{ size: "1kg", price: "", stockQuantity: "" }]
      });
      setUploading(false);
      
      toast.success("Product added successfully!");
      router.push(`/admin/products/${productId}/manage`);
      
    } catch (error) {
      console.error("Error adding product:", error);
      setUploading(false);
      toast.error("Failed to add product. Please try again.");
    }
  };

  const clearForm = async () => {
    const nextId = await getNextSequentialId();
    setFormData({
      ...initialFormData,
      sequentialId: nextId.toString(),
      sizes: [{ size: "1kg", price: "", stockQuantity: "" }]
    });
  };

  return { formData, setFormData: setFormDataWithStockCalc, uploading, handleSubmit, clearForm };
};
