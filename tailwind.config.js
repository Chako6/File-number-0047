/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0D1B2A',
          light: '#152538',
          dark: '#070F18',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#D9BC72',
          dark: '#A8882E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
      },
    },
  },
  plugins: [],
};
