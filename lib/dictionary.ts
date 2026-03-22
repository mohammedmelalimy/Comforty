import 'server-only';

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  ar: () => import('@/dictionaries/ar.json').then((module) => module.default)
};

export const getDictionary = async (locale: string) => {
  const lang = locale === 'ar' || locale === 'en' ? locale : 'en';
  return dictionaries[lang]();
};
