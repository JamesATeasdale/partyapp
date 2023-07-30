/** @type {import('tailwindcss').Config} */
// import "tailwindcss-react-native/types.d"
// tailwind.config.js

module.exports = {
  content: [
    "tailwindcss-react-native/types.d",
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundDefault: "#341154",
      },
    },
  },
  plugins: [],
};
