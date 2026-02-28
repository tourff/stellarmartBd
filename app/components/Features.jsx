import { Truck, Shield, Star, Headphones } from 'lucide-react';

export default function Features() {
  return (
    <section className="py-6 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
            <div className="p-3 bg-blue-100 rounded-full">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Free Shipping</h3>
              <p className="text-sm text-gray-600">On orders over ৳500</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
            <div className="p-3 bg-green-100 rounded-full">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Secure Payment</h3>
              <p className="text-sm text-gray-600">100% Secure</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
            <div className="p-3 bg-purple-100 rounded-full">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Best Quality</h3>
              <p className="text-sm text-gray-600">Guaranteed</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
            <div className="p-3 bg-orange-100 rounded-full">
              <Headphones className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">24/7 Support</h3>
              <p className="text-sm text-gray-600">Dedicated support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
