/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#333D55',
        secondary: '#1E1E1E',
      },
      fontFamily: {
        poppins: ['Poppins'],
        marcellus: ['MarcellusSc'],
      },
    },
  },
  plugins: [],
};
