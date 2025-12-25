import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/config";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import {
  Product,
  Specification,
  UsageGuide,
  Dosage,
  Safety,
  VisualGuide,
  Review,
} from "@/types/product";

export const useProductData = (productId: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [specifications, setSpecifications] = useState<Specification[]>([]);
  const [usageGuide, setUsageGuide] = useState<UsageGuide[]>([]);
  const [dosage, setDosage] = useState<Dosage[]>([]);
  const [safety, setSafety] = useState<Safety[]>([]);
  const [visualGuide, setVisualGuide] = useState<VisualGuide[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!db) {
        setLoading(false);
        return;
      }
      
      try {
        const productDoc = await getDoc(doc(db, "products", productId));
        if (productDoc.exists()) {
          const productData = { id: productDoc.id, ...productDoc.data() } as Product;
          setProduct(productData);
        }

        const [specsSnap, usageSnap, dosageSnap, safetySnap, visualSnap, reviewsSnap] = await Promise.all([
          getDocs(collection(db, "products", productId, "specifications")),
          getDocs(collection(db, "products", productId, "usageGuide")),
          getDocs(collection(db, "products", productId, "dosage")),
          getDocs(collection(db, "products", productId, "safety")),
          getDocs(collection(db, "products", productId, "visualGuide")),
          getDocs(collection(db, "products", productId, "reviews"))
        ]);

        setSpecifications(specsSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Specification)));
        setUsageGuide(usageSnap.docs.map((d) => ({ id: d.id, ...d.data() } as UsageGuide)).sort((a, b) => a.stepNumber - b.stepNumber));
        setDosage(dosageSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Dosage)));
        setSafety(safetySnap.docs.map((d) => ({ id: d.id, ...d.data() } as Safety)));
        setVisualGuide(visualSnap.docs.map((d) => ({ id: d.id, ...d.data() } as VisualGuide)));
        setReviews(reviewsSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Review)).sort((a, b) => b.rating - a.rating));
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return {
    product,
    specifications,
    usageGuide,
    dosage,
    safety,
    visualGuide,
    reviews,
    setReviews,
    loading
  };
};