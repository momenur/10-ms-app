/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5271ff",
        secondary: "#5ce1e6",
        red: "#de1304",
        dark: "#00020d",
        border: {
          DEFAULT: "#B7B7B7",
          regular: "#797979",
          dark: "#3B3B3B",
          light: "#D8E0ED",
        },
      },
      fontSize: {
        10: "10px",
        12: "12px",
        14: "14px",
        16: "16px",
        18: "18px",
        20: "20px",
        24: "24px",
        32: "32px",
        48: "48px",
      },
    },
  },
  plugins: [],
};
