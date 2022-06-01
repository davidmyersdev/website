const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './components/**/*.{ts,tsx,vue}',
    './content/**/*.md',
    './pages/**/*.{ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        darkest: '#121212',
        gray: colors.neutral,
      },
    },
  },
}
