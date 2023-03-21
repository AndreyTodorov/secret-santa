/** @type {import('tailwindcss').Config} */
const config = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    styled: true,
    base: true,
    darkTheme: "dark",
    themes: ["light", "dark", "coffee"],
  },
  plugins: [require("daisyui"), require("@tailwindcss/forms")],
};

module.exports = config;
