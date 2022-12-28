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
      gridGutters: {
        0: 0,
        1: '.25rem',
        2: '.5rem',
        3: '1rem',
        4: '1.5rem',
        5: '3rem',
      },
      containerMaxWidths: {},
    }),
  ],
};
