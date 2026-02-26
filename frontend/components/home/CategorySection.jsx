import Link from 'next/link';

const categories = [
  { id: 1, name: 'মোবাইল ফোন', icon: '📱', count: 150, slug: 'mobile-phones', color: 'bg-blue-100' },
  { id: 2, name: 'ল্যাপটপ', icon: '💻', count: 85, slug: 'laptops', color: 'bg-purple-100' },
  { id: 3, name: 'ট্যাবলেট', icon: '📲', count: 45, slug: 'tablets', color: 'bg-pink-100' },
  { id: 4, name: 'স্মার্টওয়াচ', icon: '⌚', count: 60, slug: 'smartwatches', color: 'bg-green-100' },
  { id: 5, name: 'হেডফোন', icon: '🎧', count: 120, slug: 'headphones', color: 'bg-yellow-100' },
  { id: 6, name: 'স্পিকার', icon: '🔊', count: 75, slug: 'speakers', color: 'bg-red-100' },
  { id: 7, name: 'ক্যামেরা', icon: '📷', count: 40, slug: 'cameras', color: 'bg-indigo-100' },
  { id: 8, name: 'গেমিং', icon: '🎮', count: 95, slug: 'gaming', color: 'bg-orange-100' },
  { id: 9, name: 'টিভি', icon: '📺', count: 55, slug: 'tvs', color: 'bg-teal-100' },
  { id: 10, name: 'অ্যাকসেসরিজ', icon: '🔌', count: 200, slug: 'accessories', color: 'bg-gray-100' },
  { id: 11, name: 'ফ্রিজ', icon: '🧊', count: 35, slug: 'refrigerators', color: 'bg-cyan-100' },
  { id: 12, name: 'এসি', icon: '❄️', count: 28, slug: 'air-conditioners', color: 'bg-sky-100' },
];

const CategorySection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">ক্যাটাগরি</h2>
            <p className="section-subtitle">আপনার প্রয়োজন অনুযায়ী ক্যাটাগরি ব্রাউজ করুন</p>
          </div>
          <Link 
            href="/categories" 
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
          >
            সব দেখুন
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group"
            >
              <div className={`${category.color} rounded-2xl p-6 text-center transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1`}>
                <span className="text-4xl mb-3 block">{category.icon}</span>
                <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-primary-600 transition">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">{category.count} পণ্য</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;