// app/[lang]/forgotPassword/page.tsx
import { getDictionary } from '@/lib/dictionary';
import ResetPage from '../../_components/common/authComponents/Reset';

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ResetPage dict={dict} lang={lang} />;
}
