/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // or 'selector' for Tailwind v3.4+
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  // tailwind.config.ts
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui'],
        arabic: ['var(--font-cairo)', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
};
