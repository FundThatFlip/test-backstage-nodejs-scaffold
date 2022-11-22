const { tailwindTheme } = require('@fundthatflip/ftf-ui-component-library');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: tailwindTheme,
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
