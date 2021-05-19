/* eslint-disable global-require */

module.exports = {
  // https://getbootstrap.com/docs/4.1/layout/grid/#grid-options
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1400px',
    },
  },
  plugins: [
    require('../lib')({
      rtl: true,
      containerMaxWidths: {
        sm: '540px',
        md: '720px',
        lg: '960px',
        xl: '1140px',
        xxl: '1320px',
      },
      gridGutters: {
        0: 0,
        1: '.25rem',
        2: '.5rem',
        3: '1rem',
        4: '1.5rem',
        5: '3rem',
      },
    }),
  ],
  purge: false,
  corePlugins: [],
  // prefix: 'X-',
  // separator: '_',
};
