import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Links = () => {
  return (
    <div className="w-full bg-white shadow-sm border-b">
      <div className="container mx-auto flex items-center justify-between py-1 px-4">
        {/* Left Navigation */}
        <ul className="flex items-center gap-10">
          {/* Categories */}
          <li
            className="flex items-center gap-2 px-4 py-2 
            bg-gray-100 border border-gray-300 rounded-lg cursor-pointer
            hover:bg-gray-200 transition-all duration-200 font-medium
          "
          >
            <MenuIcon className="h-5 w-5" />
            All Categories
          </li>

          {/* Navigation Links */}
          <li className="hover:text-teal-600 transition ">
            <Link href="/">Home</Link>
          </li>

          <li className="hover:text-teal-600 transition ">
            <Link href="/shop">Shop</Link>
          </li>

          <li className="hover:text-teal-600 transition ">
            <Link href="/products">Products</Link>
          </li>

          <li className="hover:text-teal-600 transition ">
            <Link href="/about">About</Link>
          </li>
        </ul>

        {/* Contact */}
        <p className="text-sm font-medium text-gray-600">
          Contact: <span className="text-teal-700 font-semibold">(808) 555-0111</span>
        </p>
      </div>
    </div>
  );
};

export default Links;
