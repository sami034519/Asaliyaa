/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#54972c',    // Custom primary color
        secondary: '#f8ad16',  // Custom secondary color
      },
    },
  },
  plugins: [],
}
