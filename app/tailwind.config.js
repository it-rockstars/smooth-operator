module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        rock: {
          50: '#f6f6f7',
          100: '#e2e2e5',
          200: '#c5c5cc',
          300: '#9f9faa',
          400: '#787885',
          500: '#61606b',
          600: '#4d4c55',
          700: '#414049',
          800: '#37363d',
          900: '#111114',
          950: '#0a0a0c'
        },
        accent: {
          DEFAULT: '#0066ff',
          hover: '#0052cc'
        }
      }
    }
  }
}
