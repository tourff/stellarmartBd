import './globals.css';
import { Inter } from 'next/font/google';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import UserLayoutWrapper from './components/UserLayoutWrapper';

export const dynamic = 'force-dynamic';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'StellarMartBD - Your Trusted Online Shopping Destination',
  description: 'Best e-commerce platform in Bangladesh. Shop electronics, fashion, home & living, and more with fast delivery.',
  keywords: 'e-commerce, online shopping, Bangladesh, electronics, fashion',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
  openGraph: {
    title: 'StellarMartBD',
    description: 'Your Trusted Online Shopping Destination',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <UserLayoutWrapper>
              <main className="min-h-screen">
                {children}
              </main>
            </UserLayoutWrapper>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
