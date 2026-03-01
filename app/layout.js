import './globals.css';
import { Inter } from 'next/font/google';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata = {
  title: {
    default: 'StellarMartBD - Your Trusted Online Shopping Destination in Bangladesh',
    template: '%s | StellarMartBD',
  },
  description: 'Best e-commerce platform in Bangladesh. Shop electronics, fashion, home & living, and more with fast delivery across Bangladesh.',
  keywords: ['e-commerce', 'online shopping', 'Bangladesh', 'electronics', 'fashion', 'buy online', 'digital marketing'],
  authors: [{ name: 'StellarMartBD' }],
  creator: 'StellarMartBD',
  publisher: 'StellarMartBD',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://stellarmartbd.com'),
  alternates: {
    canonical: 'https://stellarmartbd.com',
    languages: {
      'en': 'https://stellarmartbd.com',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://stellarmartbd.com',
    siteName: 'StellarMartBD',
    title: 'StellarMartBD - Your Trusted Online Shopping Destination',
    description: 'Best e-commerce platform in Bangladesh. Shop electronics, fashion, home & living, and more.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'StellarMartBD',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StellarMartBD',
    description: 'Best e-commerce platform in Bangladesh',
    images: ['/og-image.jpg'],
  },
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
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#083b66" />
      </head>
      <body>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
