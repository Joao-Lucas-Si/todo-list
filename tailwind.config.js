/** @type {import('tailwindcss').Config} */
// import colors from 'tailwindcss/colors'
const colors = require('tailwindcss/colors')


module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      dark: colors.gray[800],
      light: colors.gray[50],
      primary: colors.indigo[600],
      positive: colors.green[600],
      negative: colors.red[600],
    },
    extend: {
      keyframes: {
        appear: {
          from: "left: 100%",
          to: "left: 0%"
        }
      },
      animation: {
        'appear': '2s appear ease-in-out'
      }
    },
  },
  plugins: [
    // themeVariants({
    //   themes: {
    //     light: {
    //       selector: ".light",
    //       // mediaQuery: prefersLight /* "@media (prefers-color-scheme: light)" */,
    //     },
    //     dark: {
    //       selector: ".dark",
    //       // mediaQuery: prefersDark /* "@media (prefers-color-scheme: dark)" */,
    //     },
    //   },
    // }),
  ],
};
