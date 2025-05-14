module.exports = {
  plugins: [
    require('../lib')({
      debug: true,
      rtl: true,
      container_max_widths: [
        'sm',
        '540px',
        'md',
        '720px',
        'lg',
        '960px',
        'xl',
        '1140px',
        '2xl',
        '1320px',
      ],
      grid_gutters: [
        '0',
        '0',
        1,
        '.25rem',
        2,
        '.5rem',
        3,
        '1rem',
        4,
        '1.5rem',
        5,
        '3rem',
      ],
    }),
  ],
};
