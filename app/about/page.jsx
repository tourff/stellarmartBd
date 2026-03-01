import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Truck, Shield, Star, Headphones, Store, Users, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">About StellarMartBD</h1>
            <p className="text-blue-100 text-lg">Your Trusted Online Shopping Destination in Bangladesh</p>
          </div>
        </div>

        {/* About Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Who We Are</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              StellarMartBD is Bangladesh's leading online shopping platform, offering a wide range of products 
              including electronics, fashion, home & living, sports equipment, beauty products, and books. 
              We are committed to providing our customers with the best shopping experience possible.
            </p>
            <p className="text-gray-700 leading-relaxed">
              With thousands of products from trusted brands, fast delivery, secure payment options, 
              and excellent customer support, StellarMartBD has become the go-to destination for 
              online shoppers across Bangladesh.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <Store className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-gray-900">10,000+</p>
              <p className="text-gray-600">Products</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <Users className="w-10 h-10 text-green-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-gray-900">50,000+</p>
              <p className="text-gray-600">Customers</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <Truck className="w-10 h-10 text-orange-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-gray-900">64</p>
              <p className="text-gray-600">Districts</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <Award className="w-10 h-10 text-purple-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-gray-900">4.8+</p>
              <p className="text-gray-600">Rating</p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose StellarMartBD?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <Truck className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
                <p className="text-gray-600 text-sm">Free shipping on orders over ৳500 with express delivery options</p>
              </div>
              <div className="text-center p-4">
                <Shield className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Secure Payment</h3>
                <p className="text-gray-600 text-sm">Multiple payment methods including bKash, Nagad, and cards</p>
              </div>
              <div className="text-center p-4">
                <Headphones className="w-12 h-12 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
                <p className="text-gray-600 text-sm">Round-the-clock customer support for any queries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
