'use client';

import { useState, useEffect } from 'react';
import { FaSearch, FaTimes, FaSpinner } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

export default function SearchModal({ onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  // Mock recent searches
  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setRecentSearches(recent.slice(0, 5));
  }, []);

  // Mock search function
  const handleSearch = (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const mockResults = [
        { id: 1, name: 'Wireless Headphones', price: 2499, image: '/images/product-1.jpg', category: 'Electronics' },
        { id: 2, name: 'Smart Watch', price: 1999, image: '/images/product-2.jpg', category: 'Electronics' },
        { id: 3, name: 'Leather Wallet', price: 799, image: '/images/product-3.jpg', category: 'Fashion' },
        { id: 4, name: 'Bluetooth Speaker', price: 1299, image: '/images/product-4.jpg', category: 'Electronics' },
      ].filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setResults(mockResults);
      setLoading(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Save to recent searches
      const recent = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
      localStorage.setItem('recentSearches', JSON.stringify(recent));
      setRecentSearches(recent);
    }
  };

  const handleFocus = () => {
    if (query) {
      handleSearch(query);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 bg-white rounded-xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Search Input */}
        <form onSubmit={handleSubmit} className="flex items-center border-b">
          <FaSearch className="ml-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              handleSearch(e.target.value);
            }}
            onFocus={handleFocus}
            placeholder="Search products..."
            className="flex-1 px-4 py-4 outline-none text-lg"
            autoFocus
          />
          {loading && (
            <FaSpinner className="mr-4 text-primary-600 animate-spin" />
          )}
          <button
            type="button"
            onClick={onClose}
            className="mr-4 p-2 text-gray-400 hover:text-gray-600"
          >
            <FaTimes size={20} />
          </button>
        </form>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-500 mb-3">Products</h3>
              <div className="space-y-2">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">📦</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                    <span className="font-semibold text-primary-600">৳{product.price}</span>
                  </Link>
                ))}
              </div>
              <Link
                href={`/products?search=${query}`}
                onClick={onClose}
                className="block text-center text-primary-600 py-3 hover:underline mt-2"
              >
                View all results for "{query}"
              </Link>
            </div>
          ) : query && !loading ? (
            <div className="p-8 text-center text-gray-500">
              <span className="text-4xl">🔍</span>
              <p className="mt-2">No products found for "{query}"</p>
            </div>
          ) : recentSearches.length > 0 ? (
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-500 mb-3">Recent Searches</h3>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(search);
                      handleSearch(search);
                    }}
                    className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-50 text-left"
                  >
                    <span className="text-gray-400">🕐</span>
                    <span className="text-gray-700">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-500 mb-3">Popular Searches</h3>
              <div className="flex flex-wrap gap-2">
                {['Headphones', 'Smart Watch', 'Phone Case', 'T-Shirt', 'Shoes'].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setQuery(term);
                      handleSearch(term);
                    }}
                    className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}