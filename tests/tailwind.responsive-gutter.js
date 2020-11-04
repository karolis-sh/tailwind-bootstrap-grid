/* eslint-disable global-require */
const config = require('./tailwind.base');

module.exports = {
  ...config,
  theme: {
    screens: {
      mobile: '60em',
      tablet: '80em',
      desktop: '120em',
    },
  },
  plugins: [
    require('../lib')({
      gridColumns: 3,
      gridGutterWidth: '1em',
      gridGutterWidths: {
        mobile: '2em',
        tablet: '4em',
        desktop: '6em',
      },
      containerMaxWidths: {},
    }),
  ],
};
