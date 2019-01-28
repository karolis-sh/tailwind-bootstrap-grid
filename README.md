# tailwind-bootstrap-grid

[![npm version][version-badge]][version]
[![Build Status][build-badge]][build]
[![License: MIT][license-badge]][license]
[![code style: prettier][code-style-badge]][code-style]

Bootstrap v4 flexbox grid system as a tailwindcss plugin.

Check the [demo](https://tailwind-bootstrap-grid.netlify.com/).

## Installation

```shell
npm i -D tailwind-bootstrap-grid
```

In `tailwind.js` file:

```js
module.exports = {
  plugins: [require('tailwind-bootstrap-grid')()],
};
```

And don't forget to include `components` and `utilities` in your tailwind base
css file:

```css
@tailwind preflight;
@tailwind components;
@tailwind utilities;
```

This will generate Boostrap v4 [flexbox grid](https://getbootstrap.com/docs/4.0/layout/grid/).

## Options

- `gridColumns` (default - `12`) - grid size
- `gridGutterWidth` (default - `"30px"`) - gutter width
- `generateContainer` (default - `true`) - whether to generate `.container` and
  `.container-fluid` classes
- `generateNoGutters` (default - `true`) - whether to generate `.no-gutter` class

For example to generate 10 column grid with no gutter and skip the container:

```js
module.exports = {
  plugins: [
    require('tailwind-bootstrap-grid')({
      gridColumns: 10,
      gridGutterWidth: 0,
      generateNoGutters: false,
      generateContainer: false,
    }),
  ],
};
```

## Tailwind configuration support

- ✅ custom screens
- ✅ custom separator
- ⛔️ custom prefix

## Related

[postcss-bootstrap-4-grid](https://github.com/johnwatkins0/postcss-bootstrap-4-grid)

## License

MIT

[version-badge]: https://badge.fury.io/js/tailwind-bootstrap-grid.svg
[version]: https://www.npmjs.com/package/tailwind-bootstrap-grid
[build-badge]: https://travis-ci.org/buz-zard/tailwind-bootstrap-grid.svg?branch=master
[build]: https://travis-ci.org/buz-zard/tailwind-bootstrap-grid
[license-badge]: https://img.shields.io/badge/License-MIT-yellow.svg
[license]: https://opensource.org/licenses/MIT
[code-style-badge]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[code-style]: https://github.com/prettier/prettier
