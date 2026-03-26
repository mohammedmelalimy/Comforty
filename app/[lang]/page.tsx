import { Suspense } from 'react';
import Hero from './_components/ui/Hero/Hero';
import { Products } from './_components/common/Products';

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isArabic = lang === 'ar';

  return (
    <main className="flex min-h-screen flex-col items-center py-8 gap-12 bg-gray-50 dark:bg-[#0a0a0a]">
      <Hero lang={lang} />

      <section className="w-[95%] max-w-7xl mx-auto px-4" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="mb-10 text-center md:text-start">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
            {isArabic ? 'تشكيلة الأثاث العصري' : 'Modern Furniture Collection'}
          </h2>
          <p className="text-gray-500">
            {isArabic ? 'قطع مختارة بعناية لتناسب ذوقك' : 'Carefully selected pieces for your home'}
          </p>
        </div>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-lg" />
              ))}
            </div>
          }
        >
          <Products lang={lang} />
        </Suspense>
      </section>
    </main>
  );
}
