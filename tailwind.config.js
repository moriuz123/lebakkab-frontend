/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Disable automatic dark mode based on prefers-color-scheme
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        // SPBE Lebak Palette (Navy Blue & Gold)
        green: {
          50: '#e8f0fb',
          100: '#d1e1f7',
          200: '#a3c4f0',
          300: '#75a6e8',
          400: '#4789e1',
          500: '#1e5ca8', // var(--spbe-blue)
          600: '#184a86',
          700: '#123765',
          800: '#0a2463', // var(--spbe-navy)
          900: '#071840', // var(--spbe-navy-dark)
          950: '#040c20',
        },
        emerald: {
          50: '#e8f0fb',
          100: '#d1e1f7',
          200: '#a3c4f0',
          300: '#75a6e8',
          400: '#4789e1',
          500: '#1e5ca8', // var(--spbe-blue)
          600: '#184a86',
          700: '#123765',
          800: '#0a2463', // var(--spbe-navy)
          900: '#071840', // var(--spbe-navy-dark)
          950: '#040c20',
        },
        // SPBE Gold Accent
        teal: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#e8a020', // var(--spbe-gold)
          600: '#d99015', 
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        // SPBE Neutral/Monochrome Palette
        gray: {
          50: '#f8f9fc',  // var(--spbe-bg)
          100: '#e2e6f0', // var(--spbe-border)
          200: '#d4d9e6', 
          300: '#bbc3d6',
          400: '#9aa5bf',
          500: '#6b7898', // var(--spbe-muted)
          600: '#54607d',
          700: '#3a4567',
          800: '#1a2240', // var(--spbe-text)
          900: '#11172f',
          950: '#080c1a',
        },
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
