/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Disable automatic dark mode based on prefers-color-scheme
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Overriding green & emerald to match SPBE Lebak Blue Theme
        green: {
          50: '#e8f0fb',
          100: '#d1e1f7',
          200: '#a3c4f0',
          300: '#75a6e8',
          400: '#4789e1',
          500: '#1e5ca8', // Primary SPBE
          600: '#184a86',
          700: '#123765',
          800: '#0a2463', // Secondary SPBE
          900: '#071840', // Darkest SPBE
          950: '#040c20',
        },
        emerald: {
          50: '#e8f0fb',
          100: '#d1e1f7',
          200: '#a3c4f0',
          300: '#75a6e8',
          400: '#4789e1',
          500: '#1e5ca8',
          600: '#184a86',
          700: '#123765',
          800: '#0a2463',
          900: '#071840',
          950: '#040c20',
        },
        // We can override teal for gradient accents to something golden/amber
        teal: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f5b030', // SPBE Gold hover
          600: '#e8a020', // SPBE Gold
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
