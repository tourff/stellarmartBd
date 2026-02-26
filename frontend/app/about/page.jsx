import { FaUsers, FaShoppingBag, FaAward, FaShippingFast, FaStore, FaHandshake } from 'react-icons/fa';
import Link from 'next/link';

export default function AboutPage() {
  const stats = [
    { icon: FaUsers, value: '50,000+', label: 'Happy Customers' },
    { icon: FaShoppingBag, value: '100,000+', label: 'Orders Delivered' },
    { icon: FaAward, value: '15+', label: 'Awards Won' },
    { icon: FaShippingFast, value: '64', label: 'Districts Covered' },
  ];

  const values = [
    {
      icon: FaStore,
      title: 'Quality Products',
      description: 'We ensure 100% authentic products from trusted brands and verified sellers.',
    },
    {
      icon: FaShippingFast,
      title: 'Fast Delivery',
      description: 'Quick and reliable delivery across Bangladesh with real-time tracking.',
    },
    {
      icon: FaHandshake,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We provide 24/7 customer support.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About StellarMartBD</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Your trusted online shopping destination in Bangladesh
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 -mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 text-center">
                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-primary-600 text-2xl" />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  StellarMartBD was founded in 2020 with a vision to revolutionize online shopping in Bangladesh. We believe that everyone deserves access to quality products at fair prices.
                </p>
                <p>
                  What started as a small initiative has now grown into one of Bangladesh's most trusted e-commerce platforms. We take pride in offering an extensive range of products across multiple categories, from electronics and fashion to home essentials and beauty products.
                </p>
                <p>
                  Our commitment to customer satisfaction, secure payment options, and fast delivery has helped us build a loyal customer base of over 50,000 happy shoppers.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-2xl h-80 flex items-center justify-center">
              <span className="text-8xl">🏢</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These values guide everything we do at StellarMartBD
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-8 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="text-primary-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Shopping?</h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers and discover amazing products at great prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Shop Now
            </Link>
            <Link href="/contact" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}