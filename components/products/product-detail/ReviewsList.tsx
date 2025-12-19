import { FaStar } from "react-icons/fa";
import { Review } from "@/types/product";

interface ReviewsListProps {
  reviews: Review[];
  onWriteReview: () => void;
}

export const ReviewsList = ({ reviews, onWriteReview }: ReviewsListProps) => {
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
    : 0;

  return (
    <div>
      {/* Reviews Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="text-3xl sm:text-4xl font-bold text-gray-900">
            {averageRating.toFixed(1)}
          </div>
          <div>
            <div className="flex items-center gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    star <= averageRating ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-gray-600">
              Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <button
          onClick={onWriteReview}
          className="px-4 sm:px-6 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm sm:text-base w-full sm:w-auto"
        >
          Write a Review
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4 sm:space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-4 sm:pb-6 last:border-0">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs sm:text-sm font-medium text-gray-600">
                    {review.userName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                    <span className="font-medium text-gray-900 text-sm sm:text-base">{review.userName}</span>
                    <span className="text-xs sm:text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`w-3 h-3 sm:w-4 sm:h-4 ${
                          star <= review.rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{review.reviewText}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-500 mb-3 sm:mb-4 text-sm sm:text-base">
              No reviews yet for this product.
            </p>
            <p className="text-xs sm:text-sm text-gray-400">
              Be the first to leave a review!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};