/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        pizzaorange: '#ff6900',
      },
    },
    fontFamily: {
      narrow: ['PT Sans Narrow', 'sans-serif'],
    },
  },
  plugins: [],
};
