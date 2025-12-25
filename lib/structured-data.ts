export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  brand?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  rating?: number;
  reviewCount?: number;
}

export function generateProductSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image ? `https://greenline-lcbc.vercel.app/${product.image}` : undefined,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Greenline'
    },
    category: product.category,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: `https://schema.org/${product.availability || 'InStock'}`,
      seller: {
        '@type': 'Organization',
        name: 'Greenline Fertilizers'
      }
    },
    aggregateRating: product.rating ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount || 0,
      bestRating: 5,
      worstRating: 1
    } : undefined
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Greenline Fertilizers',
    description: 'Premium agricultural fertilizers and plant nutrition products for sustainable agriculture',
    url: 'https://greenline-lcbc.vercel.app/',
    logo: '/images/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+201012486445',
      contactType: 'Customer Service',
      availableLanguage: 'English'
    },
    sameAs: [
      'https://www.facebook.com/share/1GZtCVVXwh/',
      'https://www.linkedin.com/in/mohammed-samier-mouawad/',
      'https://www.instagram.com/msamir.dev?igsh=b3Nra3hrd3QxMTc'
    ]
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Greenline Fertilizers',
    url: 'https://greenline-lcbc.vercel.app/',
    description: 'Premium agricultural fertilizers and plant nutrition products',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://greenline-lcbc.vercel.app//products?search={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://greenline-lcbc.vercel.app/${item.url}`
    }))
  };
}