import { Truck, Shield, Star, Headphones } from 'lucide-react';

export default function Features() {
  return (
    <section className="py-4 md:py-6 bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 md:px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          <div className="flex items-center gap-2 md:gap-3 p-2 md:p-4 bg-white rounded-lg md:rounded-xl shadow-sm">
            <div className="p-2 md:p-3 bg-blue-100 rounded-full">
              <Truck className="w-4 h-4 md:w-6 md:h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-xs md:text-base">Free Shipping</h3>
              <p className="text-[10px] md:text-sm text-gray-600 hidden sm:block">On orders over ৳500</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3 p-2 md:p-4 bg-white rounded-lg md:rounded-xl shadow-sm">
            <div className="p-2 md:p-3 bg-green-100 rounded-full">
              <Shield className="w-4 h-4 md:w-6 md:h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-xs md:text-base">Secure Payment</h3>
              <p className="text-[10px] md:text-sm text-gray-600 hidden sm:block">100% Secure</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3 p-2 md:p-4 bg-white rounded-lg md:rounded-xl shadow-sm">
            <div className="p-2 md:p-3 bg-purple-100 rounded-full">
              <Star className="w-4 h-4 md:w-6 md:h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-xs md:text-base">Best Quality</h3>
              <p className="text-[10px] md:text-sm text-gray-600 hidden sm:block">Guaranteed</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3 p-2 md:p-4 bg-white rounded-lg md:rounded-xl shadow-sm">
            <div className="p-2 md:p-3 bg-orange-100 rounded-full">
              <Headphones className="w-4 h-4 md:w-6 md:h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-xs md:text-base">24/7 Support</h3>
              <p className="text-[10px] md:text-sm text-gray-600 hidden sm:block">Dedicated support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
