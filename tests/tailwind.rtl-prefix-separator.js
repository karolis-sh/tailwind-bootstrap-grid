const config = require('./tailwind.base');

module.exports = {
  ...config,
  safelist: [
    {
      pattern: /./,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
  ],
  theme: {
    screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' },
  },
  plugins: [
    require('../lib')({
      gridColumns: 3,
      rtl: true,
      containerMaxWidths: {
        sm: '540px',
        md: '720px',
        lg: '960px',
        xl: '1140px',
      },
    }),
  ],
  prefix: 'PF-',
  separator: '_SP_',
};
