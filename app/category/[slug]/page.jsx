import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';

const categoryProducts = {
  'electronics': [
    { id: 1, name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max', category: 'Electronics', price: 149999, oldPrice: 159999, rating: 4.8 },
    { id: 2, name: 'Samsung Galaxy S24 Ultra', slug: 'samsung-galaxy-s24-ultra', category: 'Electronics', price: 129999, rating: 4.7 },
    { id: 5, name: 'Sony WH-1000XM5', slug: 'sony-wh-1000xm5', category: 'Electronics', price: 34999, rating: 4.8 },
    { id: 6, name: 'Dell XPS 15', slug: 'dell-xps-15', category: 'Electronics', price: 189999, rating: 4.6 },
  ],
  'fashion': [
    { id: 4, name: 'Nike Air Max', slug: 'nike-air-max', category: 'Fashion', price: 8999, oldPrice: 12000, rating: 4.5 },
  ],
  'home-living': [
    { id: 10, name: 'Modern Sofa Set', slug: 'modern-sofa-set', category: 'Home & Living', price: 45000, rating: 4.4 },
  ],
  'sports': [
    { id: 11, name: 'Football', slug: 'football', category: 'Sports', price: 1200, rating: 4.3 },
  ],
  'beauty': [
    { id: 12, name: 'Face Cream', slug: 'face-cream', category: 'Beauty', price: 850, rating: 4.2 },
  ],
  'books': [
    { id: 13, name: 'Programming Book', slug: 'programming-book', category: 'Books', price: 599, rating: 4.6 },
  ]
};

const categoryNames = {
  'electronics': 'Electronics',
  'fashion': 'Fashion',
  'home-living': 'Home & Living',
  'sports': 'Sports',
  'beauty': 'Beauty',
  'books': 'Books'
};

export default function CategoryPage({ params }) {
  const { slug } = params;
  const products = categoryProducts[slug] || [];
  const categoryName = categoryNames[slug] || slug;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-2">{categoryName}</h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center gap-2 mb-6 text-sm">
            <Link href="/" className="text-blue-600 hover:underline">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/categories" className="text-blue-600 hover:underline">Categories</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-700">{categoryName}</span>
          </div>
          
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <p className="text-gray-600">No products found in this category.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
