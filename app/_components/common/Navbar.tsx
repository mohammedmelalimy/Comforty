'use client';

import Announcement from '../ui/Announcement';
import { Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Links from '../ui/Links';
import DropdownMenuIcons from '../ui/UserDrop';
import { useSession } from 'next-auth/react';
import ThemeToggle from '../ui/Toggle';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="w-full border-b bg-gray-200 dark:bg-black dark:border-neutral-800 shadow-sm sticky top-0 z-50">
      <Announcement />

      <nav className="w-full border-b bg-gray-200 dark:bg-black dark:border-neutral-800 shadow-sm">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 py-2 px-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-gray-800 dark:text-white hover:text-teal-700 dark:hover:text-teal-400 transition"
          >
            <img src="/assets/Logo.svg" alt="logo" className="h-8 w-8" />
            Comforty
          </Link>

          {/* Search Bar */}
          <div className="flex-1 flex justify-center w-full">
            <input
              type="text"
              placeholder="Search for furniture, decor, lighting..."
              className="w-full sm:w-[60%] px-4 py-2 rounded-lg border border-gray-300 
              bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 
              text-gray-900 dark:text-white 
              placeholder-gray-500 dark:placeholder-gray-400
              shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
          </div>

          {/* Right Menu */}
          <div className="flex items-center gap-6 text-gray-800 dark:text-gray-200">
            <ThemeToggle />

            {session?.user ? (
              <>
                {/* Cart */}
                <Link
                  href="/cart"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg 
                  bg-gray-100 dark:bg-neutral-900 
                  hover:bg-gray-200 dark:hover:bg-neutral-800 
                  transition"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Cart</span>
                </Link>

                {/* Wishlist */}
                <Link
                  href="/wishlist"
                  className="px-3 py-2 rounded-lg 
                  bg-gray-100 dark:bg-neutral-900 
                  hover:bg-gray-200 dark:hover:bg-neutral-800 
                  transition"
                >
                  <Heart className="h-5 w-5 text-gray-700 dark:text-gray-300 hover:text-red-500 transition" />
                </Link>

                <DropdownMenuIcons />
              </>
            ) : (
              <>
                {/* Sign In */}
                <Link
                  href="/login"
                  className="px-5 py-2 bg-teal-600 text-white rounded-lg 
                  font-semibold hover:bg-teal-700 transition"
                >
                  Sign In
                </Link>

                {/* Sign Up */}
                <Link
                  href="/register"
                  className="px-5 py-2 border border-gray-700 dark:border-gray-400 
                  text-gray-800 dark:text-white rounded-lg 
                  font-semibold hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Bottom Links */}
        <Links />
      </nav>
    </div>
  );
}
