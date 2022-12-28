const config = require('./tailwind.base');

module.exports = {
  ...config,
  safelist: [
    {
      pattern: /./,
      variants: ['mobile', 'tablet', 'desktop'],
    },
  ],
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
