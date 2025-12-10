// Size-based pricing
export interface ProductSize {
  size: string;
  price: number;
  stockQuantity: number;
}

// Main Product Document
export interface Product {
  id: string;
  sequentialId: number; // Admin-assigned sequential ID
  name: string;
  price: number; // Base price for backward compatibility
  sizes?: ProductSize[]; // New size-based pricing
  category: string;
  stockQuantity: number;
  inStock: boolean;
  mainImage: string;
  images: string[];
  description: string;
  fullDescription: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Sub-collection: specifications
export interface Specification {
  id?: string;
  nutrient: string;
  percentage: string;
  source: string;
}

// Sub-collection: usageGuide
export interface UsageGuide {
  id?: string;
  stepNumber: number;
  title: string;
  description: string;
}

// Sub-collection: dosage
export interface Dosage {
  id?: string;
  plantType: string;
  amount: string;
  frequency: string;
}

// Sub-collection: safety
export interface Safety {
  id?: string;
  title: string;
  description: string;
}

// Sub-collection: visualGuide
export interface VisualGuide {
  id?: string;
  image: string;
  caption: string;
}

// Sub-collection: reviews
export interface Review {
  id?: string;
  userName: string;
  userImage: string;
  rating: number;
  reviewText: string;
  wouldRecommend: boolean;
  date: string;
  verifiedPurchase: boolean;
}

// Document: ratingSummary
export interface RatingSummary {
  averageRating: number;
  totalReviews: number;
  ratingBreakdown: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}
