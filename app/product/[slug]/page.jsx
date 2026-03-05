'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, Heart, ShoppingBag, Truck, Shield, RotateCcw, Minus, Plus, Check, ChevronRight, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const dynamic = 'force-dynamic';

async function getProduct(slug) {
  try {
    const res = await fetch(`/api/products?slug=${slug}`, {
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

async function getRelatedProducts(categoryId, currentProductId) {
  try {
    const res = await fetch(`/api/products?category=${categoryId}&limit=6`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      return [];
    }
    
    const data = await res.json();
    return (data.products || []).filter(p => p._id !== currentProductId).slice(0, 4);
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
}

export default function ProductPage({ params }) {
  const { slug } = params;
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchData() {
      const productData = await getProduct(slug);
      setProduct(productData);
      
      if (productData?.category?._id || productData?.category) {
        const categoryId = productData.category._id || productData.category;
        const related = await getRelatedProducts(categoryId, productData._id);
        setRelatedProducts(related);
      }
      
      setLoading(false);
    }
    
    fetchData();
  }, [slug]);

  const handleAddToCart = async () => {
    if (isAdding || added) return;
    
    setIsAdding(true);
    const result = await addToCart(product._id || product.id, quantity);
    setIsAdding(false);
    
    if (result.success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const handleQuantityChange = (delta) => {
    const newQty = quantity + delta;
    if (newQty >= 1 && newQty <= (product.stockQuantity || 10)) {
      setQuantity(newQty);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-4xl">😕</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find the product you're looking for.</p>
          <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const allImages = product.images?.length > 0 
    ? product.images 
    : product.featuredImage 
      ? [product.featuredImage] 
      : ['https://placehold.co/600x600/007AFF/white?text=Product'];
  
  const currentImage = allImages[selectedImage];
  
  const sellingPrice = product.sellingPrice || product.price || 0;
  const regularPrice = product.regularPrice || product.oldPrice || 0;
  const discount = regularPrice > sellingPrice ? Math.round(((regularPrice - sellingPrice) / regularPrice) * 100) : 0;
  
  const stockQty = product.stockQuantity || product.stock || 0;
  const isInStock = stockQty > 0;
  const isLowStock = stockQty > 0 && stockQty <= 5;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/shop" className="text-gray-500 hover:text-blue-600 transition-colors">Shop</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href={`/category/${product.category?.slug || product.category}`} className="text-gray-500 hover:text-blue-600 transition-colors">
              {product.category?.name || product.category || 'Category'}
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="p-6 bg-gray-50">
              <div className="relative aspect-square bg-white rounded-xl overflow-hidden mb-4 shadow-sm">
                {discount > 0 && (
                  <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-red-500 text-white text-sm font-bold rounded-lg shadow-lg animate-pulse">
                    {discount}% OFF
                  </div>
                )}
                  
                <button 
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="absolute top-4 right-4 z-10 p-2.5 bg-white rounded-full shadow-lg hover:shadow-xl transition-all group"
                >
                  <Heart className={`w-5 h-5 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover:text-red-500'}`} />
                </button>
                  
                <img 
                  src={currentImage} 
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                />
              </div>
                
              {allImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === idx ? 'border-blue-600 ring-2 ring-blue-100' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
                
              <div className="mt-4 flex items-center gap-3">
                <span className="text-sm text-gray-500">Share:</span>
                <div className="relative">
                  <button 
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    <Share2 className="w-4 h-4" />
                    Share Product
                  </button>
                  {showShareMenu && (
                    <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border p-2 z-20 flex gap-2">
                      <button className="p-2 hover:bg-blue-50 rounded text-blue-600"><Facebook className="w-5 h-5" /></button>
                      <button className="p-2 hover:bg-blue-50 rounded text-blue-400"><Twitter className="w-5 h-5" /></button>
                      <button className="p-2 hover:bg-blue-50 rounded text-blue-700"><Linkedin className="w-5 h-5" /></button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-3">
                {product.brand && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                    {product.brand}
                  </span>
                )}
                <span className="text-sm text-blue-600 font-medium">
                  {product.category?.name || product.category || 'Uncategorized'}
                </span>
              </div>

              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              {product.sku && (
                <p className="text-sm text-gray-500 mb-4">SKU: {product.sku}</p>
              )}

              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating || 4) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-gray-600">({product.rating || 0} ratings)</span>
                <span className="text-gray-300">|</span>
                <span className="text-green-600 font-medium">
                  {isInStock ? (isLowStock ? `Only ${stockQty} left` : 'In Stock') : 'Out of Stock'}
                </span>
              </div>

              <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-gray-100">
                <span className="text-4xl font-extrabold text-blue-700">৳{sellingPrice.toLocaleString()}</span>
                {discount > 0 && (
                  <>
                    <span className="text-xl text-gray-400 line-through">৳{regularPrice.toLocaleString()}</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded">
                      Save ৳{(regularPrice - sellingPrice).toLocaleString()}
                    </span>
                  </>
                )}
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description || product.shortDescription || 'No description available.'}
              </p>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-gray-700 font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="px-4 py-2 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-2 font-semibold text-gray-900 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= stockQty}
                    className="px-4 py-2 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-4 mb-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!isInStock || isAdding}
                  className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg ${
                    added 
                      ? 'bg-green-600 text-white shadow-green-200' 
                      : isInStock 
                        ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-6 h-6" />
                      Added to Cart!
                    </>
                  ) : isAdding ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Adding...
                    </>
                  ) : !isInStock ? (
                    'Out of Stock'
                  ) : (
                    <>
                      <ShoppingBag className="w-6 h-6" />
                      Add to Cart
                    </>
                  )}
                </button>
                  
                <Link
                  href="/cart"
                  className="flex-1 py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg bg-green-600 text-white hover:bg-green-700 hover:shadow-green-200"
                >
                  Order Now
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                <div className="text-center p-4 bg-gradient-to-b from-blue-50 to-white rounded-xl">
                  <Truck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-900">Free Shipping</p>
                  <p className="text-xs text-gray-500">On orders over ৳500</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-b from-green-50 to-white rounded-xl">
                  <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-900">Secure Payment</p>
                  <p className="text-xs text-gray-500">100% Protected</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-b from-orange-50 to-white rounded-xl">
                  <RotateCcw className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-900">Easy Return</p>
                  <p className="text-xs text-gray-500">7 Days Return Policy</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100">
            <div className="flex border-b border-gray-100">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-8 py-4 font-semibold text-sm transition-colors relative ${
                  activeTab === 'description' 
                    ? 'text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Description
                {activeTab === 'description' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('specification')}
                className={`px-8 py-4 font-semibold text-sm transition-colors relative ${
                  activeTab === 'specification' 
                    ? 'text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Specifications
                {activeTab === 'specification' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-8 py-4 font-semibold text-sm transition-colors relative ${
                  activeTab === 'reviews' 
                    ? 'text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Reviews (0)
                {activeTab === 'reviews' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
            </div>

            <div className="p-8">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Product Description</h3>
                  <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {product.description || 'No description available for this product.'}
                  </div>
                  {product.tags?.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Tags:</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'specification' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Product Specifications</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {product.brand && (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-500">Brand</span>
                        <p className="font-semibold text-gray-900">{product.brand}</p>
                      </div>
                    )}
                    {product.sku && (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-500">SKU</span>
                        <p className="font-semibold text-gray-900">{product.sku}</p>
                      </div>
                    )}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-500">Category</span>
                      <p className="font-semibold text-gray-900">{product.category?.name || product.category || 'N/A'}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-500">Availability</span>
                      <p className={`font-semibold ${isInStock ? 'text-green-600' : 'text-red-600'}`}>
                        {isInStock ? 'In Stock' : 'Out of Stock'}
                      </p>
                    </div>
                    {product.specification && (
                      <div className="md:col-span-2 p-4 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-500">Specifications</span>
                        <p className="font-semibold text-gray-900 mt-1">{product.specification}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Star className="w-10 h-10 text-gray-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Reviews Yet</h3>
                  <p className="text-gray-600 mb-6">Be the first to review this product!</p>
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    Write a Review
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => {
                const relSellingPrice = relProduct.sellingPrice || relProduct.price || 0;
                const relRegularPrice = relProduct.regularPrice || relProduct.oldPrice || 0;
                const relDiscount = relRegularPrice > relSellingPrice 
                  ? Math.round(((relRegularPrice - relSellingPrice) / relRegularPrice) * 100) 
                  : 0;
                const relImage = relProduct.featuredImage || relProduct.images?.[0] || 'https://placehold.co/400x400/007AFF/white?text=Product';
                
                return (
                  <Link 
                    key={relProduct._id || relProduct.id}
                    href={`/product/${relProduct.slug}`}
                    className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="aspect-square bg-gray-100 relative overflow-hidden">
                      {relDiscount > 0 && (
                        <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                          -{relDiscount}%
                        </div>
                      )}
                      <img 
                        src={relImage} 
                        alt={relProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-1 line-clamp-2 text-gray-900 group-hover:text-blue-700 transition-colors text-sm">
                        {relProduct.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-extrabold text-blue-700">৳{relSellingPrice.toLocaleString()}</span>
                        {relDiscount > 0 && (
                          <span className="text-xs text-gray-500 line-through">৳{relRegularPrice.toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

