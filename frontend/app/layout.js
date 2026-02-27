import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import '@/styles/globals.css';
import { AuthProvider } from '@/lib/hooks/useAuth';

export const metadata = {
  title: 'StellarMartBD - Online Shop',
  description: 'Premium destination for electronics and fashion.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className="bg-[#f4f7f9] font-sans">
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
