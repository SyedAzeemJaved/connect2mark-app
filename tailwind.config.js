/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx}",
    "./src/screens/**/*.{js,jsx}",
    "./src/**/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#333D55",
        secondary: "#1E1E1E",
      },
      fontFamily: {
        poppins: ["Poppins"],
        marcellus: ["MarcellusSc"],
      },
    },
  },
  plugins: [],
};
