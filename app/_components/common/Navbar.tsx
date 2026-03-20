'use client';

import React from 'react';
import Announcement from '../ui/Announcement';
import { Heart, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import Links from '../ui/Links';
import DropdownMenuIcons from '../ui/UserDrop';

const Navbar = () => {
  return (
    <div className="w-full border-b bg-gray-200 shadow-sm sticky top-0 z-50">
      <Announcement />
      <nav className="w-full border-b bg-gray-200 shadow-sm">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 py-2 px-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-gray-800 hover:text-teal-700 transition"
          >
            <img src="/assets/Logo.svg" alt="logo" className="h-8 w-8" />
            Comforty
          </Link>

          {/* Search Bar */}
          <div className="flex-1 flex justify-center w-full">
            <input
              type="text"
              placeholder="Search for furniture, decor, lighting..."
              className="w-full sm:w-[60%] px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 
              shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
          </div>

          {/* Right Menu */}
          <div className="flex items-center gap-6">
            {/* Cart */}
            <Link
              href="/cart"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 
              hover:bg-gray-200 text-gray-700 transition"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="font-medium">Cart</span>
            </Link>

            {/* Wishlist */}
            <Link href="/wishlist">
              <Heart className="h-5 w-5 text-gray-700 hover:text-red-500 transition" />
            </Link>

            <DropdownMenuIcons />

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
              className="px-5 py-2 border border-gray-700 text-gray-800 rounded-lg 
              font-semibold hover:bg-gray-100 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
      <Links />
    </div>
  );
};

export default Navbar;
