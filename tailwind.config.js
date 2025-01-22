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
      /**
       * @example
       * <div class="bg-home-modal-radial">...</div>
       */
      backgroundImage: {
        'home-modal-radial':
          'radial-gradient(108.21% 50% at 50% 50%, rgba(149, 97, 52, 0.90) 0%, rgba(98, 55, 17, 0.90) 100%)',
      },
    },
  },
  plugins: [],
};
