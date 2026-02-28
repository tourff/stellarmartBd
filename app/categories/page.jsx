import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const categories = [
  { name: 'Electronics', slug: 'electronics', icon: '📱', count: 234 },
  { name: 'Fashion', slug: 'fashion', icon: '👔', count: 567 },
  { name: 'Home & Living', slug: 'home-living', icon: '🏠', count: 123 },
  { name: 'Sports', slug: 'sports', icon: '⚽', count: 89 },
  { name: 'Beauty', slug: 'beauty', icon: '💄', count: 156 },
  { name: 'Books', slug: 'books', icon: '📚', count: 45 },
];

export default function CategoriesPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-2">All Categories</h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center gap-2 mb-6 text-sm">
            <Link href="/" className="text-blue-600 hover:underline">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-700">Categories</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map(cat => (
              <Link 
                key={cat.slug} 
                href={`/category/${cat.slug}`}
                className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{cat.name}</h3>
                <p className="text-sm text-gray-600">{cat.count} products</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
