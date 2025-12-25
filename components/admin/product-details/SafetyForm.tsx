"use client";

import { useState } from "react";
import { db } from "@/lib/firebase/firebaseClient";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Safety } from "@/types/product";

interface SafetyFormProps {
  productId: string;
}

export default function SafetyForm({ productId }: SafetyFormProps) {
  const [formData, setFormData] = useState<Omit<Safety, "id">>({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!db) {
        toast.error("Database not initialized");
        return;
      }
      
      const timestamp = Date.now();
      const sanitizedTitle = formData.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      const safetyId = `${sanitizedTitle}_${timestamp}`;
      
      await setDoc(doc(db, "products", productId, "safety", safetyId), formData);
      toast.success("Safety instruction added successfully!");
      setFormData({ title: "", description: "" });
    } catch {
      toast.error("Failed to add safety instruction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">Add Safety Instruction</h3>
      
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-gray-900"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-gray-900"
          rows={4}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Safety Instruction"}
      </button>
    </form>
  );
}
