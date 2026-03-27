import { Suspense } from 'react';
import Hero from './_components/ui/Hero/Hero';
import { Products } from './_components/common/Products';

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isArabic = lang === 'ar';

  return (
    // أضفنا w-full لضمان أن الـ main يملأ العرض بالكامل
    <main className="w-full flex min-h-screen flex-col items-center bg-gray-50 dark:bg-[#0a0a0a]">
      {/* الـ Hero لازم يكون أول عنصر ومساحته مظبوطة مع الناف بار الاستيكي */}
      <Hero lang={lang} />

      {/* الـ Section هنا محتاج مساحة علوية بسيطة عشان ميبقاش لازق في الهيرو */}
      <section className="w-full max-w-7xl mx-auto px-4 py-16" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="mb-12 text-center md:text-start border-s-4 border-teal-600 ps-4">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
            {isArabic ? 'تشكيلة الأثاث العصري' : 'Modern Furniture Collection'}
          </h2>
          <p className="text-gray-500 max-w-xl">
            {isArabic
              ? 'قطع مختارة بعناية لتناسب ذوقك الرفيع في تأثيث منزلك.'
              : 'Carefully selected pieces for your home with premium quality.'}
          </p>
        </div>

        <Suspense fallback={<ProductsSkeleton />}>
          <Products lang={lang} />
        </Suspense>
      </section>
    </main>
  );
}

// مكون فرعي للـ Loading عشان الكود يبقى أنظف
function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="h-72 bg-gray-200 dark:bg-neutral-800 animate-pulse rounded-2xl" />
      ))}
    </div>
  );
}
