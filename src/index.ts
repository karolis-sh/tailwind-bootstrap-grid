import plugin from 'tailwindcss/plugin';
import { z } from 'zod';

type CssInJs = {
  [key: string]: string | string[] | CssInJs | CssInJs[];
};

module.exports = plugin.withOptions((pluginOptions) => (options) => {
  const { config, addBase, addComponents } = options;

  const screens: Record<string, string> = config('theme.screens');
  const screenKeys = Object.keys(screens).filter(
    (key) => key !== '__CSS_VALUES__',
  );

  const pluginOptionsSchema = z
    .object({
      debug: z.coerce.boolean().default(false),
      grid_columns: z.coerce.number().int().min(3).default(12),
      grid_gutter_width: z.coerce.string().default('1.5rem'),
      grid_gutters: z
        .array(z.coerce.string())
        .default(['0', '0'])
        .refine((value) => value.length % 2 === 0, {
          message: 'grid_gutters array length must be an even number',
        })
        .transform((value) => {
          const result: Record<string, string> = {};
          for (let i = 0; i < value.length; i += 2) {
            result[value[i]!] = value[i + 1]!;
          }
          return result;
        }),
      generate_container: z.coerce.boolean().default(true),
      container_max_widths: z
        .array(z.coerce.string())
        .default([])
        .refine((value) => value.length % 2 === 0, {
          message: 'container_max_widths array length must be an even number',
        })
        .transform((value) => {
          const result: Record<string, string> = {};
          for (let i = 0; i < value.length; i += 2) {
            result[value[i]!] = value[i + 1]!;
          }
          return result;
        }),
      rtl: z.coerce.boolean().default(false),
    })
    .default({});

  const parsedPluginOptions = pluginOptionsSchema.safeParse(pluginOptions);
  if (!parsedPluginOptions.success) {
    throw new Error(
      `tailwind-bootstrap-grid options are invalid: ${parsedPluginOptions.error.message}`,
    );
  }

  const {
    debug: _debug,
    grid_columns,
    grid_gutter_width,
    grid_gutters,
    generate_container,
    container_max_widths,
    rtl,
  } = parsedPluginOptions.data;

  if (_debug) {
    console.group('tailwind-bootstrap-grid options');
    console.debug('raw input', pluginOptions);
    console.debug('final output', parsedPluginOptions.data);
    console.groupEnd();
  }

  const columns = Array.from(Array(grid_columns), (_, index) => index + 1);
  const rowColsSteps = columns.slice(0, Math.floor(grid_columns / 2));

  {
    // =============================================================================================
    // Container
    // =============================================================================================
    if (generate_container) {
      addBase({
        ':root': Object.fromEntries(
          screenKeys.map((name) => [
            `@media (min-width: ${screens[name]})`,
            {
              '--container-max-width':
                container_max_widths[name] || screens[name]!,
            },
          ]),
        ),
      });
      addComponents({
        '.container, .container-fluid': {
          maxWidth: 'var(--container-max-width)',
          width: '100%',
          marginRight: 'auto',
          marginLeft: 'auto',
          paddingRight: `var(--bs-gutter-x, calc(${grid_gutter_width} / 2))`,
          paddingLeft: `var(--bs-gutter-x, calc(${grid_gutter_width} / 2))`,
        },
      });
    }
  }

  {
    // =============================================================================================
    // Row
    // =============================================================================================
    addComponents({
      '.row': {
        '--bs-gutter-x': grid_gutter_width,
        '--bs-gutter-y': '0',
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: 'calc(var(--bs-gutter-y) * -1)',
        marginRight: 'calc(var(--bs-gutter-x) / -2)',
        marginLeft: 'calc(var(--bs-gutter-x) / -2)',
        '> *': {
          boxSizing: 'border-box',
          flexShrink: '0',
          width: '100%',
          maxWidth: '100%',
          paddingRight: 'calc(var(--bs-gutter-x) / 2)',
          paddingLeft: 'calc(var(--bs-gutter-x) / 2)',
          marginTop: 'var(--bs-gutter-y)',
        },
      },
    });
  }

  {
    // =============================================================================================
    // Columns
    // =============================================================================================
    addComponents([
      {
        '.col': {
          flex: '1 0 0%',
          width: 'initial', // "hack" to enforce specific css import order, https://github.com/tailwindlabs/tailwindcss/issues/15045#issuecomment-2488114451
          display: 'initial', // "hack" to enforce specific css import order
        },
        '.row-cols-auto': {
          '> *': {
            flex: '0 0 auto',
            width: 'auto',
          },
        },
      },
      ...rowColsSteps.map((rowCol) => ({
        [`.row-cols-${rowCol}`]: {
          '> *': {
            flex: '0 0 auto',
            width: `${100 / rowCol}%`,
            display: 'initial', // "hack" to enforce specific css import order
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
          width: `${(100 / grid_columns) * size}%`,
        },
      })),
    ]);
  }

  {
    // =============================================================================================
    // Offsets
    // =============================================================================================
    addComponents([
      ...[0, ...columns.slice(0, -1)].map((size): Record<string, CssInJs> => {
        const margin = `${(100 / grid_columns) * size}%`;
        return rtl
          ? {
              [`[dir="ltr"] .offset-${size}`]: { marginLeft: margin },
              [`[dir="rtl"] .offset-${size}`]: { marginRight: margin },
            }
          : {
              [`.offset-${size}`]: { marginLeft: margin },
            };
      }),
    ]);
  }

  {
    // =============================================================================================
    // Gutters
    // =============================================================================================
    if (Object.keys(grid_gutters).length) {
      addComponents(
        Object.entries(grid_gutters).map(
          ([key, value]): Record<string, CssInJs> => ({
            [`.g-${key}, .gx-${key}`]: {
              '--bs-gutter-x': value,
            },
            [`.g-${key}, .gy-${key}`]: {
              '--bs-gutter-y': value,
            },
          }),
        ),
      );
    }
  }

  {
    // =============================================================================================
    // Ordering
    // =============================================================================================
    addComponents([
      {
        '.order-first': { order: '-1' },
        '.order-last': { order: `${grid_columns + 1}` },
      },
      ...[0, ...columns].map((size) => ({
        [`.order-${size}`]: { order: `${size}` },
      })),
    ]);
  }
});
