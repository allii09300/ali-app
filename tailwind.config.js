/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3b82f6", // blue-500
          dark: "#2563eb", // blue-600
          light: "#93c5fd", // blue-300
        },
        danger: {
          DEFAULT: "#ef4444", // red-500
          dark: "#dc2626", // red-600
          light: "#fca5a5", // red-300
        },
      },
    },
  },
  plugins: [],
};
