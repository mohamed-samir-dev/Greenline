import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/auth";
import { db } from "@/lib/firebase/firebaseClient";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Product } from "@/types/product";
import { toast } from "sonner";

export const useProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  const loadProducts = async () => {
    if (!db) return;
    const querySnapshot = await getDocs(collection(db, "products"));
    const productsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
    setProducts(productsData);
  };

  useEffect(() => {
    if (!auth) {
      router.push("/admin/login");
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
    if (!db) return;
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
