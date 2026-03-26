// import Announcement from '../ui/Announcement';
import { Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Links from '../ui/Links';
import DropdownMenuIcons from '../ui/UserDrop';
import ThemeToggle from '../ui/Toggle';
import LangSwitcher from '../ui/LangToggle';
import { getServerSession } from 'next-auth';
import { getDictionary } from '@lib/dictionary';
import SearchBar from '../ui/SearchBar';

export default async function Navbar({ lang }: { lang: string }) {
  const session = await getServerSession();
  const dict = await getDictionary(lang);

  return (
    <header className="w-full fixed top-0 z-50 shadow-sm transition-colors">
      {/* <Announcement /> */}

      <nav className="w-full border-b bg-gray-200 dark:bg-black dark:border-neutral-800 py-2 px-4 md:px-6">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href={`/${lang}`}
            className="flex items-center gap-2 font-bold text-xl text-gray-800 dark:text-white hover:text-teal-700 dark:hover:text-teal-400 transition"
          >
            <img src="/assets/Logo.svg" alt="logo" className="h-8 w-8" />
            {dict.navbar.logo_name}
          </Link>

          {/* Search Bar */}
          <SearchBar lang={lang} dict={dict} />

          {/* Right Menu */}
          <div className="flex items-center gap-4 text-gray-800 dark:text-gray-200">
            <ThemeToggle />
            <LangSwitcher lang={lang} />

            {session?.user ? (
              <div className="flex items-center gap-3">
                {/* Cart */}
                <Link
                  href={`/${lang}/cart`}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-neutral-900 hover:bg-gray-200 dark:hover:bg-neutral-800 transition"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="hidden lg:inline">{dict.navbar.cart}</span>
                </Link>

                {/* Wishlist */}
                <Link
                  href={`/${lang}/wishlist`}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-neutral-900 hover:bg-gray-200 dark:hover:bg-neutral-800 transition"
                >
                  <Heart className="h-5 w-5 hover:text-red-500 transition" />
                </Link>

                <DropdownMenuIcons />
              </div>
            ) : (
              <div className="flex items-center gap-2 py-3">
                {/* Sign In */}
                <Link
                  href={`/${lang}/login`}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition w-full sm:w-auto min-w-[110px] text-center whitespace-nowrap"
                >
                  {dict.navbar.login}
                </Link>

                {/* Sign Up */}
                <Link
                  href={`/${lang}/register`}
                  // طبقنا نفس الخصائص لتوحيد الشكل
                  className="px-4 py-2 border border-gray-700 dark:border-gray-400 text-gray-800 dark:text-white rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-neutral-800 transition hidden sm:block min-w-[110px] text-center whitespace-nowrap"
                >
                  {dict.navbar.register}
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="bg-white dark:bg-black border-b dark:border-neutral-800">
        <Links lang={lang} />
      </div>
    </header>
  );
}
