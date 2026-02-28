import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

const staticProducts = [
  { id: 1, name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max', category: 'Electronics', price: 149999, oldPrice: 159999, rating: 4.8 },
  { id: 2, name: 'Samsung Galaxy S24 Ultra', slug: 'samsung-galaxy-s24-ultra', category: 'Electronics', price: 129999, oldPrice: 139999, rating: 4.7 },
  { id: 3, name: 'MacBook Pro M3', slug: 'macbook-pro-m3', category: 'Electronics', price: 259999, rating: 4.9 },
  { id: 4, name: 'Nike Air Max', slug: 'nike-air-max', category: 'Fashion', price: 8999, oldPrice: 12000, rating: 4.5 },
  { id: 5, name: 'Sony WH-1000XM5', slug: 'sony-wh-1000xm5', category: 'Electronics', price: 34999, rating: 4.8 },
  { id: 6, name: 'Dell XPS 15', slug: 'dell-xps-15', category: 'Electronics', price: 189999, rating: 4.6 },
  { id: 7, name: 'Sony PlayStation 5', slug: 'ps5', category: 'Electronics', price: 65000, oldPrice: 70000, rating: 4.9 },
  { id: 8, name: 'Apple Watch Ultra', slug: 'apple-watch-ultra', category: 'Electronics', price: 89000, rating: 4.7 },
];

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Shop</h1>
            <p className="text-blue-100">Browse our wide range of products</p>
          </div>
        </div>

        {/* Products */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center gap-2 mb-6 text-sm">
            <Link href="/" className="text-blue-600 hover:underline">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-700">Shop</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {staticProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
