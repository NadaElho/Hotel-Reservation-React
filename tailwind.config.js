/** @type {import('tailwindcss').Config} */
export default {
  darkMode:"selector",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { 
        'primary': '#52381D', 
        'secondary': '#AA9383',   
        'footer' : '#C5BDBA',
        'custom' : '#81664B'

    },
    fontFamily: {
      'secondary': 'playfair Display SC'
    },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}