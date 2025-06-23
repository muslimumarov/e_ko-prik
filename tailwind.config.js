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
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
      },
      keyframes: {
        flip: {
          "0%": { transform: "rotate(0)" },
          "50%": { transform: "rotateY(180deg)" },
          "100%": { transform: "rotateY(180deg) rotateX(180deg)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
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
