'use client';
import { MenuIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface LinksProps {
  lang: string;
}

const Links = ({ lang }: LinksProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const isArabic = lang === 'ar';

  const menuItems = [
    { name: isArabic ? 'الرئيسية' : 'Home', path: '/' },
    { name: isArabic ? 'المتجر' : 'Shop', path: '/shop' },
    { name: isArabic ? 'المنتجات' : 'Products', path: '/products' },
    { name: isArabic ? 'من نحن' : 'About', path: '/about' }
  ];

  return (
    <nav className="w-full bg-white dark:bg-black shadow-sm border-b border-gray-300 dark:border-gray-700 relative transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 md:px-6">
        <button
          className="md:hidden p-2 -ml-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <XIcon className="h-6 w-6 text-black dark:text-white" />
          ) : (
            <MenuIcon className="h-6 w-6 text-black dark:text-white" />
          )}
        </button>

        <ul
          className={`
            absolute md:static left-0 top-full w-full md:w-auto
            flex flex-col md:flex-row items-start md:items-center gap-0 md:gap-8
            bg-white dark:bg-black border-b dark:border-gray-700 md:border-none
            shadow-xl md:shadow-none
            transition-all duration-300 ease-in-out origin-top
            ${
              isOpen
                ? 'opacity-100 scale-y-100 visible'
                : 'opacity-0 scale-y-0 invisible md:opacity-100 md:scale-y-100 md:visible'
            }
          `}
        >
          {/* All Categories */}
          <li className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-500 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition font-medium text-black dark:text-white ml-2">
            <MenuIcon className="h-5 w-5" />
            {isArabic ? 'كل الأقسام' : 'All Categories'}
          </li>

          {menuItems.map((item) => (
            <li key={item.name} className="w-full md:w-auto relative">
              <Link
                href={`/${lang}${item.path === '/' ? '' : item.path}`}
                onClick={() => setIsOpen(false)}
                className="
                  block w-full px-6 py-4 md:p-2
                  text-gray-800 dark:text-gray-200 
                  font-medium 
                  relative
                  after:block after:absolute after:bottom-0 after:left-0 after:h-0.5 
                  after:w-0 after:bg-gray-800 dark:after:bg-gray-200 
                  after:transition-all after:duration-300
                  hover:after:w-full
                "
                scroll={false}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex"></div>
      </div>
    </nav>
  );
};

export default Links;
