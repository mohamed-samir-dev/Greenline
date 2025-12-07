"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/auth";
import { db } from "@/lib/firebase/firebaseClient";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { Product } from "@/types/product";
import Image from "next/image";
import AdminSidebar from "@/components/admin/AdminSidebar";
export default function AdminProducts() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        loadProducts();
      } else {
        router.push("/admin/login");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const loadProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const productsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
    setProducts(productsData);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this product?")) {
      await deleteDoc(doc(db, "products", id));
      loadProducts();
    }
  };

  if (loading) return <div className="flex"><AdminSidebar /><div className="ml-64 p-8">Loading...</div></div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="ml-64 flex-1 p-8">
        <h1 className="text-3xl font-bold text-black mb-6">Product Management</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-gray-900 font-semibold">SKU</th>
                <th className="px-4 py-3 text-left text-gray-900 font-semibold">Image</th>
                <th className="px-4 py-3 text-left text-gray-900 font-semibold">Name</th>
                <th className="px-4 py-3 text-left text-gray-900 font-semibold">Price</th>
                <th className="px-4 py-3 text-left text-gray-900 font-semibold">Category</th>
                <th className="px-4 py-3 text-left text-gray-900 font-semibold">Stock</th>
                <th className="px-4 py-3 text-left text-gray-900 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="px-4 py-3 text-gray-900 font-mono">{product.sku}</td>
                  <td className="px-4 py-3">
                    {product.image && (
                      <Image src={product.image} alt={product.name} width={64} height={64} className="object-cover rounded" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-900">{product.name}</td>
                  <td className="px-4 py-3 text-gray-900">${product.price}</td>
                  <td className="px-4 py-3 text-gray-900">{product.category}</td>
                  <td className="px-4 py-3 text-gray-900">{product.stock}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
