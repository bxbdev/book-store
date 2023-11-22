/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        source: "var(--source)",
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        bold: 900,
      },
      colors: {
        primary: "#F96587",
      },
    },
  },
  plugins: [],
};
