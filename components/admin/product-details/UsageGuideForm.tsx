"use client";

import { useState } from "react";
import { db } from "@/lib/firebase/firebaseClient";
import { collection, doc, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { UsageGuide } from "@/types/product";

interface UsageGuideFormProps {
  productId: string;
}

export default function UsageGuideForm({ productId }: UsageGuideFormProps) {
  const [formData, setFormData] = useState<Omit<UsageGuide, "id">>({
    stepNumber: 1,
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const timestamp = Date.now();
      const usageId = `step-${formData.stepNumber}_${timestamp}`;
      
      await setDoc(doc(db, "products", productId, "usageGuide", usageId), formData);
      toast.success("Usage guide step added successfully!");
      setFormData({ stepNumber: 1, title: "", description: "" });
    } catch (error) {
      toast.error("Failed to add usage guide step");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">Add Usage Guide Step</h3>
      
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Step Number <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          value={formData.stepNumber}
          onChange={(e) => setFormData({ ...formData, stepNumber: parseInt(e.target.value) || 1 })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-gray-900"
          min="1"
          required
        />
      </div>

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
        {loading ? "Adding..." : "Add Usage Guide Step"}
      </button>
    </form>
  );
}
