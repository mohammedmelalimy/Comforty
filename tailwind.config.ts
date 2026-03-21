/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // or 'selector' for Tailwind v3.4+
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif']
      }
    }
  },
  plugins: []
};
