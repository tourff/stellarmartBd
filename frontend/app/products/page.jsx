'use client';

import { useState } from 'react';
import { FaThLarge, FaList, FaFilter, FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';

// সঠিক পাথ আপডেট করা হয়েছে
import ProductCard from '@/components/common/ProductCard';
import ProductCardList from '@/components/home/ProductCardList'; 

const allProducts = [
  { id: 1, name: 'Wireless Headphones Pro', slug: 'wireless-headphones-pro', image: '/images/product-1.jpg', regular_price: 3500, selling_price: 2499, discount: 29, rating: 4.7, reviews: 234, category: 'Electronics', brand: 'Sony' },
  { id: 2, name: 'Smart Watch Band 5', slug: 'smart-watch-band-5', image: '/images/product-2.jpg', regular_price: 2800, selling_price: 1999, discount: 29, rating: 4.5, reviews: 156, category: 'Electronics', brand: 'Samsung' },
  { id: 3, name: 'Premium Leather Wallet', slug: 'premium-leather-wallet', image: '/images/product-3.jpg', regular_price: 1200, selling_price: 799, discount: 33, rating: 4.8, reviews: 89, category: 'Fashion', brand: 'All' },
  { id: 4, name: 'Bluetooth Speaker Mini', slug: 'bluetooth-speaker-mini', image: '/images/product-4.jpg', regular_price: 1800, selling_price: 1299, discount: 28, rating: 4.3, reviews: 67, category: 'Electronics', brand: 'Sony' },
  { id: 5, name: 'Running Shoes Sport', slug: 'running-shoes-sport', image: '/images/product-5.jpg', regular_price: 2500, selling_price: 1799, discount: 28, rating: 4.6, reviews: 198, category: 'Sports', brand: 'Nike' },
  { id: 6, name: 'Cotton T-Shirt Pack', slug: 'cotton-tshirt-pack', image: '/images/product-6.jpg', regular_price: 1500, selling_price: 999, discount: 33, rating: 4.4, reviews: 145, category: 'Fashion', brand: 'Adidas' },
  { id: 7, name: 'Kitchen Organizer Set', slug: 'kitchen-organizer-set', image: '/images/product-7.jpg', regular_price: 2200, selling_price: 1599, discount: 27, rating: 4.2, reviews: 78, category: 'Home', brand: 'All' },
  { id: 8, name: 'Face Serum Vitamin C', slug: 'face-serum-vitamin-c', image: '/images/product-8.jpg', regular_price: 980, selling_price: 649, discount: 34, rating: 4.9, reviews: 312, category: 'Beauty', brand: 'All' },
];

const categories = ['All', 'Electronics', 'Fashion', 'Sports', 'Home', 'Beauty'];
const brands = ['All', 'Apple', 'Samsung', 'Sony', 'Nike', 'Adidas'];
const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'popularity', label: 'Most Popular' },
  { value: 'rating', label: 'Top Rated' },
];

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFilters, setExpandedFilters] = useState({
    category: true,
    brand: true,
    price: true,
  });

  // Filter products logic
  let filteredProducts = allProducts.filter(product => {
    if (selectedCategory !== 'All' && product.category !== selectedCategory) return false;
    if (selectedBrand !== 'All' && product.brand !== selectedBrand) return false;
    if (product.selling_price < priceRange[0] || product.selling_price > priceRange[1]) return false;
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Sort products logic
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.selling_price - b.selling_price;
      case 'price-high': return b.selling_price - a.selling_price;
      case 'rating': return b.rating - a.rating;
      case 'popularity': return b.reviews - a.reviews;
      default: return b.id - a.id;
    }
  });

  const toggleFilter = (filter) => {
    setExpandedFilters(prev => ({ ...prev, [filter]: !prev[filter] }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-500">Browse our complete collection of products</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex items-center gap-3">
               {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 font-medium"
              >
                <FaFilter className="text-blue-600" /> Filters
              </button>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg outline-none bg-gray-50 font-medium focus:ring-2 focus:ring-blue-500"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>

              {/* View Mode Toggle */}
              <div className="hidden md:flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-blue-400'}`}
                >
                  <FaThLarge size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-blue-400'}`}
                >
                  <FaList size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className={`w-full md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden'} md:block transition-all`}>
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24 border border-gray-100">
              {/* Category Filter */}
              <div className="mb-6">
                <button
                  onClick={() => toggleFilter('category')}
                  className="flex items-center justify-between w-full font-bold text-gray-800 mb-4 group"
                >
                  Category
                  {expandedFilters.category ? <FaChevronUp className="text-blue-500" /> : <FaChevronDown />}
                </button>
                {expandedFilters.category && (
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {categories.map(category => (
                      <label key={category} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className={`text-sm transition-colors ${selectedCategory === category ? 'text-blue-600 font-bold' : 'text-gray-600 group-hover:text-blue-400'}`}>
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <button
                  onClick={() => toggleFilter('brand')}
                  className="flex items-center justify-between w-full font-bold text-gray-800 mb-4"
                >
                  Brand
                  {expandedFilters.brand ? <FaChevronUp className="text-blue-500" /> : <FaChevronDown />}
                </button>
                {expandedFilters.brand && (
                  <div className="space-y-2">
                    {brands.map(brand => (
                      <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="brand"
                          checked={selectedBrand === brand}
                          onChange={() => setSelectedBrand(brand)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className={`text-sm ${selectedBrand === brand ? 'text-blue-600 font-bold' : 'text-gray-600 group-hover:text-blue-400'}`}>
                          {brand}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Filter */}
              <div className="mb-8">
                <button
                  onClick={() => toggleFilter('price')}
                  className="flex items-center justify-between w-full font-bold text-gray-800 mb-4"
                >
                  Price Range
                  {expandedFilters.price ? <FaChevronUp className="text-blue-500" /> : <FaChevronDown />}
                </button>
                {expandedFilters.price && (
                  <div className="px-2">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex items-center justify-between mt-3 text-sm font-bold text-blue-600">
                      <span>৳0</span>
                      <span>৳{priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Reset Button */}
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedBrand('All');
                  setPriceRange([0, 10000]);
                  setSearchQuery('');
                }}
                className="w-full py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all"
              >
                Reset All Filters
              </button>
            </div>
          </aside>

          {/* Product Listing Section */}
          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-500 font-medium">
                Showing <span className="text-gray-900 font-bold">{filteredProducts.length}</span> results
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              viewMode === 'grid' ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProducts.map(product => (
                    <ProductCardList key={product.id} product={product} />
                  ))}
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-800">No products found</h3>
                <p className="text-gray-500 mt-1">Try adjusting your filters or search terms</p>
                <button 
                   onClick={() => setSearchQuery('')}
                   className="mt-6 text-blue-600 font-bold hover:underline"
                >
                    Clear Search
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
