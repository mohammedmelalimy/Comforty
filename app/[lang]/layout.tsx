import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './_components/common/Navbar';
import { Toaster } from '@/components/ui/sonner';
import { Metadata } from 'next';
import SplashScreen from './_components/ui/Splach';
import UserProvider from './UserProvider';
import { ThemeProvider } from './_components/ui/ThemeProvider';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700'] });

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
      suppressHydrationWarning
      className={inter.className}
    >
      <body className={isArabic ? 'font-arabic' : ''}>
        <ThemeProvider>
          <UserProvider>
            <Navbar lang={lang} />
            <Toaster position="top-center" />
            <SplashScreen />
            {children}
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
