"use client";

import { useState } from "react";
import SpecificationForm from "./SpecificationForm";
import UsageGuideForm from "./UsageGuideForm";
import DosageForm from "./DosageForm";
import SafetyForm from "./SafetyForm";
import VisualGuideForm from "./VisualGuideForm";

interface ProductDetailsManagerProps {
  productId: string;
}

export default function ProductDetailsManager({ productId }: ProductDetailsManagerProps) {
  const [activeTab, setActiveTab] = useState<string>("specifications");

  const tabs = [
    { id: "specifications", label: "Specifications" },
    { id: "usage", label: "Usage Guide" },
    { id: "dosage", label: "Dosage" },
    { id: "safety", label: "Safety" },
    { id: "visual", label: "Visual Guide" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex gap-2 mb-8 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === tab.id
                ? "border-b-2 border-green-600 text-green-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {activeTab === "specifications" && <SpecificationForm productId={productId} />}
        {activeTab === "usage" && <UsageGuideForm productId={productId} />}
        {activeTab === "dosage" && <DosageForm productId={productId} />}
        {activeTab === "safety" && <SafetyForm productId={productId} />}
        {activeTab === "visual" && <VisualGuideForm productId={productId} />}
      </div>
    </div>
  );
}
