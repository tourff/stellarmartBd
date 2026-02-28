import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import '@/styles/globals.css';

export const metadata = {
  title: 'StellarMartBD - Online Shop',
  description: 'Premium destination for electronics and fashion.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className="bg-[#f4f7f9] font-sans">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
