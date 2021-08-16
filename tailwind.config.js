const colors = require("tailwindcss/colors")

/* MAIN COLORS 
  Eton Blue: #7DCCAB
  Tan: #D8C39B
  Dark Blue Gray: #645e9d
  Russian Violet: #392B58
  Dark Purple: #2d0320
*/

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.red,
      green: colors.emerald,
      purple: colors.violet,
      yellow: colors.amber,
      etonBlue: { DEFAULT: "#7DCCAB" },
      tan: { DEFAULT: "#D8C39B" },
      darkBlueGray: { DEFAULT: "#645e9d" },
      russianViolet: { DEFAULT: "#392B58" },
      darkPurple: { DEFAULT: "#2d0320" },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
