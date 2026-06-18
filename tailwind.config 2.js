/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'card-dark': '#0f172a',
        'background': '#030c18',
        'primary': '#0ea5e9',
        'accent': '#10b981',
      },
      fontFamily: {
        sans: ['Barlow', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
