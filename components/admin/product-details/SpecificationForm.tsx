"use client";

import { useState } from "react";
import { db } from "@/lib/firebase/firebaseClient";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Specification } from "@/types/product";

interface SpecificationFormProps {
  productId: string;
}

export default function SpecificationForm({ productId }: SpecificationFormProps) {
  const [formData, setFormData] = useState<Omit<Specification, "id">>({
    nutrient: "",
    percentage: "",
    source: "",
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
      
      // Create structured document ID: nutrient_timestamp
      const timestamp = Date.now();
      const sanitizedNutrient = formData.nutrient.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      const specId = `${sanitizedNutrient}_${timestamp}`;
      
      await setDoc(doc(db, "products", productId, "specifications", specId), formData);
      toast.success("Specification added successfully!");
      setFormData({ nutrient: "", percentage: "", source: "" });
    } catch {
      toast.error("Failed to add specification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">Add Specification</h3>
      
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Nutrient <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.nutrient}
          onChange={(e) => setFormData({ ...formData, nutrient: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-gray-900"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Percentage <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.percentage}
          onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-gray-900"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Source <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.source}
          onChange={(e) => setFormData({ ...formData, source: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-gray-900"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Specification"}
      </button>
    </form>
  );
}
