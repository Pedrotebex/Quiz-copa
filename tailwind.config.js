/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',       // Caminho para o arquivo HTML na raiz
    './src/**/*.{js}', // Se você tiver scripts JS na pasta src
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}