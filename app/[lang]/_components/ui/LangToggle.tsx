'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function LangSwitcher({ lang }: { lang: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const toggleLanguage = () => {
    const segments = pathname.split('/');
    segments[1] = lang === 'ar' ? 'en' : 'ar';

    const newPath = segments.join('/');
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1.5 border border-gray-300 dark:border-neutral-700 rounded-md text-sm font-bold hover:bg-gray-100 dark:hover:bg-neutral-800 transition-all"
    >
      {lang === 'ar' ? 'English' : 'العربية'}
    </button>
  );
}
