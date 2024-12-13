/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Cores usada no projeto
      colors: {
        primary: "#2B85FF",
        secondary: "#EF863E",
      },
      dropShadow: {
        blue: "0 10px 10px rgba(0, 0, 205, 0.25)",
      },
    },
  },
  plugins: [],
};
