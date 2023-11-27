/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        source: "var(--source)",
      },
      padding: {
        30: "30px",
      },
      width: {
        30: "30px",
      },
      height: {
        30: "30px",
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
      colors: {
        primary: "#F96587",
        dark: "#322E2F",
        gray: {
          A5: "#A5A5A5",
        },
      },
    },
  },
  plugins: [],
};
