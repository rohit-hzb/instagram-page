/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // for React projects
    "./public/**/*.html",         // optional: public HTML
    "./backend/**/*.{js,ts}",     // if you're styling Node.js rendered content
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
