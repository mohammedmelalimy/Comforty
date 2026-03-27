import { getDictionary } from '@/lib/dictionary';
import Image from 'next/image';
import Img from '@/assets/comforty.webp';
import img0 from '@/assets/dummy.jpg';
import NoAutoScroll from '../../_components/ui/AutoScroll';
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === 'ar' ? 'من نحن | كومفورتي' : 'About Us | Comforty',
    description:
      lang === 'ar'
        ? 'تعرف على قصة كومفورتي ورؤيتنا للأثاث المنزلي.'
        : 'Learn about Comforty story and our vision for home furniture.'
  };
}

export default async function AboutUsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const isArabic = lang === 'ar';

  const teamMembers = [
    { name: dict.about.team.m1, role: dict.about.team.founder, img: img0 },
    { name: dict.about.team.m2, role: dict.about.team.curator, img: img0 },
    { name: dict.about.team.m3, role: dict.about.team.craftsman, img: img0 }
  ];

  return (
    <main className={`w-full `}>
      <NoAutoScroll />
      {/* 1. Hero Section */}
      <section className="w-full bg-gray-100 dark:bg-neutral-900 py-12 text-center">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
            {dict.about.hero.title}
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {dict.about.hero.subtitle}
          </p>
        </div>
      </section>

      {/* 2. Our Story Section */}
      <section className="w-full py-16 md:py-24 bg-white dark:bg-black">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image Box */}
            <div className="relative h-96 w-full rounded-3xl overflow-hidden shadow-xl">
              <Image src={Img} alt="Comforty workshop" fill className="object-cover" />
            </div>
            {/* Text Box */}
            <div className={`space-y-6 ${isArabic ? 'text-right' : 'text-left'}`}>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {dict.about.story.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {dict.about.story.p1}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {dict.about.story.p2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Values Section */}
      <section className="w-full py-16 md:py-24 bg-gray-50 dark:bg-neutral-950">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2
            className={`text-3xl font-bold text-gray-900 dark:text-white mb-12 ${isArabic ? 'text-right' : 'text-left'}`}
          >
            {dict.about.values.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition hover:shadow-lg"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {dict.about.values[`v${i}_title`]}
                </h3>
                <p className="mt-3 text-gray-600 dark:text-gray-400">
                  {dict.about.values[`v${i}_desc`]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Team Section */}
      <section className="w-full py-16 md:py-24 bg-white dark:bg-black">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className={`text-3xl font-bold text-gray-900 dark:text-white mb-16 text-center`}>
            {dict.about.team.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="relative h-40 w-40 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-white dark:border-neutral-800 transform group-hover:scale-105 transition duration-300">
                  <Image src={member.img} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="mt-1 text-teal-600 dark:text-teal-400 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
