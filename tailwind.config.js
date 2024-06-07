/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "san-serif"],
        anta: ["Anta", "san-serif"],
        mono: ["mono", "san-serif"],
        roboto: ["Roboto", "san-serif"]

      }
    },
  },
  plugins: [],
}

