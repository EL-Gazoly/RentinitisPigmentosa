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
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      default: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      xxl: '1rem',
      full: '9999px',
      circle: '50%',
      thiry: '30px',
    },
    extend: {
      rotate :{
        '270' : '270deg',
      },
      blur :{
        '2' : '2px',
      },
      backgroundImage : {
        'SignUp' : "url('/src/assets/SignUpPic.png')",
      },
      height:{
        '100' : '30rem',
        '98' : '26rem',
      },
      width:{
        '120' : '31.75rem',
        '130' : '34rem',
        '150' : '39.75rem',
        '200': '52rem',
      },
      lineHeight:{
        '66': '66px'
      },
      colors: {
        primary: '#0072C6',
        darkPrimary: '#035EA0',
        bg: '#F5F5F5',
        secondary: '#838AA3',
        border : '#B2D4ED',
        line: '#4C9CD7',
        upload : '#846e33',
        chatbg : '#B2D4ED',
        lightblack :'#3F3D56',
        babyblack : 'rgba(0, 0, 0, 0.65)',
        lightblue : '#ECF1F5',
        forget : '#FF6584'
      },
      maxWidth : {
        'xxs' : '15rem',
      },
    },
  },
  plugins: [],
};