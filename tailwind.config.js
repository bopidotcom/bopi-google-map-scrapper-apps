/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/renderer/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#6ACCDC',
        'light': '#ffffff',
        'black': '#000000',
        'dark': '#1C304F',
        'green': '#7ADC6A',
        'red': '#DC6A6A',
        'light-gray': '#E8E8E8',
        'gray': '#B0B1B1',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        'none': '0',
        '1sm': '3.5px',
        'sm': '7px',
        DEFAULT: '12px',
        'lg': '49.84px',
      },
      fontSize: {
        sm: ['10px'],
        base: ['12px'],
        lg: ['18px'],
        xl: ['24px'],
      },
      fontWeight: {
        'normal': 400,
        'medium': 500,
        'bold': 700,
      }
    },
  },
  plugins: [],
}

