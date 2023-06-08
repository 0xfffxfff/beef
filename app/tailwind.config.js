/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        hmd: { raw: "(min-height: 500px)" },
        hlg: { raw: "(min-height: 780px)" },
      },
    },
  },
  plugins: [],
};
