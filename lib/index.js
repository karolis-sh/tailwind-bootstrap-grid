const chalk = require('chalk');

const validate = require('./validate');

/**
 * @typedef {Object} PluginOptions - The tailwind-bootstrap-grid plugin options
 * @param {number} [gridColumns=12] - Number of columns
 * @param {string} [gridGutterWidth="1.5rem"] - Spacing value
 * @param {Object} [gridGutters={ 0: 0 }] - gutter spacing variable classes
 * @param {boolean} [generateContainer=true] - Whether the plugin should generate .container class
 * @param {Object} [containerMaxWidths={}] - the `max-width` container value for each breakpoint
 * @param {boolean} [rtl=false] - Whether to enable rtl support
 * @param {boolean} [respectImportant=true] - Whether to respect important config option
 */
/**
 * Setup tailwind-bootstrap-grid plugin
 * @param {PluginOptions}
 */
module.exports = (input) => (options) => {
  const { addComponents, config } = options;
  const screens = config('theme.screens');
  const important = config('important');

  const {
    gridColumns,
    gridGutterWidth,
    gridGutters,
    generateContainer,
    containerMaxWidths,
    rtl,
    respectImportant,
  } = validate({ screens })({
    gridColumns: 12,
    gridGutterWidth: '1.5rem',
    gridGutters: { 0: 0 },
    generateContainer: true,
    containerMaxWidths: {},
    rtl: false,
    respectImportant: true,
    ...input,
  });

  const corePlugins = config('corePlugins');
  if (
    Array.isArray(corePlugins) ? corePlugins.includes('container') : corePlugins.container !== false
  ) {
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

  const screenKeys = Object.keys(screens);
  const columns = Array.from(Array(gridColumns), (value, index) => index + 1);
  const rowColsSteps = columns.slice(0, Math.floor(gridColumns / 2));

  const setImportant = (value) =>
    respectImportant && important && value != null ? `${value} !important` : value;

  {
    // =============================================================================================
    // Container
    // =============================================================================================
    if (generateContainer) {
      addComponents(
        [
          {
            '.container, .container-fluid': {
              width: setImportant('100%'),
              marginRight: setImportant('auto'),
              marginLeft: setImportant('auto'),
              paddingRight: setImportant(`var(--bs-gutter-x, calc(${gridGutterWidth} / 2))`),
              paddingLeft: setImportant(`var(--bs-gutter-x, calc(${gridGutterWidth} / 2))`),
            },
          },
          ...screenKeys.map((name) => ({
            [`@screen ${name}`]: {
              '.container': {
                maxWidth: setImportant(containerMaxWidths[name] || screens[name]),
              },
            },
          })),
        ],
        { respectImportant }
      );
    }
  }

  {
    // =============================================================================================
    // Row
    // =============================================================================================
    addComponents(
      {
        '.row': {
          '--bs-gutter-x': gridGutterWidth,
          '--bs-gutter-y': 0,
          display: 'flex',
          flexWrap: 'wrap',
          marginTop: 'calc(var(--bs-gutter-y) * -1)',
          marginRight: 'calc(var(--bs-gutter-x) / -2)',
          marginLeft: 'calc(var(--bs-gutter-x) / -2)',
          '& > *': {
            boxSizing: 'border-box',
            flexShrink: 0,
            width: '100%',
            maxWidth: '100%',
            paddingRight: 'calc(var(--bs-gutter-x) / 2)',
            paddingLeft: 'calc(var(--bs-gutter-x) / 2)',
            marginTop: 'var(--bs-gutter-y)',
          },
        },
      },
      { respectImportant }
    );
  }

  {
    // =============================================================================================
    // Columns
    // =============================================================================================
    addComponents(
      [
        {
          '.col': {
            flex: '1 0 0%',
          },
          '.row-cols-auto': {
            '& > *': {
              flex: '0 0 auto',
              width: 'auto',
            },
          },
        },
        ...rowColsSteps.map((rowCol) => ({
          [`.row-cols-${rowCol}`]: {
            '& > *': {
              flex: '0 0 auto',
              width: `${100 / rowCol}%`,
            },
          },
        })),
        {
          '.col-auto': {
            flex: '0 0 auto',
            width: 'auto',
          },
        },
        ...columns.map((size) => ({
          [`.col-${size}`]: {
            flex: '0 0 auto',
            width: `${(100 / gridColumns) * size}%`,
          },
        })),
      ],
      { variants: ['responsive'], respectImportant }
    );
  }

  {
    // =============================================================================================
    // Offsets
    // =============================================================================================
    addComponents(
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
      { variants: ['responsive'], respectImportant }
    );
  }

  {
    // =============================================================================================
    // Gutters
    // =============================================================================================
    if (Object.keys(gridGutters).length) {
      addComponents(
        Object.entries(gridGutters).map(([key, value]) => ({
          [`.g-${key}, .gx-${key}`]: {
            '--bs-gutter-x': value,
          },
          [`.g-${key}, .gy-${key}`]: {
            '--bs-gutter-y': value,
          },
        })),
        { variants: ['responsive'], respectImportant }
      );
    }
  }

  {
    // =============================================================================================
    // Ordering
    // =============================================================================================
    addComponents(
      [
        {
          '.order-first': { order: '-1' },
          '.order-last': { order: gridColumns + 1 },
        },
        ...[0, ...columns].map((size) => ({
          [`.order-${size}`]: { order: `${size}` },
        })),
      ],
      { variants: ['responsive'], respectImportant }
    );
  }
};
