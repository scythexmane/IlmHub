/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "dark:bg-neutral-900",
    "dark:text-white",
    "dark:border-gray-700",
    "dark:shadow-lg",
    "dark:bg-gray-800",
    "dark:text-gray-200",
    "dark:bg-[var(--color-bg)]",
  ],
  theme: {
    extend: {
      animation: {
        "gradient-xy": "gradientXY 8s ease infinite",
      },
      keyframes: {
        gradientXY: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Gilroy", "sans-serif"],
      },
      boxShadow: {
        "3d-light":
          "0px 10px 30px rgba(0, 0, 0, 0.15), 0px 4px 10px rgba(0, 0, 0, 0.05)",
        "3d-dark":
          "0px 10px 30px rgba(0, 0, 0, 0.4), 0px 4px 10px rgba(0, 0, 0, 0.15)",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      transitionTimingFunction: {
        "cubic-bezier": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    function ({ addUtilities }) {
      addUtilities(
        {
          ".text-shadow": {
            "text-shadow": "0px 2px 4px rgba(0, 0, 0, 0.2)",
          },
          ".text-shadow-lg": {
            "text-shadow": "0px 4px 8px rgba(0, 0, 0, 0.3)",
          },
        },
        ["responsive", "hover"]
      );
    },
  ],
};
