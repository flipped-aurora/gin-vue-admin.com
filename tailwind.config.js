/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./docs/**/*.{vue,js,ts,jsx,tsx,md}",
    "./docs/.vitepress/**/*.{vue,js,ts,jsx,tsx,md}",
  ],
  theme: {
    extend: {},
  },
  darkMode : 'class',
  important: true,
  plugins: [],
}

