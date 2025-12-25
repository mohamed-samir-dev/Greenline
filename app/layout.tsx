import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { StructuredData } from '@/components/seo';
import { generateOrganizationSchema, generateWebsiteSchema } from '@/lib/structured-data';

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://greenline-lcbc.vercel.app/'),
  title: {
    default: 'Greenline - Premium Fertilizer E-Commerce Platform',
    template: '%s | Greenline Fertilizers'
  },
  description: 'Premium agricultural fertilizers and plant nutrition products. Organic fertilizers, chemical formulas, liquid concentrates, and granular products for sustainable agriculture.',
  keywords: ['fertilizers', 'agriculture', 'organic fertilizers', 'plant nutrition', 'farming', 'crop nutrition', 'sustainable agriculture', 'liquid fertilizers', 'granular fertilizers'],
  authors: [{ name: 'Greenline Team' }],
  creator: 'Greenline',
  publisher: 'Greenline',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://greenline-lcbc.vercel.app/',
    siteName: 'Greenline Fertilizers',
    title: 'Greenline - Premium Fertilizer E-Commerce Platform',
    description: 'Premium agricultural fertilizers and plant nutrition products for sustainable agriculture and optimal crop growth.',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Greenline Fertilizers - Premium Agricultural Products',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Greenline - Premium Fertilizer E-Commerce Platform',
    description: 'Premium agricultural fertilizers and plant nutrition products for sustainable agriculture.',
    images: ['/images/logo.png'],
    creator: '@greenlinefert',
  },
  icons: {
    icon: [
      { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicon-32x32.png', sizes: '32x32' },
    ],
    apple: [
      { url: '/images/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/images/safari-pinned-tab.svg', color: '#22c55e' },
    ],
  },
  manifest: '/site.webmanifest',
  category: 'agriculture',
  classification: 'Business',
  referrer: 'origin-when-cross-origin',
  colorScheme: 'light',
  themeColor: '#22c55e',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
 
  alternates: {
    canonical: 'https://greenline-lcbc.vercel.app/',
    languages: {
      'en-US': 'https://greenline-lcbc.vercel.app/',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#22c55e" />
        <meta name="msapplication-TileColor" content="#22c55e" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body
        className={`${poppins.variable} font-sans antialiased bg-white`}
        suppressHydrationWarning
      >
        <StructuredData data={[generateOrganizationSchema(), generateWebsiteSchema()]} />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
