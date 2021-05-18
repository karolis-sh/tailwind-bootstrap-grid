/* eslint-disable global-require */

module.exports = {
  // https://getbootstrap.com/docs/4.1/layout/grid/#grid-options
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
    },
  },
  plugins: [require('../lib')({ rtl: true })],
  purge: false,
  corePlugins: [],
};
