import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Product } from "@/types/product";
import { toast } from "sonner";

export const useProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  const loadProducts = async () => {
    if (!db) {
      console.error('Firebase not initialized');
      return;
    }
    
    const querySnapshot = await getDocs(collection(db, "products"));
    const productsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
    setProducts(productsData);
  };

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        loadProducts();
      } else {
        router.push("/admin/login");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleDelete = async (id: string) => {
    if (!db) {
      toast.error('Firebase not initialized');
      return;
    }
    
    toast.promise(
      deleteDoc(doc(db, "products", id)).then(() => loadProducts()),
      {
        loading: "Deleting product...",
        success: "Product deleted successfully!",
        error: "Failed to delete product",
      }
    );
  };

  return { loading, products, handleDelete, refetch: loadProducts };
};
