// src/components/common/Navbar.tsx
import { Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { getDictionary } from '@/lib/dictionary';

// Components
import Links from '../ui/Links';
import DropdownMenuIcons from '../ui/UserDrop';
import ThemeToggle from '../ui/Toggle';
import LangSwitcher from '../ui/LangToggle';
import SearchBar from '../ui/SearchBar';

export default async function Navbar({ lang }: { lang: string }) {
  const session = await getServerSession();
  const dict = await getDictionary(lang);

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 shadow-sm">
      <nav className="relative z-30 w-full border-b bg-white/95 dark:bg-black/95 backdrop-blur-md border-gray-100 dark:border-neutral-800 py-4 px-4 md:px-6">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Logo Section */}
          <Link
            href={`/${lang}`}
            className="flex items-center gap-2 group transition-transform active:scale-95"
          >
            <div className="p-1.5 bg-teal-600 rounded-xl group-hover:rotate-6 transition-transform">
              <img src="/assets/Logo.svg" alt="logo" className="h-7 w-7 brightness-0 invert" />
            </div>
            <span className="font-black text-2xl tracking-tight text-gray-900 dark:text-white uppercase">
              {dict.navbar.logo_name}
            </span>
          </Link>

          {/* Search Section  */}
          <div className="w-full lg:max-w-xl">
            <SearchBar lang={lang} dict={dict} />
          </div>

          {/* Action Icons Section */}
          <div className="flex items-center gap-2 md:gap-4 text-gray-700 dark:text-gray-200">
            <div className="flex items-center border-r dark:border-neutral-800 pe-2 md:pe-4 gap-2">
              <ThemeToggle />
              <LangSwitcher lang={lang} />
            </div>

            <div className="flex items-center gap-1 md:gap-3">
              {session?.user ? (
                <>
                  {/* Cart Link */}
                  <Link
                    href={`/${lang}/cart`}
                    className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-900 transition-colors group"
                  >
                    <ShoppingCart className="h-6 w-6 group-hover:text-teal-600 transition-colors" />
                    <span className="absolute -top-1 -right-1 bg-teal-600 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                      3
                    </span>
                  </Link>

                  {/* Wishlist Link */}
                  <Link
                    href={`/${lang}/wishlist`}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-900 transition-colors group"
                  >
                    <Heart className="h-6 w-6 group-hover:text-red-500 transition-colors" />
                  </Link>

                  <DropdownMenuIcons />
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href={`/${lang}/login`}
                    className="px-5 py-2 text-sm font-bold text-gray-700 dark:text-white hover:text-teal-600 transition"
                  >
                    {dict.navbar.login}
                  </Link>
                  <Link
                    href={`/${lang}/register`}
                    className="px-5 py-2 text-sm font-bold bg-teal-600 text-white rounded-full hover:bg-teal-700 shadow-md shadow-teal-500/20 transition active:scale-95"
                  >
                    {dict.navbar.register}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-20 w-full bg-white dark:bg-black border-b border-gray-100 dark:border-neutral-900">
        <div className="container mx-auto">
          <Links lang={lang} />
        </div>
      </div>
    </header>
  );
}
