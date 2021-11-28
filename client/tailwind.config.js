module.exports = {
  purge: ['./src/*{.js}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        discuss_orange: '#f54404',
        discuss_red: '#f54404',
        discuss_dark: {
          DEFAULT: '#030303',
          brighter: '#1a1a1a',
          brightest: '#272728',
        },
        discuss_border: {
          DEFAULT: '#343536',
        },
        discuss_text: {
          DEFAULT: 'rgb(215, 218, 220)',
          darker: '#818384',
        },
      },

    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
