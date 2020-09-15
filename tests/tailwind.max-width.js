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
      generateMaxWidth: true,
    }),
  ],
  prefix: 'PF-',
  separator: '_SP_',
};
