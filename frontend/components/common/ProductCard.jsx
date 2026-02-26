import Link from 'next/link';

const ProductCard = ({ product }) => {
  const {
    id,
    name_bn,
    name_en,
    featured_image,
    regular_price,
    selling_price,
    discount_percent,
    stock_status,
    rating,
    reviews_count,
  } = product;

  const price = selling_price || regular_price;
  const hasDiscount = discount_percent > 0;

  return (
    <div className="card group">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <Link href={`/products/${id}`}>
          <img
            src={featured_image || '/images/products/placeholder.jpg'}
            alt={name_bn || name_en}
            className="w-full h-56 object-cover object-center group-hover:scale-110 transition-transform duration-500"
          />
        </Link>
        
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discount_percent}%
          </div>
        )}
        
        {/* New Badge */}
        {product.is_new_arrival && (
          <div className="absolute top-3 right-3 bg-secondary-500 text-white text-xs font-bold px-2 py-1 rounded">
            নতুন
          </div>
        )}
        
        {/* Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-3 flex gap-2 justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          <button className="w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button className="w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
          <button className="w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
        
        {/* Stock Status */}
        {stock_status === 'out_of_stock' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold">স্টকে নেই</span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating || 0) ? 'fill-current' : 'fill-gray-300'}`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500">({reviews_count || 0})</span>
        </div>
        
        {/* Title */}
        <Link href={`/products/${id}`}>
          <h3 className="font-medium text-gray-800 hover:text-primary-600 transition line-clamp-2 mb-2">
            {name_bn || name_en}
          </h3>
        </Link>
        
        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary-600">
            ৳{price?.toLocaleString('bn-BD')}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              ৳{regular_price?.toLocaleString('bn-BD')}
            </span>
          )}
        </div>
        
        {/* Add to Cart Button */}
        <button 
          disabled={stock_status === 'out_of_stock'}
          className="w-full mt-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 rounded-lg font-medium transition"
        >
          কার্টে যোগ করুন
        </button>
      </div>
    </div>
  );
};

export default ProductCard;