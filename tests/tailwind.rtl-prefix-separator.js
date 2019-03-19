/* eslint-disable global-require */
const config = require('./tailwind.base');

module.exports = {
  ...config,
  themes: {
    screens: {
      mobile: '1em',
      desktop: '2em',
    },
  },
  plugins: [
    require('../index')({
      gridColumns: 3,
      rtl: true,
    }),
  ],
  prefix: '✅-',
  separator: '_🚧_',
};
