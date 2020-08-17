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
    require('../index')({
      gridColumns: 3,
      gridGutterWidth: {
        mobile: '2em',
        tablet: '4em',
        desktop: '6em',
      },
      containerMaxWidths: {
        mobile: '20em',
        tablet: '40em',
        desktop: '60em',
      },
    }),
  ],
  prefix: 'PF-',
  separator: '_SP_',
};
