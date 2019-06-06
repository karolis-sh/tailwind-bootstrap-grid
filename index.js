const _ = require('lodash');
const reduceCSSCalc = require('reduce-css-calc');

/**
 * @typedef {Object} PluginOptions - The tailwind-bootstrap-grid plugin options
 * @param {number} [gridColumns=12] - Number of columns
 * @param {string} [gridGutterWidth="30px"] - Spacing value
 * @param {boolean} [generateContainer=true] - Whether the plugin should generate .container class
 * @param {boolean} [generateNoGutters=true] - Whether the plugin should generate .no-gutter class
 * @param {Object} [containerMaxWidths={ sm: '540px', md: '720px', lg: '960px', xl: '1140px' }] - the `max-width` container value for each breakpoint
 * @param {boolean} [rtl=false] - Whether to enable rtl support
 */
/**
 * Setup tailwind-bootstrap-grid plugin
 * @param {PluginOptions}
 */
module.exports = ({
  gridColumns = 12,
  gridGutterWidth = '30px',
  generateContainer = true,
  generateNoGutters = true,
  containerMaxWidths = { sm: '540px', md: '720px', lg: '960px', xl: '1140px' },
  rtl = false,
} = {}) => options => {
  const { addUtilities, addComponents, config, e } = options;
  const screens = config('theme.screens');
  const cssSeparator = config('separator');

  const screenPrefixes = Object.keys(screens).map(item => e(`${item}${cssSeparator}`));
  const spacing = gridGutterWidth ? reduceCSSCalc(`calc(${gridGutterWidth} / 2)`) : null;
  const columns = Array.from(Array(gridColumns), (value, index) => index + 1);

  const spacingCSS = value => (spacing ? value : {});

  {
    // =========================================================================
    // Container
    // =========================================================================
    if (generateContainer) {
      addComponents([
        {
          '.container': {
            width: '100%',
            marginRight: 'auto',
            marginLeft: 'auto',
            ...spacingCSS({
              paddingRight: spacing,
              paddingLeft: spacing,
            }),
          },
        },
        ...Object.entries(screens).map(([name, value]) => ({
          [`@screen ${name}`]: {
            '.container': {
              maxWidth: containerMaxWidths[name] || value,
            },
          },
        })),
      ]);

      addUtilities(
        [
          {
            '.container-fluid': {
              width: '100%',
              ...spacingCSS({
                paddingRight: spacing,
                paddingLeft: spacing,
              }),
              marginRight: 'auto',
              marginLeft: 'auto',
            },
          },
        ],
        ['responsive']
      );
    }
  }

  {
    // =========================================================================
    // Row
    // =========================================================================
    addUtilities([
      {
        '.row': {
          display: 'flex',
          flexWrap: 'wrap',
          ...spacingCSS({
            marginLeft: `-${spacing}`,
            marginRight: `-${spacing}`,
          }),
        },
      },
    ]);

    if (spacing && generateNoGutters) {
      const allColSelector = `${[
        '& > .col',
        ...screenPrefixes.map(item => `\n& > .${item}col`),
      ].join(',')},\n${[
        '& > [class*="col-"]',
        screenPrefixes.map(item => `\n& > [class*="${item}col-"]`),
      ].join(',\n')}`;

      addComponents({
        '.row.no-gutters': {
          marginRight: 0,
          marginLeft: 0,
          [allColSelector]: {
            paddingRight: 0,
            paddingLeft: 0,
          },
        },
      });
    }
  }

  {
    // =========================================================================
    // Columns
    // =========================================================================
    const allColumnClasses = _.flatten(
      ['col', 'col-auto', ...columns.map(size => `col-${size}`)].map(item => [
        `.${item}`,
        ...screenPrefixes.map(screenPrefix => `.${screenPrefix}${item}`),
      ])
    );

    addUtilities([
      {
        [allColumnClasses.join(',\n')]: {
          position: 'relative',
          width: '100%',
          ...spacingCSS({
            paddingRight: spacing,
            paddingLeft: spacing,
          }),
        },
      },
    ]);

    addUtilities(
      [
        {
          '.col': {
            flexBasis: 0,
            flexGrow: 1,
            maxWidth: '100%',
          },
        },
        {
          '.col-auto': {
            flex: '0 0 auto',
            width: 'auto',
            maxWidth: '100%',
          },
        },
        ...columns.map(size => ({
          [`.col-${size}`]: {
            flex: `0 0 ${(100 / gridColumns) * size}%`,
            maxWidth: `${(100 / gridColumns) * size}%`,
          },
        })),
      ],
      ['responsive']
    );
  }

  {
    // =========================================================================
    // Ordering
    // =========================================================================
    addUtilities(
      [
        {
          '.order-first': { order: '-1' },
          '.order-last': { order: gridColumns + 1 },
        },
        ...[0, ...columns].map(size => ({
          [`.order-${size}`]: { order: `${size}` },
        })),
      ],
      ['responsive']
    );
  }

  {
    // =========================================================================
    // Offsets
    // =========================================================================
    addUtilities(
      [
        ...[0, ...columns.slice(0, -1)].map(size => {
          const margin = `${(100 / gridColumns) * size}%`;
          return rtl
            ? {
                [`[dir="ltr"] .offset-${size}`]: { marginLeft: margin },
                [`[dir="rtl"] .offset-${size}`]: { marginRight: margin },
              }
            : {
                [`.offset-${size}`]: { marginLeft: margin },
              };
        }),
      ],
      ['responsive']
    );
  }
};
