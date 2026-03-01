// Mock products for fallback when database is empty
const mockProducts = {
  'iphone-15-pro-max': { _id: '1', name: 'iPhone 15 Pro Max', category: { name: 'Electronics' }, price: 149999, sellingPrice: 149999, regularPrice: 159999, rating: 4.8, description: 'The iPhone 15 Pro Max features a titanium design.', images: ['https://placehold.co/600x600/007AFF/white?text=iPhone+15+Pro+Max'], stockQuantity: 10 },
  'samsung-galaxy-s24-ultra': { _id: '2', name: 'Samsung Galaxy S24 Ultra', category: { name: 'Electronics' }, price: 129999, sellingPrice: 129999, rating: 4.7, description: 'The Samsung Galaxy S24 Ultra with AI features.', images: ['https://placehold.co/600x600/007AFF/white?text=Galaxy+S24+Ultra'], stockQuantity: 15 },
  'macbook-pro-m3': { _id: '3', name: 'MacBook Pro M3', category: { name: 'Electronics' }, price: 259999, sellingPrice: 259999, rating: 4.9, description: 'The new MacBook Pro with M3 chip.', images: ['https://placehold.co/600x600/333333/white?text=MacBook+Pro+M3'], stockQuantity: 5 },
  'nike-air-max': { _id: '4', name: 'Nike Air Max', category: { name: 'Fashion' }, price: 8999, sellingPrice: 8999, regularPrice: 12000, rating: 4.5, description: 'Classic Nike Air Max sneakers.', images: ['https://placehold.co/600x600/FF0000/white?text=Nike+Air+Max'], stockQuantity: 25 },
  'sony-wh-1000xm5': { _id: '5', name: 'Sony WH-1000XM5', category: { name: 'Electronics' }, price: 34999, sellingPrice: 34999, rating: 4.8, description: 'Premium noise canceling headphones.', images: ['https://placehold.co/600x600/333333/white?text=Sony+XM5'], stockQuantity: 8 },
  'apple-ipad-pro': { _id: '6', name: 'Apple iPad Pro', category: { name: 'Electronics' }, price: 99999, sellingPrice: 99999, rating: 4.7, description: 'The powerful iPad Pro with M2 chip.', images: ['https://placehold.co/600x600/333333/white?text=iPad+Pro'], stockQuantity: 12 },
  'samsung-watch': { _id: '7', name: 'Samsung Galaxy Watch', category: { name: 'Electronics' }, price: 24999, sellingPrice: 24999, rating: 4.5, description: 'Smart watch with advanced health features.', images: ['https://placehold.co/600x600/333333/white?text=Galaxy+Watch'], stockQuantity: 20 },
  'adidas-shoes': { _id: '8', name: 'Adidas Running Shoes', category: { name: 'Fashion' }, price: 5999, sellingPrice: 5999, regularPrice: 8000, rating: 4.4, description: 'Comfortable running shoes for athletes.', images: ['https://placehold.co/600x600/FF0000/white?text=Adidas+Shoes'], stockQuantity: 30 },
};

import Link from 'next/link';
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useCart } from '../../context/CartContext';
import { Star, Heart, ShoppingBag, Truck, Shield, RotateCcw, Check, Loader2 } from 'lucide-react';
import dbConnect from '@/lib/db';
import { Product } from '@/models';

async function getProduct(slug) {
  try {
    await dbConnect();
    const product = await Product.findOne({ slug, isActive: true }).populate('category', 'name slug');
    if (product) return JSON.parse(JSON.stringify(product));
    if (mockProducts[slug]) return mockProducts[slug];
    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    if (mockProducts[slug]) return mockProducts[slug];
    return null;
  }
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <Link href="/shop" className="text-[#083b66] hover:underline">Back to Shop</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const sellingPrice = product.sellingPrice || product.price || 0;
  const regularPrice = product.regularPrice || product.regularPrice || 0;
  const discount = regularPrice > sellingPrice ? Math.round(((regularPrice - sellingPrice) / regularPrice) * 100) : 0;
  const productImage = product.featuredImage || product.images?.[0] || null;

  return (
    <ProductContent product={product} sellingPrice={sellingPrice} regularPrice={regularPrice} discount={discount} productImage={productImage} />
  );
}

function ProductContent({ product, sellingPrice, regularPrice, discount, productImage }) {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const [isAdding, setIsAdding] = React.useState(false);
  const [added, setAdded] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState(null);
  const [selectedSize, setSelectedSize] = React.useState(null);

  const images = product.images || [productImage].filter(Boolean);

  const handleAddToCart = async () => {
    setIsAdding(true);
    const result = await addToCart(product._id, quantity);
    setIsAdding(false);
    
    if (result.success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const handleBuyNow = () => {
    window.location.href = `/checkout?product=${product._id}&qty=${quantity}`;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-2 mb-6 text-sm">
            <Link href="/" className="text-[#083b66] hover:underline">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/shop" className="text-[#083b66] hover:underline">Shop</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-700">{product.name}</span>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                  {images[selectedImage] ? (
                    <img src={images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <ShoppingBag className="w-20 h-20" />
                    </div>
                  )}
                </div>
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 ${selectedImage === index ? 'border-[#083b66]' : 'border-transparent'}`}
                      >
                        <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Info */}
              <div>
                <p className="text-sm text-gray-600 mb-1">{product.category?.name || product.category}</p>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h1>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating || 4) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-gray-600">({product.rating || 0} reviews)</span>
                  {product.stockQuantity > 0 ? (
                    <span className="ml-2 text-green-600 text-sm">In Stock ({product.stockQuantity})</span>
                  ) : (
                    <span className="ml-2 text-red-600 text-sm">Out of Stock</span>
                  )}
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-bold text-[#083b66]">৳{sellingPrice.toLocaleString()}</span>
                  {discount > 0 && (
                    <>
                      <span className="text-xl text-gray-500 line-through">৳{regularPrice.toLocaleString()}</span>
                      <span className="px-2 py-1 bg-red-500 text-white text-sm rounded">-{discount}%</span>
                    </>
                  )}
                </div>

                <p className="text-gray-700 mb-6">{product.description}</p>

                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Color:</p>
                    <div className="flex gap-2">
                      {product.colors.map((color, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 border rounded-lg text-sm ${selectedColor === color ? 'border-[#083b66] bg-[#083b66] text-white' : 'border-gray-300 hover:border-[#083b66]'}`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Size:</p>
                    <div className="flex gap-2">
                      {product.sizes.map((size, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border rounded-lg text-sm ${selectedSize === size ? 'border-[#083b66] bg-[#083b66] text-white' : 'border-gray-300 hover:border-[#083b66]'}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-2">Quantity:</p>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(Math.min(product.stockQuantity || 10, quantity + 1))}
                      className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart & Buy Now */}
                <div className="flex gap-4 mb-6">
                  <button 
                    onClick={handleAddToCart}
                    disabled={isAdding || product.stockQuantity <= 0}
                    className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all
                      ${added 
                        ? 'bg-green-600 text-white' 
                        : 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed'
                      }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-5 h-5" />
                        Added to Cart
                      </>
                    ) : isAdding ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5" />
                        Add to Cart
                      </>
                    )}
                  </button>
                  <button 
                    onClick={handleBuyNow}
                    disabled={product.stockQuantity <= 0}
                    className="flex-1 py-3 bg-[#083b66] text-white rounded-lg hover:bg-[#062d4d] font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Buy Now
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

            {/* Product Details */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="mt-8 pt-8 border-t">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Specifications</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">{key}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
