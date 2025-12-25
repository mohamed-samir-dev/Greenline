import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/firebaseClient";
import { collection, getDocs } from "firebase/firestore";
import { Review } from "@/types/product";

export const useProductReviews = (productId: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (!db) {
          console.error('Database not initialized');
          return;
        }
        
        const reviewsSnap = await getDocs(collection(db, "products", productId, "reviews"));
        const reviewsData = reviewsSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Review));
        
        setReviews(reviewsData);
        setTotalReviews(reviewsData.length);
        
        if (reviewsData.length > 0) {
          const avgRating = reviewsData.reduce((sum, r) => sum + r.rating, 0) / reviewsData.length;
          setAverageRating(avgRating);
        } else {
          setAverageRating(0);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  return { reviews, averageRating, totalReviews, loading };
};