import { Cairo } from 'next/font/google';
import './globals.css';
import Navbar from './_components/common/Navbar';
import { Toaster } from '@/components/ui/sonner';
import { Metadata } from 'next';
import UserProvider from './UserProvider';
import { ThemeProvider } from './_components/ui/ThemeProvider';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-cairo'
});

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to our e-commerce platform!'
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isArabic = lang === 'ar';

  return (
    <html
      lang={lang}
      dir={isArabic ? 'rtl' : 'ltr'}
      className={`${cairo.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col transition-colors duration-300 bg-white dark:bg-black">
        <ThemeProvider>
          <UserProvider>
            <Navbar lang={lang} />
            <Toaster position="top-center" />
            <main className="flex-1 pt-72 lg:pt-44">{children}</main>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
