'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, memo } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Star, Heart, ShoppingBag, ImageIcon } from 'lucide-react';

function ProductCard({ product }) {
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState('');
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist, loading: wishlistLoading } = useWishlist();

  const productId = product._id || product.id;
  const sellingPrice = product.sellingPrice || product.price || 0;
  const regularPrice = product.regularPrice || product.oldPrice || 0;
  const discount = regularPrice > sellingPrice
    ? Math.round(((regularPrice - sellingPrice) / regularPrice) * 100)
    : 0;
  const productImage = product.featuredImage || product.images?.[0] || null;
  const inWishlist = isInWishlist(productId);
  const isOutOfStock = (product.stockQuantity || product.stock || 0) <= 0;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAdding || added || isOutOfStock) return;

    setIsAdding(true);
    setError('');

    const result = await addToCart(productId, 1);
    setIsAdding(false);

    if (result.success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } else {
      setError(result.message || 'Failed to add to cart');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const result = inWishlist
      ? await removeFromWishlist(productId)
      : await addToWishlist(productId);

    if (!result.success) {
      console.error(result.message);
    }
  };

  return (
    <article className="group h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-square bg-slate-50 p-3">
        {discount > 0 && (
          <div className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white shadow-md">
            -{discount}%
          </div>
        )}

        <button
          type="button"
          onClick={handleWishlistToggle}
          disabled={wishlistLoading}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 shadow-md transition hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Heart className={`h-5 w-5 ${inWishlist ? 'fill-rose-500 text-rose-500' : 'text-slate-700'}`} />
        </button>

        <Link
          href={`/product/${product.slug}`}
          className="flex h-full items-center justify-center"
          aria-label={`View ${product.name}`}
        >
          {productImage ? (
            <Image
              src={productImage}
              alt={product.name}
              width={300}
              height={300}
              className="h-full w-full rounded-xl object-contain transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              quality={75}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              <ImageIcon className="h-16 w-16" />
            </div>
          )}
        </Link>
      </div>

      <div className="flex h-full flex-col p-4">
        <p className="mb-1 text-xs font-medium text-gray-500">
          {product.category?.name || product.category || 'Uncategorized'}
        </p>

        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="mb-2 line-clamp-2 text-sm font-black uppercase leading-tight text-slate-900 transition-colors group-hover:text-[#083b66] md:text-base">
            {product.name}
          </h3>
        </Link>

        <div className="mb-2 flex items-center gap-1">
          <div className="flex text-yellow-400">
            <Star className="h-3.5 w-3.5 fill-current" />
            <Star className="h-3.5 w-3.5 fill-current" />
            <Star className="h-3.5 w-3.5 fill-current" />
            <Star className="h-3.5 w-3.5 fill-current" />
            <Star className="h-3.5 w-3.5 fill-current" />
          </div>
          <span className="text-xs font-bold text-slate-800 md:text-sm">
            ({(product.rating || 4.8).toFixed(1)})
          </span>
        </div>

        <div className="mb-4 flex items-baseline gap-2">
          <span className="text-base font-black text-black md:text-lg">
            ৳{Number(sellingPrice || 0).toLocaleString()}
          </span>
          {discount > 0 && (
            <span className="text-xs font-bold text-slate-500 line-through md:text-sm">
              ৳{Number(regularPrice || 0).toLocaleString()}
            </span>
          )}
        </div>

        {error && (
          <p className="mb-3 text-xs font-medium text-red-500">
            {error}
          </p>
        )}

        <div className="mt-auto space-y-2">
          {!isOutOfStock ? (
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isAdding || added}
              className="btn-action btn-cart-minimal flex w-full items-center justify-center gap-2 border border-slate-300 text-sm font-black uppercase shadow-sm transition"
            >
              <ShoppingBag className="btn-icon h-4 w-4" />
              {isAdding ? 'Adding...' : added ? 'Added!' : 'Add to Cart'}
            </button>
          ) : (
            <button
              type="button"
              className="w-full cursor-not-allowed rounded-xl border bg-gray-200 py-3 text-sm font-black uppercase text-gray-500"
              disabled
            >
              Out of Stock
            </button>
          )}

          <Link
            href={`/product/${product.slug}`}
            className="btn-action btn-order-now flex w-full items-center justify-center gap-2 text-sm font-black uppercase shadow-md"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </article>
  );
}

export default memo(ProductCard);
