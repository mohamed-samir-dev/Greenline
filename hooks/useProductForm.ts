import { useState } from "react";
import { db } from "@/lib/firebase/firebaseClient";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { toast } from "sonner";

export interface ProductFormData {
  name: string;
  price: string;
  description: string;
  category: string;
  stock: string;
  image: string;
}

const initialFormData: ProductFormData = {
  name: "",
  price: "",
  description: "",
  category: "",
  stock: "",
  image: "",
};

export const useProductForm = () => {
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [uploading, setUploading] = useState(false);

  const generateSKU = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const maxSku = querySnapshot.docs.reduce((max, doc) => {
      const num = parseInt(doc.data().sku?.replace(/\D/g, '') || '0');
      return num > max ? num : max;
    }, 0);
    return `PRD-${String(maxSku + 1).padStart(4, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    const addProduct = async () => {
      const sku = await generateSKU();
      const docId = sku.toLowerCase();
      
      await setDoc(doc(db, "products", docId), {
        sku,
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        category: formData.category,
        stock: parseInt(formData.stock),
        image: formData.image,
        createdAt: new Date().toISOString(),
      });

      setFormData(initialFormData);
      setUploading(false);
    };

    toast.promise(addProduct(), {
      loading: "Adding product...",
      success: "Product added successfully!",
      error: () => { setUploading(false); return "Failed to add product"; },
    });
  };

  const clearForm = () => setFormData(initialFormData);

  return { formData, setFormData, uploading, handleSubmit, clearForm };
};
