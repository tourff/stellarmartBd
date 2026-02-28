import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

export default function SearchPage({ searchParams }) {
  const query = searchParams.q || '';
  
  // Mock search results
  const results = query ? [
    { id: 1, name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max', category: 'Electronics', price: 149999, rating: 4.8 },
    { id: 2, name: 'Samsung Galaxy S24 Ultra', slug: 'samsung-galaxy-s24-ultra', category: 'Electronics', price: 129999, rating: 4.7 },
  ] : [];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-2">Search Results</h1>
            <p className="text-purple-100">Showing results for "{query}"</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {query ? (
            <>
              <p className="text-gray-700 mb-6">{results.length} results found</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {results.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <p className="text-gray-600">Enter a search term to find products.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
