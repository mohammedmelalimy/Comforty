'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { SunDim, MoonIcon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Ensure client and server HTML match
  }, []);

  if (!mounted) {
    return (
      <button className="p-2 rounded bg-gray-200 dark:bg-gray-950" aria-label="Toggle theme">
        {/* Render a neutral placeholder icon to avoid mismatch */}
        <div className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded bg-gray-200 dark:bg-gray-950 cursor-pointer"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <SunDim /> : <MoonIcon />}
    </button>
  );
}
