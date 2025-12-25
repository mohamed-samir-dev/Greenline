import type { Metadata } from "next";

export interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
  noIndex?: boolean;
}

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title = "Greenline Fertilizers",
    description = "Premium agricultural fertilizers and plant nutrition products for sustainable agriculture and optimal crop growth.",
    keywords = [
      "fertilizers",
      "agriculture",
      "organic fertilizers",
      "chemical fertilizers",
      "plant nutrition",
      "crop nutrition",
      "sustainable agriculture",
      "fertilizer for vegetables",
      "fertilizer for fruits",
      "soil nutrients",
      "premium fertilizers",
      "green fertilizers",
    ],
    image = "/images/logo.png",
    url,
    type = "website",
    noIndex = false,
  } = config;

  const fullTitle = title
    ? `${title} | Greenline Fertilizers`
    : "Greenline - Premium Fertilizer E-Commerce Platform";

  const baseKeywords = [
    "fertilizers",
    "agriculture",
    "organic fertilizers",
    "plant nutrition",
    "farming",
    "crop nutrition",
    "sustainable agriculture",
  ];

  return {
    title: fullTitle,
    description,
    keywords: [...baseKeywords, ...keywords],
    robots: noIndex ? "noindex,nofollow" : "index,follow",
    openGraph: {
      title: fullTitle,
      description,
      images: [image],
      type: type === "product" ? "website" : type,
      url: url ? `https://greenline-lcbc.vercel.app/${url}` : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    alternates: url
      ? {
          canonical: `https://greenline-lcbc.vercel.app/${url}`,
        }
      : undefined,
  };
}

export function generateProductMetadata(product: {
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  id: string;
}): Metadata {
  return generateMetadata({
    title: product.name,
    description: `${
      product.description
    } - Premium ${product.category.toLowerCase()} fertilizer. Price: $${
      product.price
    }`,
    keywords: [
      product.category.toLowerCase(),
      "fertilizer",
      product.name.toLowerCase(),
    ],
    image: product.image || "/images/Organic Fertilizers.webp",
    url: `/products/${product.id}`,
    type: "product",
  });
}

export function generateCategoryMetadata(
  category: string,
  productCount: number
): Metadata {
  return generateMetadata({
    title: `${category} Fertilizers`,
    description: `Browse our collection of ${productCount} premium ${category.toLowerCase()} fertilizers. Find the perfect nutrition solution for your crops.`,
    keywords: [category.toLowerCase(), "fertilizers", "plant nutrition"],
    url: `/products?category=${encodeURIComponent(category)}`,
  });
}
