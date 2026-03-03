import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Star, Heart, ShoppingBag, Truck, Shield, RotateCcw } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getProduct(slug) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/products?slug=${slug}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      return null;
    }
    
    const data = await res.json();
    return data.products?.[0] || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductPage({ params }) {
  const { slug } = params;
  const product = await getProduct(slug);

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

  const sellingPrice = product.sellingPrice || product.price || 0;
  const regularPrice = product.regularPrice || product.oldPrice || 0;
  const discount = regularPrice > sellingPrice ? Math.round(((regularPrice - sellingPrice) / regularPrice) * 100) : 0;
  const productImage = product.featuredImage || product.images?.[0] || 'https://placehold.co/600x600/007AFF/white?text=Product';

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
                <img src={productImage} alt={product.name} className="w-full h-full object-cover" />
              </div>

              {/* Info */}
              <div>
                <p className="text-sm text-gray-600 mb-1">{product.category?.name || product.category || 'Uncategorized'}</p>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h1>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating || 4) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-gray-600">({product.rating || 0})</span>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-bold text-blue-700">৳{sellingPrice.toLocaleString()}</span>
                  {discount > 0 && (
                    <>
                      <span className="text-xl text-gray-500 line-through">৳{regularPrice.toLocaleString()}</span>
                      <span className="px-2 py-1 bg-red-500 text-white text-sm rounded">-{discount}%</span>
                    </>
                  )}
                </div>

                <p className="text-gray-700 mb-6">{product.description || product.shortDescription || 'No description available.'}</p>

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
