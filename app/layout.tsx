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
  description:
    'Welcome to our e-commerce platform! Explore a wide range of products and enjoy seamless shopping experience.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <body>
        <ThemeProvider>
          <UserProvider>
            <Navbar />
            <Toaster position="top-center" />
            <SplashScreen />
            {children}
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
