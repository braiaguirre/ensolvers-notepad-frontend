/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,html}",
  ],
  theme: {
    screens: {
      'sm': '100px',
      'md': '990px',
      'lg': '1330px',
      'xl': '1650px',
      '2xl': '1950px'
    },
    colors: {
      white: '#ffffff',
      black: '#000000',
      popupBackground: 'rgba(0, 0, 0, 0.5)',
      selected: '#9d8189',
      border: '#f4acb7',
      input: '#d6ccc2',
      notes: '#f9eff2',
      notesBorder: '#f0e7e9'
    },
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}

