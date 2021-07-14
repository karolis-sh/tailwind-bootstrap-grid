module.exports = {
  purge: ['./**/*.html'],
  // purge: ['./**/*.invalid.html'],
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
