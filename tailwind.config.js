/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Tailwind CSS가 적용될 파일 경로
  ],
  theme: {
    extend: {}, // 기본 테마 설정은 비워두고 필요할 경우 확장 가능
  },
  plugins: [], // 플러그인 없이 기본 설정
};
