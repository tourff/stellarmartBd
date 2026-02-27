import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import '@/styles/globals.css';
// Apnar hooks folder er path onujayi import
import { AuthProvider } from '@/lib/hooks/useAuth'; 
import { CartProvider } from '@/lib/hooks/useCart'; 

export const metadata = {
  title: 'StellarMartBD - Bangladesh\'s Trusted Online Shop',
  description: 'Your premium destination for electronics and fashion.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className="bg-[#f4f7f9] font-sans">
        {/* Build error thik korte Provider wrap kora holo */}
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
