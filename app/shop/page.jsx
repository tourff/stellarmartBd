'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { Loader2 } from 'lucide-react';

// Mock products for display when database is empty
const mockProducts = [
  { _id: '1', slug: 'iphone-15-pro-max', name: 'iPhone 15 Pro Max', category: { name: 'Electronics' }, price: 149999, sellingPrice: 149999, regularPrice: 159999, rating: 4.8, featuredImage: 'https://placehold.co/600x600/007AFF/white?text=iPhone+15+Pro+Max', stockQuantity: 10 },
  { _id: '2', slug: 'samsung-galaxy-s24-ultra', name: 'Samsung Galaxy S24 Ultra', category: { name: 'Electronics' }, price: 129999, sellingPrice: 129999, rating: 4.7, featuredImage: 'https://placehold.co/600x600/007AFF/white?text=Galaxy+S24+Ultra', stockQuantity: 15 },
  { _id: '3', slug: 'macbook-pro-m3', name: 'MacBook Pro M3', category: { name: 'Electronics' }, price: 259999, sellingPrice: 259999, rating: 4.9, featuredImage: 'https://placehold.co/600x600/333333/white?text=MacBook+Pro+M3', stockQuantity: 5 },
  { _id: '4', slug: 'nike-air-max', name: 'Nike Air Max', category: { name: 'Fashion' }, price: 8999, sellingPrice: 8999, regularPrice: 12000, rating: 4.5, featuredImage: 'https://placehold.co/600x600/FF0000/white?text=Nike+Air+Max', stockQuantity: 25 },
  { _id: '5', slug: 'sony-wh-1000xm5', name: 'Sony WH-1000XM5', category: { name: 'Electronics' }, price: 34999, sellingPrice: 34999, rating: 4.8, featuredImage: 'https://placehold.co/600x600/333333/white?text=Sony+XM5', stockQuantity: 8 },
  { _id: '6', slug: 'apple-ipad-pro', name: 'Apple iPad Pro', category: { name: 'Electronics' }, price: 99999, sellingPrice: 99999, rating: 4.7, featuredImage: 'https://placehold.co/600x600/333333/white?text=iPad+Pro', stockQuantity: 12 },
  { _id: '7', slug: 'samsung-watch', name: 'Samsung Galaxy Watch', category: { name: 'Electronics' }, price: 24999, sellingPrice: 24999, rating: 4.5, featuredImage: 'https://placehold.co/600x600/333333/white?text=Galaxy+Watch', stockQuantity: 20 },
  { _id: '8', slug: 'adidas-shoes', name: 'Adidas Running Shoes', category: { name: 'Fashion' }, price: 5999, sellingPrice: 5999, regularPrice: 8000, rating: 4.4, featuredImage: 'https://placehold.co/600x600/FF0000/white?text=Adidas+Shoes', stockQuantity: 30 },
];

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      // Use mock products if database is empty
      const dbProducts = data.products || [];
      if (dbProducts.length === 0) {
        setProducts(mockProducts);
      } else {
        setProducts(dbProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

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
          
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">No products available yet.</p>
              <p className="text-gray-500 text-sm mt-2">Add products from the admin panel.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
