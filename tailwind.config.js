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
        // dark mode
        'PrimaryDark' : '#E2C8AD',
        'customDark' : '#1D1D1D'
,

        main: {
          10: '#E0E0E0',
          25: '#E2C8AD',
          50: '#F0C7AD',
          75: '#DDD1C5',
          100: '#AA9383',
          150: '#CBB7A4',
          200: '#997c6a',
          250: '#957866',
          300: '#997c6a',
          400: '#81664b',
          500: '#B4997E',
          600: '#7C6555',
          700: '#453D3A',
          800: '#52381D',
          900: '#FFB27A',
          1000: '#1D1D1D'
        },
        grey: {
          100: '#fff7f2',
          400: '#B9B9B9',
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
