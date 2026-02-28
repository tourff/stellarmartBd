import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

async function getCategories() {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/categories?active=true`, { 
      cache: 'no-store' 
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Default categories in case API fails
const defaultCategories = [
  { name: 'Electronics', slug: 'electronics', icon: '📱', image: '/categories/electronics.jpg' },
  { name: 'Fashion', slug: 'fashion', icon: '👔', image: '/categories/fashion.jpg' },
  { name: 'Home & Living', slug: 'home-living', icon: '🏠', image: '/categories/home.jpg' },
  { name: 'Sports', slug: 'sports', icon: '⚽', image: '/categories/sports.jpg' },
  { name: 'Beauty', slug: 'beauty', icon: '💄', image: '/categories/beauty.jpg' },
  { name: 'Books', slug: 'books', icon: '📚', image: '/categories/books.jpg' },
  { name: 'Toys & Games', slug: 'toys', icon: '🎮', image: '/categories/toys.jpg' },
  { name: 'Food & Grocery', slug: 'food', icon: '🍎', image: '/categories/food.jpg' },
];

export default async function CategoriesPage() {
  const categories = await getCategories();
  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-2">All Categories</h1>
            <p className="text-green-100">Browse our wide range of products</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center gap-2 mb-6 text-sm">
            <Link href="/" className="text-blue-600 hover:underline">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-700">Categories</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayCategories.map((cat) => (
              <Link 
                key={cat.slug} 
                href={`/category/${cat.slug}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="aspect-square bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    {cat.icon || '📦'}
                  </span>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {cat.name_en || cat.name}
                  </h3>
                  {cat.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">{cat.description}</p>
                  )}
                  {cat.is_featured && (
                    <span className="inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded">
                      Featured
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
