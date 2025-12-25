import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { db } from "@/lib/firebase/firebaseClient";
import { doc, setDoc } from "firebase/firestore";
import { Review } from "@/types/product";

interface ReviewFormProps {
  productId: string;
  onReviewSubmit: (review: Review) => void;
  onClose: () => void;
}

export const ReviewForm = ({ productId, onReviewSubmit, onClose }: ReviewFormProps) => {
  const [reviewForm, setReviewForm] = useState({
    userName: "",
    rating: 5,
    reviewText: "",
    wouldRecommend: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!db) {
        console.error('Database not initialized');
        return;
      }
      
      const newReview = {
        userName: reviewForm.userName,
        userImage: "/api/placeholder/40/40",
        rating: reviewForm.rating,
        reviewText: reviewForm.reviewText,
        wouldRecommend: reviewForm.wouldRecommend,
        date: new Date().toLocaleDateString(),
        verifiedPurchase: false
      };
      
      const docId = `${reviewForm.userName}_${Math.floor(Math.random() * 10000)}`;
      await setDoc(doc(db, "products", productId, "reviews", docId), newReview);
      
      onReviewSubmit({ id: Date.now().toString(), ...newReview });
      setReviewForm({ userName: "", rating: 5, reviewText: "", wouldRecommend: true });
      onClose();
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <div className="fixed inset-0  bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 p-4 sm:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-black mb-2">Share Your Experience</h3>
          <p className="text-gray-600 text-sm sm:text-base">Help others make informed decisions</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 sm:mb-6">
            <label className="block text-sm font-semibold text-black mb-2 sm:mb-3">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={reviewForm.userName}
              onChange={(e) => setReviewForm(prev => ({ ...prev, userName: e.target.value }))}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all text-black placeholder-gray-400 text-sm sm:text-base"
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="mb-4 sm:mb-6">
            <label className="block text-sm font-semibold text-black mb-2 sm:mb-3">
              Overall Rating *
            </label>
            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="flex gap-1 sm:gap-2 justify-center mb-3 sm:mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                    className="p-1 sm:p-2 hover:scale-110 transition-transform"
                  >
                    <FaStar
                      className={`w-8 h-8 sm:w-10 sm:h-10 ${
                        star <= reviewForm.rating ? "text-yellow-400" : "text-gray-300"
                      } hover:text-yellow-300 transition-colors`}
                    />
                  </button>
                ))}
              </div>
              <div className="text-center">
                <span className="text-base sm:text-lg font-semibold text-black">
                  {reviewForm.rating === 1 && "Poor"}
                  {reviewForm.rating === 2 && "Fair"}
                  {reviewForm.rating === 3 && "Good"}
                  {reviewForm.rating === 4 && "Very Good"}
                  {reviewForm.rating === 5 && "Excellent"}
                </span>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  {reviewForm.rating}/5 stars
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-4 sm:mb-6">
            <label className="block text-sm font-semibold text-black mb-2 sm:mb-3">
              Detailed Review *
            </label>
            <textarea
              required
              rows={4}
              value={reviewForm.reviewText}
              onChange={(e) => setReviewForm(prev => ({ ...prev, reviewText: e.target.value }))}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all text-black placeholder-gray-400 resize-none text-sm sm:text-base"
              placeholder="Tell us about your experience with this product. What did you like? How did it perform? Any tips for other customers?"
            />
            <div className="text-right mt-2">
              <span className="text-xs sm:text-sm text-gray-500">
                {reviewForm.reviewText.length}/500 characters
              </span>
            </div>
          </div>
          
          <div className="mb-6 sm:mb-8">
            <label className="block text-sm font-semibold text-black mb-3 sm:mb-4">
              Would you recommend this product?
            </label>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => setReviewForm(prev => ({ ...prev, wouldRecommend: true }))}
                className={`flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl border-2 transition-all font-semibold text-sm sm:text-base ${
                  reviewForm.wouldRecommend
                    ? "bg-green-100 border-green-500 text-green-700"
                    : "border-gray-300 text-gray-600 hover:border-gray-400"
                }`}
              >
                👍 Yes, I recommend it
              </button>
              <button
                type="button"
                onClick={() => setReviewForm(prev => ({ ...prev, wouldRecommend: false }))}
                className={`flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl border-2 transition-all font-semibold text-sm sm:text-base ${
                  !reviewForm.wouldRecommend
                    ? "bg-red-100 border-red-500 text-red-700"
                    : "border-gray-300 text-gray-600 hover:border-gray-400"
                }`}
              >
                👎 No, I don&apos;t recommend it
              </button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 sm:px-6 py-2 sm:py-3 border-2 border-gray-300 text-black rounded-lg sm:rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg sm:rounded-xl hover:bg-green-700 hover:shadow-lg transition-all font-semibold text-sm sm:text-base"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};