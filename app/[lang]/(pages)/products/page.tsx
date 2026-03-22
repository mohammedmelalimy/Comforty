import Image from 'next/image';

interface Product {
  id: number;
  title: string;
  brand: string;
  price: number;
  priceAfterDiscount: number;
  discount: number;
  rating: number;
  image: string;
  category: string;
}

async function getFurnitureData() {
  try {
    const res = await fetch('https://api.npoint.io/664dbf69f3cc3b9c6544', {
      next: { revalidate: 3600 }
    });
    if (!res.ok) throw new Error('Fetch failed');
    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error('Error fetching furniture:', error);
    return [];
  }
}

export default async function page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const products: Product[] = await getFurnitureData();
  const isArabic = lang === 'ar';

  return (
    <main className="flex min-h-screen flex-col items-center py-8 gap-12 bg-gray-50 dark:bg-[#0a0a0a]">
      <section className="w-[95%] max-w-7xl mx-auto px-4" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="mb-10 text-center md:text-start">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
            {isArabic ? 'تشكيلة الأثاث العصري' : 'Modern Furniture Collection'}
          </h2>
          <p className="text-gray-500">
            {isArabic ? 'قطع مختارة بعناية لتناسب ذوقك' : 'Carefully selected pieces for your home'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            const imageSrc = product.image || null;
            if (!imageSrc) return null;

            return (
              <div
                key={product.id}
                className="group bg-white dark:bg-neutral-900 rounded-[1.5rem] p-4 border border-gray-100 dark:border-neutral-800 transition-all hover:shadow-xl flex flex-col"
              >
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
                      <span className="text-gray-400 line-through text-xs font-medium">
                        ${product.price}
                      </span>
                    )}
                  </div>

                  <button
                    suppressHydrationWarning
                    className="w-full mt-5 py-3.5 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold text-xs hover:opacity-80 transition-opacity active:scale-95"
                  >
                    {isArabic ? 'إضافة للسلة' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
