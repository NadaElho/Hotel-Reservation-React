/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'selector',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: { 
        'primary': '#52381D', 
        'secondary': '#AA9383',   
        'footer': '#C5BDBA',
        'custom': '#81664B',
        'body' : '#FFF7F2',
        main: {
          100: '#AA9383',
          200: '#997c6a',
          300: '#997c6a',
          400: '#81664b',
          800: '#52381D'
        },
        grey: {
          100: '#fff7f2',
          500: '#C5BDBA',
          600: '#464646'
        }
      },
      fontFamily: {
        'secondary': ['Playfair Display SC', 'serif']
      }
    },
  },
  plugins: [
  ],
};
