/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        source: "var(--source)",
      },
      padding: {
        7.5: "30px",
        15: "60px",
        37.5: "150px",
      },
      width: {
        7.5: "30px",
        15: "60px",
        37.5: "150px",
      },
      height: {
        7.5: "30px",
        15: "60px",
        37.5: "150px",
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
