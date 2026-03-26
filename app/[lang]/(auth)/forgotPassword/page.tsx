import { getDictionary } from '@/lib/dictionary';
import ForgetPassword from '../../_components/common/authComponents/ForgetPassword';

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ForgetPassword dict={dict} lang={lang} />;
}
