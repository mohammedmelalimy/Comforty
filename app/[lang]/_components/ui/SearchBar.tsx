'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

const SearchBar = ({ lang, dict }: { lang: string; dict: any }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length > 2) {
        fetch(`/api/search?q=${query}`)
          .then((res) => res.json())
          .then((data) => setResults(data));
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="w-full relative">
      <form
        className="flex w-full md:w-[70%] mx-auto items-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder={dict.navbar.search_placeholder}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 
                    bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 
                    text-gray-900 dark:text-white 
                    placeholder-gray-500 dark:placeholder-gray-400
                    shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
        />
      </form>
      {results.length > 0 && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-full md:w-[70%] bg-white dark:bg-neutral-900 shadow-xl border dark:border-neutral-700 mt-2 rounded-lg z-[9999] max-h-60 overflow-y-auto">
          {results.map((product: any) => (
            <div
              key={product.id}
              className="p-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer border-b last:border-0 dark:border-neutral-800"
            >
              <Image
                src={product.image}
                alt={product.title}
                width={50}
                height={50}
                className="w-16 h-16 object-cover rounded-lg"
                unoptimized
              />
              <p className="text-sm font-medium dark:text-white">{product.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
