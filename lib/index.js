const _ = require('lodash');
const reduceCSSCalc = require('reduce-css-calc');
const chalk = require('chalk');

const validate = require('./validate');

/**
 * @typedef {Object} PluginOptions - The tailwind-bootstrap-grid plugin options
 * @param {number} [gridColumns=12] - Number of columns
 * @param {string} [gridGutterWidth="30px"] - Spacing value
 * @param {Object} [gridGutterWidths={}] - spacing values for each breakpoint
 * @param {boolean} [generateContainer=true] - Whether the plugin should generate .container class
 * @param {boolean} [generateNoGutters=true] - Whether the plugin should generate .no-gutter class
 * @param {Object} [containerMaxWidths={}] - the `max-width` container value for each breakpoint
 * @param {boolean} [rtl=false] - Whether to enable rtl support
 */
/**
 * Setup tailwind-bootstrap-grid plugin
 * @param {PluginOptions}
 */
module.exports = (input) => (options) => {
  const { addUtilities, addComponents, config, prefix, e } = options;
  const screens = config('theme.screens');
  const cssSeparator = config('separator');

  const {
    gridColumns,
    gridGutterWidth,
    gridGutterWidths,
    generateContainer,
    generateNoGutters,
    containerMaxWidths,
    rtl,
  } = validate({ screens })({
    gridColumns: 12,
    gridGutterWidth: '30px',
    gridGutterWidths: {},
    generateContainer: true,
    generateNoGutters: true,
    containerMaxWidths: {},
    rtl: false,
    ...input,
  });

  if (config('corePlugins.container') !== false) {
    // eslint-disable-next-line no-console
    console.warn(
      `⚠️  The ${chalk.yellow(
        'container'
      )} core plugin is enabled and you're also generating ${chalk.green(
        '.container'
      )} class with the ${chalk.bold(
        'tailwind-bootstrap-grid'
      )} plugin. This might lead to unexpected styling issues, disable either of one.`
    );
  }

  const cssPrefix = prefix('.x').replace(/^\./, '').replace(/x$/, '');
  const screenKeys = Object.keys(screens);
  const screenPrefixes = screenKeys.map((item) => e(`${item}${cssSeparator}`));
  const columns = Array.from(Array(gridColumns), (value, index) => index + 1);

  const hasResponsiveGridGutterWidths = !!Object.keys(gridGutterWidths).length;

  const getSpacingValue = (spacing) => (spacing ? reduceCSSCalc(`calc(${spacing} / 2)`) : null);
  const getSpacing = (spacing, cb) => (spacing ? cb(getSpacingValue(spacing)) : {});

  {
    // =============================================================================================
    // Container
    // =============================================================================================
    if (generateContainer) {
      addComponents([
        {
          '.container': {
            width: '100%',
            marginRight: 'auto',
            marginLeft: 'auto',
            ...getSpacing(gridGutterWidth, (spacing) => ({
              paddingRight: spacing,
              paddingLeft: spacing,
            })),
          },
        },
        ...screenKeys.map((name) => ({
          [`@screen ${name}`]: {
            '.container': {
              maxWidth: containerMaxWidths[name] || screens[name],
              ...getSpacing(gridGutterWidths[name], (spacing) => ({
                paddingRight: spacing,
                paddingLeft: spacing,
              })),
            },
          },
        })),
      ]);

      addComponents(
        [
          {
            [prefix('.container-fluid')]: {
              width: '100%',
              ...getSpacing(gridGutterWidth, (spacing) => ({
                paddingRight: spacing,
                paddingLeft: spacing,
              })),
              marginRight: 'auto',
              marginLeft: 'auto',
            },
          },
          ...(hasResponsiveGridGutterWidths
            ? screenKeys
                .map((name) =>
                  getSpacing(gridGutterWidths[name], (spacing) => ({
                    [`@screen ${name}`]: {
                      [prefix('.container-fluid')]: {
                        paddingRight: spacing,
                        paddingLeft: spacing,
                      },
                    },
                  }))
                )
                .concat([
                  screenKeys.map((name, index) => ({
                    [`@screen ${name}`]: {
                      [`.${screenPrefixes[index]}${cssPrefix}container-fluid`]: {
                        width: '100%',
                        ...getSpacing(gridGutterWidths[name], (spacing) => ({
                          paddingRight: spacing,
                          paddingLeft: spacing,
                        })),
                        marginRight: 'auto',
                        marginLeft: 'auto',
                      },
                    },
                  })),
                ])
            : []),
        ],
        { respectPrefix: false }
      );
    }
  }

  {
    // =============================================================================================
    // Row
    // =============================================================================================
    addUtilities([
      {
        '.row': {
          display: 'flex',
          flexWrap: 'wrap',
          ...getSpacing(gridGutterWidth, (spacing) => ({
            marginLeft: `-${spacing}`,
            marginRight: `-${spacing}`,
          })),
        },
      },
      ...(hasResponsiveGridGutterWidths
        ? screenKeys.map((name) => ({
            [`@screen ${name}`]: {
              '.row': {
                ...getSpacing(gridGutterWidths[name], (spacing) => ({
                  marginLeft: `-${spacing}`,
                  marginRight: `-${spacing}`,
                })),
              },
            },
          }))
        : []),
    ]);

    if (generateNoGutters) {
      const allColSelector = `${[
        `& > ${prefix('.col')}`,
        ...screenPrefixes.map((item) => `& > .${item}${cssPrefix}col`),
      ].join(',\n')},${[
        `& > [class*="${cssPrefix}col-"]`,
        screenPrefixes.map((item) => `& > [class*="${item}${cssPrefix}col-"]`),
      ].join(',')}`;

      addComponents(
        {
          [prefix('.row.no-gutters')]: {
            marginRight: 0,
            marginLeft: 0,
            [allColSelector]: {
              paddingRight: 0,
              paddingLeft: 0,
            },
          },
        },
        { respectPrefix: false }
      );
    }
  }

  {
    // =============================================================================================
    // Columns
    // =============================================================================================
    const allColumnClasses = _.flatten(
      ['col', 'col-auto', ...columns.map((size) => `col-${size}`)].map((item) => [
        `.${cssPrefix}${item}`,
        ...screenPrefixes.map((screenPrefix) => `.${screenPrefix}${cssPrefix}${item}`),
      ])
    );

    addUtilities(
      [
        {
          [allColumnClasses.join(',\n')]: {
            position: 'relative',
            width: '100%',
            ...getSpacing(gridGutterWidth, (spacing) => ({
              paddingRight: spacing,
              paddingLeft: spacing,
            })),
          },
        },
        ...(hasResponsiveGridGutterWidths
          ? screenKeys.map((name) => ({
              [`@screen ${name}`]: {
                [allColumnClasses.join(',\n')]: {
                  ...getSpacing(gridGutterWidths[name], (spacing) => ({
                    paddingRight: spacing,
                    paddingLeft: spacing,
                  })),
                },
              },
            }))
          : []),
      ],
      { respectPrefix: false }
    );

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
        ...columns.map((size) => ({
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
    // =============================================================================================
    // Ordering
    // =============================================================================================
    addUtilities(
      [
        {
          '.order-first': { order: '-1' },
          '.order-last': { order: gridColumns + 1 },
        },
        ...[0, ...columns].map((size) => ({
          [`.order-${size}`]: { order: `${size}` },
        })),
      ],
      ['responsive']
    );
  }

  {
    // =============================================================================================
    // Offsets
    // =============================================================================================
    addUtilities(
      [
        ...[0, ...columns.slice(0, -1)].map((size) => {
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
