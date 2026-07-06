/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Disable automatic dark mode based on prefers-color-scheme
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
