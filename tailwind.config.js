/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#B0102A",
          soft: "#E04755",
        },
        canvas: "#050505",
      },
      fontFamily: {
        sans: [
          '"SF Pro Display"',
          '"SF Pro Text"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Inter",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 40px 120px rgba(176,16,42,0.35)",
      },
    },
  },
  plugins: [],
};
