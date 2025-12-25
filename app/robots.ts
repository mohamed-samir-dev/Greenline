import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: '*',
        allow: '/api/products/',
      },
    ],
    sitemap: 'https://greenline-lcbc.vercel.app/sitemap.xml',
  }
}