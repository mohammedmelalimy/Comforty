import { getDictionary } from '../../../../lib/dictionary';
import RegisterPage from '../../_components/common/authComponents/RegisterPage';

const page = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <div>
      <RegisterPage lang={lang} dict={dict} />
    </div>
  );
};

export default page;
