module.exports = {
  content: ['./**/*.html'],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  corePlugins: {
    container: false,
  },
  plugins: [require('../../lib')()],
};
