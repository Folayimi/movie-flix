/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#E6F4FE",
        secondary: "#FFFAF0",
        accent: "#FF6F61",
        background: "#FFFFFF",
        foreground: "#000000",
        muted: "#F5F5F5",
        highlight: "#FFEB3B",
        border: "#E0E0E0",
        success: "#4CAF50",
        warning: "#FFC107",
        error: "#F44336",
      },
    },
  },
  plugins: [],
};
