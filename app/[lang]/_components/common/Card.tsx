import React from 'react';
import Image from 'next/image';
import { Product } from './Products';
import { Heart } from 'lucide-react';

const Card = async ({ product, lang }: { product: Product; lang: string }) => {
  const imageSrc = product.image || null;
  if (!imageSrc) return null;
  const isArabic = lang === 'ar';
  return (
    <div className="group bg-white dark:bg-neutral-900 rounded-[1.5rem] p-4 border border-gray-100 dark:border-neutral-800 transition-all hover:shadow-xl flex flex-col">
      <div className="relative w-full h-56 mb-5 overflow-hidden rounded-2xl bg-[#f7f7f7] dark:bg-neutral-800">
        <Image
          src={imageSrc}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        {product.discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
            -{product.discount}%
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 px-1">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] font-bold text-teal-600 uppercase tracking-tighter">
            {product.brand}
          </span>
          <div className="flex items-center gap-1 text-[10px] text-orange-500 font-bold">
            ★ {product.rating}
          </div>
        </div>

        <h3 className="text-md font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {product.title}
        </h3>

        <div className="flex items-baseline gap-2 mt-auto">
          <span className="text-xl font-black text-gray-900 dark:text-white">
            ${product.priceAfterDiscount}
          </span>
          {product.discount > 0 && (
            <span className="text-gray-400 line-through text-xs font-medium">${product.price}</span>
          )}
        </div>

        <div className="flex items-center gap-2 w-full mt-5" dir={isArabic ? 'rtl' : 'ltr'}>
          {/* الزرار الأساسي */}
          <button className="flex-grow py-3.5 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold text-sm hover:opacity-90 transition-all active:scale-[0.98] shadow-sm">
            {isArabic ? 'إضافة للسلة' : 'Add to Cart'}
          </button>

          {/* أيقونة السلة كزرار جانبي */}
          <button className="p-3.5 border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors group">
            <Heart className="w-5 h-5 cursor-pointer text-gray-600 dark:text-gray-400 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
