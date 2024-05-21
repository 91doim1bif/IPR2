/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-image": "url('/images/hero.jpg')", // Adjust the URL to your image path
      },
    },
  },
  plugins: [],
};
