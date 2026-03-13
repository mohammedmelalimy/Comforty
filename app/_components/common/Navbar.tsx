'use client';

import React from 'react';
import Announcement from '../ui/Announcement';
import { Heart, ShoppingCart, User } from 'lucide-react';
import DropdownMenuIcons from '../ui/UserDrop';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';

const Navbar = () => {
  return (
    <>
      <Announcement />

      <div className="w-full bg-gray-200 shadow-md">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between py-3 px-4 text-sm text-black">
          {/* Logo */}
          <Link
            href={'/'}
            className="flex gap-2 items-center font-bold text-lg cursor-pointer hover:text-sky-800 mb-2 sm:mb-0"
          >
            <img src="/assets/Logo.svg" alt="logo" className="h-8 w-8" />
            Comforty
          </Link>

          {/* Search */}
          <div className="flex justify-center flex-1 mb-2 sm:mb-0">
            <input
              type="text"
              placeholder="Search..."
              className="w-full sm:w-1/2 p-2 bg-gray-50 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          {/* Icons & Cart */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 cursor-pointer bg-sky-200 p-2 rounded hover:text-sky-800 transition-transform transform hover:scale-105">
              {' '}
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
            </div>
            <Heart className="h-5 w-5 cursor-pointer hover:text-red-500 transition-colors" />
            <Link
              href="/login"
              className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white 
              rounded-lg font-semibold transition-all duration-200 
              inline-block text-center"
            >
              Sign In
            </Link>

            <Link
              href="/register"
              className="px-6 py-2 border border-black text-black bg-white 
             hover:bg-gray-100 rounded-lg font-semibold 
             transition-all duration-200 inline-block text-center"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
