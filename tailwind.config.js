/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      body: ['"Inter"'],
    },
    extend: {
      colors: {
        threads: {
          gray: "#0f0f0f",
          "gray-light": "#7A7A7A",
          "gray-dark": "#1E1E1E",
          modal: "#414040",
        },
      },
    },
  },
  plugins: [],
};
