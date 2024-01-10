/** @type {import('tailwindcss').Config} */

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    // colors: {
    //   transparent: "transparent",
    //   current: "currentColor",
    //   black: colors.black,
    //   white: colors.white,
    //   gray: colors.trueGray,
    //   indigo: colors.indigo,
    //   red: colors.rose,
    //   yellow: colors.amber,
    //   green-400: { DEFAULT: "#7dccab", light: "#8AD2B4" },
    //   tan: { DEFAULT: "#D8C39B", light: "#DCC9A5" },
    //   darkBlueGray: { DEFAULT: "#645e9d", light: "#716BA6" },
    //   purple-900: { DEFAULT: "#392B58", light: "#493770" },
    //   darkPurple: { DEFAULT: "#2d0320", light: "#52053A" },
    // },
    fontFamily: {
      body: ["Fredoka One", "cursive"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
