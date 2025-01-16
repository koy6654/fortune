/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        pridi: ['Pridi', 'serif'],
        'pridi-regular': ['Pridi-Regular', 'serif'],
        'pridi-medium': ['Pridi-Medium', 'serif'],
        'pridi-bold': ['Pridi-Bold', 'serif'],
        'pridi-semibold': ['Pridi-SemiBold', 'serif'],
        pretendard: ['Pretendard'],
      },
    },
  },
  plugins: [],
};
