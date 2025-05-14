# tailwind-bootstrap-grid

[![npm version][version-badge]][version]
![Build Status](https://github.com/karolis-sh/tailwind-bootstrap-grid/workflows/Node.js%20CI/badge.svg)
[![License: MIT][license-badge]][license]

Bootstrap **v5** flexbox grid system as a Tailwind CSS plugin.

Check the [demo playground](https://tailwind-bootstrap-grid.netlify.app/).

## Installation

```shell
npm i -D tailwind-bootstrap-grid
```

In your `index.css` file:

```css
@import 'tailwindcss';

@plugin 'tailwind-bootstrap-grid' {
  container_max_widths:
    'sm', '540px', 'md', '720px', 'lg', '960px', 'xl', '1140px', '2xl', '1320px';
}
```

Or via `tailwind.config.js` file:

```js
module.exports = {
  plugins: [
    require('tailwind-bootstrap-grid')({
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
    }),
  ],
};
```

This will generate the Bootstrap v5 flexbox grid.

## Options

- Original Bootstrap grid's options:

  - `grid_columns` (default - `12`) - grid size
  - `grid_gutter_width` (default - `"1.5rem"`) - container and rows gutter width
  - `grid_gutters` (default - `[0, 0]`) - gutter variable class steps
    (`--bs-gutter-x`, `--bs-gutter-y`)
  - `container_max_widths` (default - `[]`) - the `max-width` container value for
    each breakpoint

- Extra options:
  - `generate_container` (default - `true`) - whether to generate `.container` and
    `.container-fluid` classes
  - `rtl` (default - `false`) - rtl support (`.offset-x` classes will start
    responding to `[dir=ltr]` / `[dir=rtl]`)
  - `debug` (default - `false`) - enable debug mode

## FAQ

1. _**How to use rtl css?**_ Set the `ltr` or `rtl` [dir](https://www.w3schools.com/tags/att_global_dir.asp)
   attribute on your container (usually the root `html`).
2. _**Is there a Bootstrap v4 grid implementation?**_ Yes, use `tailwind-bootstrap-grid@3`.

## Related

[postcss-bootstrap-4-grid](https://github.com/johnwatkins0/postcss-bootstrap-4-grid)

[version-badge]: https://badge.fury.io/js/tailwind-bootstrap-grid.svg
[version]: https://www.npmjs.com/package/tailwind-bootstrap-grid
[license-badge]: https://img.shields.io/badge/License-MIT-yellow.svg
[license]: https://opensource.org/licenses/MIT
