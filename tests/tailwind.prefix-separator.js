/* eslint-disable global-require */
const config = require('./tailwind.base');

module.exports = {
  ...config,
  screens: {
    mobile: '60em',
    tablet: '80em',
    desktop: '120em',
  },
  plugins: [
    require('../index')({
      gridColumns: 3,
      containerMaxWidths: {
        mobile: '20em',
        tablet: '40em',
        desktop: '60em',
      },
    }),
  ],
  options: {
    prefix: '✅-',
    separator: '_🚧_',
  },
};
