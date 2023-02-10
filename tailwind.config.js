/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Brand: "#7148fc",
        Darkest: "#0c121c",
        Dark: "#1e293b",
        Mid: "#b8bfc6",
        Light: "#d6dee7",
        Lightest: "#ffffff",
      },

      
    },
  },
  plugins: [],
}
