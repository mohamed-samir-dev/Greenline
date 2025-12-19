import { useState } from "react";
import { Product, Specification, UsageGuide, Dosage, Safety, Review } from "@/types/product";
import { ProductSpecifications } from "./ProductSpecifications";
import { ProductUsageGuide } from "./ProductUsageGuide";
import { ReviewsList } from "./ReviewsList";
import { ReviewForm } from "./ReviewForm";

interface ProductTabsProps {
  product: Product;
  specifications: Specification[];
  usageGuide: UsageGuide[];
  dosage: Dosage[];
  safety: Safety[];
  reviews: Review[];
  onReviewsUpdate: (reviews: Review[]) => void;
}

export const ProductTabs = ({
  product,
  specifications,
  usageGuide,
  dosage,
  safety,
  reviews,
  onReviewsUpdate
}: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState("description");
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleReviewSubmit = (newReview: Review) => {
    const updatedReviews = [...reviews, newReview].sort((a, b) => b.rating - a.rating);
    onReviewsUpdate(updatedReviews);
  };

  const tabs = [
    { id: "description", label: "Full Description" },
    { id: "specifications", label: "Specifications" },
    { id: "usage", label: "How to Use" },
    { id: "reviews", label: "Reviews" }
  ];

  return (
    <section className="mb-8 lg:mb-12">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-4 sm:mb-6 overflow-x-auto">
        <div className="flex space-x-4 sm:space-x-8 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 sm:pb-4 text-xs sm:text-sm font-medium whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {activeTab === "description" && (
          <div className="text-gray-700 text-sm sm:text-base">
            {product.fullDescription ? (
              <p className="whitespace-pre-line leading-relaxed">
                {product.fullDescription}
              </p>
            ) : (
              <p>No detailed description available for this product.</p>
            )}
          </div>
        )}

        {activeTab === "specifications" && (
          <ProductSpecifications specifications={specifications} />
        )}

        {activeTab === "usage" && (
          <ProductUsageGuide 
            usageGuide={usageGuide}
            dosage={dosage}
            safety={safety}
          />
        )}

        {activeTab === "reviews" && (
          <>
            <ReviewsList 
              reviews={reviews}
              onWriteReview={() => setShowReviewForm(true)}
            />
            {showReviewForm && (
              <ReviewForm
                productId={product.id}
                onReviewSubmit={handleReviewSubmit}
                onClose={() => setShowReviewForm(false)}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
};