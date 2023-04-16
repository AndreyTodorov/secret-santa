/** @type {import('tailwindcss').Config} */
const config = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("@tailwindcss/forms")],
};

module.exports = config;
