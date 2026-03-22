/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // or 'selector' for Tailwind v3.4+
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  // tailwind.config.ts
  // tailwind.config.ts
  theme: {
    extend: {
      fontFamily: {
        arabic: ['var(--font-cairo)', 'sans-serif'],
        sans: ['var(--font-cairo)', 'sans-serif']
      }
    }
  },
  plugins: []
};
