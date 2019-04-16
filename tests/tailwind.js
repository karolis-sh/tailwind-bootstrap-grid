/* eslint-disable global-require */
const config = require('./tailwind.base');

module.exports = {
  ...config,
  screens: {
    mobile: '1em',
    tablet: '2em',
    desktop: '3em',
  },
  plugins: [require('../index')()],
};
