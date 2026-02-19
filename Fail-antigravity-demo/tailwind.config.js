/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#15803d',   // Green-700
        'primary-dark': '#14532d', // Green-900 
        'primary-light': '#16a34a', // Green-600
        secondary: '#fbbf24', // Amber-400 (Yellow/Gold)
        'secondary-light': '#fcd34d', // Amber-300
      },
    },
  },
  plugins: [],
}
