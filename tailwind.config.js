module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        'sea': '#20455e',
        'blue-astronaut':'#023A5F',
        'blue-venice':"#075487",
        'astronaut': '#285976',
        'nevada':'#666B6D',
        'mine-shaft':'#2E2E2E',
        'hint-of-red':"#F9F7F7"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
