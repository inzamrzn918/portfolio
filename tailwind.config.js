/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#0a0118',
        'card': '#0f0627',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, rgb(59, 130, 246), rgb(147, 51, 234))',
      }
    }
  },
  plugins: [],
}
