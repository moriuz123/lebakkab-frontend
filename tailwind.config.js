/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Disable automatic dark mode based on prefers-color-scheme
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ColorHunt Palette: #e8edf2, #2c3947, #547a95, #c2a56d
        green: {
          50: '#e8edf2', // The lightest color
          100: '#d1dbe5',
          200: '#a3b7cb',
          300: '#7593b2',
          400: '#648ba8',
          500: '#547a95', // Primary Mid (Buttons, Cards)
          600: '#42637a',
          700: '#314b5f',
          800: '#2c3947', 
          900: '#2c3947', // Primary Dark (Hero BGs)
          950: '#1d2630',
        },
        emerald: {
          50: '#e8edf2',
          100: '#d1dbe5',
          200: '#a3b7cb',
          300: '#7593b2',
          400: '#648ba8',
          500: '#547a95', 
          600: '#42637a',
          700: '#314b5f',
          800: '#2c3947',
          900: '#2c3947', 
          950: '#1d2630',
        },
        // Muted Gold / Khaki Accent
        teal: {
          50: '#f9f6f0',
          100: '#f3ede2',
          200: '#e7dac4',
          300: '#dbc8a7',
          400: '#d0b589',
          500: '#c2a56d', // The Core Gold Accent (Buttons)
          600: '#c2a56d', // The Core Gold Accent (Hover)
          700: '#a8894f',
          800: '#82693d',
          900: '#5b4a2b',
          950: '#352b19',
        },
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
