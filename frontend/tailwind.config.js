/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E8F0FF",
          100: "#C1DAFF",
          200: "#9AC4FF",
          300: "#73AEFF",
          400: "#4C98FF",
          500: "#004AAD",
          600: "#003A8A",
          700: "#002B66",
          800: "#001D44",
          900: "#000E22",
        },
        accent: {
          50: "#FFF9E8",
          100: "#FFF0C2",
          200: "#FFE79C",
          300: "#FFDE75",
          400: "#FFD54F",
          500: "#F7B32B",
          600: "#DF9F26",
          700: "#C78B21",
          800: "#AF771C",
          900: "#976317",
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
  },
};
