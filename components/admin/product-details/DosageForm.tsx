"use client";

import { useState } from "react";
import { db } from "@/lib/firebase/firebaseClient";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Dosage } from "@/types/product";

interface DosageFormProps {
  productId: string;
}

export default function DosageForm({ productId }: DosageFormProps) {
  const [formData, setFormData] = useState<Omit<Dosage, "id">>({
    plantType: "",
    amount: "",
    frequency: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!db) {
        throw new Error('Database not initialized');
      }
      
      const timestamp = Date.now();
      const sanitizedPlantType = formData.plantType.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      const dosageId = `${sanitizedPlantType}_${timestamp}`;
      
      await setDoc(doc(db, "products", productId, "dosage", dosageId), formData);
      toast.success("Dosage instruction added successfully!");
      setFormData({ plantType: "", amount: "", frequency: "" });
    } catch {
      toast.error("Failed to add dosage instruction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">Add Dosage Instruction</h3>
      
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Plant Type <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.plantType}
          onChange={(e) => setFormData({ ...formData, plantType: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-gray-900"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Amount <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-gray-900"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Frequency <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.frequency}
          onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-gray-900"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Dosage Instruction"}
      </button>
    </form>
  );
}
