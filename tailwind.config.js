/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        pridi: ['Pridi', 'serif'],
        pretendard: ['Pretendard'],
      },
    },
  },
  plugins: [],
};
