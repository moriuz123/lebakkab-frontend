/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /*
         * MASTER UI: "LEBAK HARAPAN TERANG" (Vibrant Light Theme)
         * - Clean, authoritative, and extremely modern.
         */
        
        // Overriding green & emerald to "Ocean Slate & Sky Blue"
        green: {
          50: '#F8FAFC', // Ultra clean slate background
          100: '#F1F5F9', // Subtle gray-blue for cards
          200: '#E2E8F0', // Borders
          300: '#CBD5E1', 
          400: '#0EA5E9', // Sky Blue for secondary highlights
          500: '#2563EB', // Royal Blue (Primary Buttons)
          600: '#1D4ED8', // Royal Blue Hover
          700: '#1E40AF', 
          800: '#1E293B', // Slate 800 (Dark contrasts)
          900: '#0F172A', // Slate 900 (Stunning Dark Hero Background)
          950: '#020617',
        },
        emerald: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#0EA5E9',
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#1E40AF',
          800: '#1E293B',
          900: '#0F172A', 
          950: '#020617',
        },
        
        // Overriding teal to "Sunset Amber" for striking Accents & CTA
        teal: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B', // Vibrant Amber/Gold (CTA Buttons)
          600: '#D97706', // Hover for CTA
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
          950: '#451A03',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
