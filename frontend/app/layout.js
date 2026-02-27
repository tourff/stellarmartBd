import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import '@/styles/globals.css';
import { AuthProvider } from '@/lib/hooks/useAuth'; // Path: frontend/lib/hooks/useAuth.js

export const metadata = {
  title: 'StellarMartBD - Bangladesh\'s Trusted Online Shop',
  description: 'Your premium destination for electronics and fashion.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className="bg-[#f4f7f9] font-sans">
        {/* AuthProvider wrap kora holo jate 'auth' undefined na thake */}
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
