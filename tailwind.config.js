import flowbite from "flowbite-react/tailwind";
const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
const { parseColor } = require("tailwindcss/lib/util/color");

const toRGB = (value) => {
  return parseColor(value).color.join(" ");
};

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      backdropBlur: {
        blur: "3px", // yangi sinf
      },
      screens: {
        mobil330: "340px",
      },
      animation: {
        flip: "flip 1s infinite",
      },
      keyframes: {
        flip: {
          "0%": { transform: "rotate(0)" },
          "50%": { transform: "rotateY(180deg)" },
          "100%": { transform: "rotateY(180deg) rotateX(180deg)" },
        },
      },
      fontFamily: {
        "open-sans": "Open Sans, Arial, Helvetica, sans-serif",
      },
      colors: {
        dark: {
          primary: "rgb(var(--color-dark) / <alpha-value>)",
          secondary: "rgb(var(--color-dark-secondary) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [
    flowbite.plugin(),
    plugin(function ({ addBase }) {
      addBase({
        ":root": {
          "--color-dark": toRGB("#212327"),
          "--color-dark-secondary": toRGB("#292A2D"),
        },
      });
    }),
  ],
};
