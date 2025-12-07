"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/auth";
import { db } from "@/lib/firebase/firebaseClient";
import { collection, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { Product } from "@/types/product";
import Image from "next/image";
export default function AdminProducts() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    image: "",
  });
  const [uploading, setUploading] = useState(false);
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

  const generateSKU = () => {
    const maxSku = products.reduce((max, p) => {
      const num = parseInt(p.sku.replace(/\D/g, '')) || 0;
      return num > max ? num : max;
    }, 0);
    return `PRD-${String(maxSku + 1).padStart(4, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const sku = generateSKU();
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

      setFormData({ name: "", price: "", description: "", category: "", stock: "", image: "" });
      setShowForm(false);
      loadProducts();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this product?")) {
      await deleteDoc(doc(db, "products", id));
      loadProducts();
    }
  };

  if (loading) return <div className="p-8 text-black">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black">Product Management</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            {showForm ? "Cancel" : "Add Product"}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold text-black mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Product Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Stock</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md text-black"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md text-black"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md text-black"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {uploading ? "Adding Product..." : "Add Product"}
              </button>
            </form>
          </div>
        )}

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
