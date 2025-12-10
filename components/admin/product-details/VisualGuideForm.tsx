"use client";

import { useState } from "react";
import { db } from "@/lib/firebase/firebaseClient";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { VisualGuide } from "@/types/product";

interface VisualGuideFormProps {
  productId: string;
}

export default function VisualGuideForm({ productId }: VisualGuideFormProps) {
  const [formData, setFormData] = useState<Omit<VisualGuide, "id">>({
    image: "",
    caption: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const timestamp = Date.now();
      const sanitizedCaption = formData.caption.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      const visualId = `${sanitizedCaption}_${timestamp}`;
      
      await setDoc(doc(db, "products", productId, "visualGuide", visualId), formData);
      toast.success("Visual guide image added successfully!");
      setFormData({ image: "", caption: "" });
    } catch {
      toast.error("Failed to add visual guide image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">Add Visual Guide Image</h3>
      
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Image URL <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-gray-900"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Caption <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.caption}
          onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-gray-900"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Visual Guide Image"}
      </button>
    </form>
  );
}
