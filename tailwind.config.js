/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C8A75B',
        secondary: '#0A1A2F',
      },
    },
  },
  plugins: [],
}

