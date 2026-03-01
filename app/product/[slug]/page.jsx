import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Star, Heart, ShoppingBag, Truck, Shield, RotateCcw } from 'lucide-react';

const products = {
  'iphone-15-pro-max': { 
    id: 1, name: 'iPhone 15 Pro Max', category: 'Electronics', price: 149999, oldPrice: 159999, rating: 4.8,
    description: 'The iPhone 15 Pro Max features a titanium design, A17 Pro chip, and advanced camera system.',
    images: ['https://placehold.co/600x600/007AFF/white?text=iPhone+15+Pro+Max']
  },
  'samsung-galaxy-s24-ultra': { 
    id: 2, name: 'Samsung Galaxy S24 Ultra', category: 'Electronics', price: 129999, rating: 4.7,
    description: 'The Samsung Galaxy S24 Ultra with AI features and S Pen.',
    images: ['https://placehold.co/600x600/007AFF/white?text=Galaxy+S24+Ultra']
  },
  'macbook-pro-m3': { 
    id: 3, name: 'MacBook Pro M3', category: 'Electronics', price: 259999, rating: 4.9,
    description: 'The new MacBook Pro with M3 chip delivers exceptional performance.',
    images: ['https://placehold.co/600x600/333333/white?text=MacBook+Pro+M3']
  },
  'nike-air-max': { 
    id: 4, name: 'Nike Air Max', category: 'Fashion', price: 8999, oldPrice: 12000, rating: 4.5,
    description: 'Classic Nike Air Max sneakers with maximum comfort.',
    images: ['https://placehold.co/600x600/FF0000/white?text=Nike+Air+Max']
  },
  'sony-wh-1000xm5': { 
    id: 5, name: 'Sony WH-1000XM5', category: 'Electronics', price: 34999, rating: 4.8,
    description: 'Premium noise canceling headphones from Sony.',
    images: ['https://placehold.co/600x600/333333/white?text=Sony+XM5']
  },
};

export default function ProductPage({ params }) {
  const { slug } = params;
  const product = products[slug];

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <Link href="/shop" className="text-blue-600 hover:underline">Back to Shop</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-2 mb-6 text-sm">
            <Link href="/" className="text-blue-600 hover:underline">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/shop" className="text-blue-600 hover:underline">Shop</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-700">{product.name}</span>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Image */}
              <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              </div>

              {/* Info */}
              <div>
                <p className="text-sm text-gray-600 mb-1">{product.category}</p>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h1>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-gray-600">({product.rating})</span>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-bold text-blue-700">৳{product.price.toLocaleString()}</span>
                  {discount > 0 && (
                    <>
                      <span className="text-xl text-gray-500 line-through">৳{product.oldPrice.toLocaleString()}</span>
                      <span className="px-2 py-1 bg-red-500 text-white text-sm rounded">-{discount}%</span>
                    </>
                  )}
                </div>

                <p className="text-gray-700 mb-6">{product.description}</p>

                <div className="flex gap-4 mb-6">
                  <button className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Heart className="w-6 h-6 text-gray-700" />
                  </button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                  <div className="text-center">
                    <Truck className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-700">Free Shipping</p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-700">Secure Payment</p>
                  </div>
                  <div className="text-center">
                    <RotateCcw className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-700">Easy Return</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
