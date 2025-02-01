/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,js,jsx,ts,tsx,css}'],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      }
    },
  },
  plugins: [],
};
