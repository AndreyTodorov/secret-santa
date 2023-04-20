/** @type {import('tailwindcss').Config} */
const config = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("@tailwindcss/forms")],
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
};

module.exports = config;
