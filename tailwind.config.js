const colors = require('tailwindcss/colors')

module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        darkest: '#121212',
        gray: colors.trueGray,
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
