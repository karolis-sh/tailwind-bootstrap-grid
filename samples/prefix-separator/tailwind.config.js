module.exports = {
  safelist: [{ pattern: /./ }],
  theme: {
    screens: {
      mobile: '60em',
      tablet: '80em',
      desktop: '120em',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('../../lib')({
      gridColumns: 3,
      containerMaxWidths: {
        mobile: '20em',
        tablet: '40em',
        desktop: '60em',
      },
    }),
  ],
  corePlugins: {
    container: false,
  },
  prefix: 'PF-',
  separator: '_SP_',
};
