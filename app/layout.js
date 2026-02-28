import './globals.css';
import { Inter } from 'next/font/google';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'StellarMartBD - Your Trusted Online Shopping Destination',
  description: 'Best e-commerce platform in Bangladesh. Shop electronics, fashion, home & living, and more with fast delivery.',
  keywords: 'e-commerce, online shopping, Bangladesh, electronics, fashion',
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
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
