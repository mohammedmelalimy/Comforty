// app/[lang]/login/page.tsx
import LoginPage from '../../_components/common/authComponents/LoginPage';
import { getDictionary } from '../../../../lib/dictionary';

const Page = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params;

  const dict = await getDictionary(lang);

  return (
    <main>
      <LoginPage dict={dict} lang={lang} />
    </main>
  );
};

export default Page;
