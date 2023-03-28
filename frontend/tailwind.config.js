/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Open Sans', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif'],
      nunito: ['Nunito', 'sans-serif'],
      poppins : ['Poppins', 'sans-serif'],
    },
    extend: {
      rotate :{
        '270' : '270deg',
      },
      colors: {
        primary: '#0072C6',
        bg: '#F5F5F5',
        secondary: '#838AA3',
        border : '#B2D4ED',
        line: '#4C9CD7',
        upload : '#846e33',
      },
    },
  },
  plugins: [],
};