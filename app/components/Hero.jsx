import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Welcome to StellarMartBD
            </h1>
            <p className="text-xl mb-8 opacity-95">
              Your one-stop shop for all your needs. Best products, best prices, best service in Bangladesh.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="px-8 py-3.5 bg-white text-blue-700 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg">
                Shop Now
              </Link>
              <Link href="/categories" className="px-8 py-3.5 border-2 border-white rounded-lg font-bold hover:bg-white/20 transition-colors">
                Browse Categories
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 rounded-xl p-5 text-center">
                  <div className="text-4xl font-extrabold">10K+</div>
                  <div className="text-sm opacity-90">Products</div>
                </div>
                <div className="bg-white/20 rounded-xl p-5 text-center">
                  <div className="text-4xl font-extrabold">50K+</div>
                  <div className="text-sm opacity-90">Customers</div>
                </div>
                <div className="bg-white/20 rounded-xl p-5 text-center">
                  <div className="text-4xl font-extrabold">500+</div>
                  <div className="text-sm opacity-90">Brands</div>
                </div>
                <div className="bg-white/20 rounded-xl p-5 text-center">
                  <div className="text-4xl font-extrabold">24/7</div>
                  <div className="text-sm opacity-90">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
