# tailwind-bootstrap-grid

[![npm version][version-badge]][version]
![Build Status](https://github.com/karolis-sh/tailwind-bootstrap-grid/workflows/Node.js%20CI/badge.svg)
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

This will generate Bootstrap v4 [flexbox grid](https://getbootstrap.com/docs/4.0/layout/grid/).

\* **NOTE**: When using the `.container` class from this plugin you will need to
[disable](https://tailwindcss.com/docs/container/#disabling) the core
[container container plugin](https://tailwindcss.com/docs/container/) as both plugins
expose a `.container` class.

## Features & Tailwind options support

- ✅ custom screens
- ✅ custom separator
- ✅ custom prefix
- ✅ rtl support

## Options

- `gridColumns` (default - `12`) - grid size
- `gridGutterWidth` (default - `"30px"`) - gutter width
- `generateContainer` (default - `true`) - whether to generate `.container` and
  `.container-fluid` classes
- `generateNoGutters` (default - `true`) - whether to generate `.no-gutter` class
- `containerMaxWidths` (default -
  `{ sm: '540px', md: '720px', lg: '960px', xl: '1140px' }`) - the `max-width`
  container value for each breakpoint
- `rtl` (default - `false`) - rtl support (`.offset-x` classes will start
  responding to `[dir=ltr]` / `[dir=rtl]`)

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

## FAQ

1. _**Why my `.container` doesn't have padding?**_ This plugin will not work properly
   with [core container plugin](https://tailwindcss.com/docs/container/) as both
   plugins expose a `.container` class.
1. _**How to use rtl css?**_ Set the `ltr` or `rtl` [dir](https://www.w3schools.com/tags/att_global_dir.asp)
   attribute on your container (usually the root `html`).

## Related

[postcss-bootstrap-4-grid](https://github.com/johnwatkins0/postcss-bootstrap-4-grid)

## License

MIT

[version-badge]: https://badge.fury.io/js/tailwind-bootstrap-grid.svg
[version]: https://www.npmjs.com/package/tailwind-bootstrap-grid
[license-badge]: https://img.shields.io/badge/License-MIT-yellow.svg
[license]: https://opensource.org/licenses/MIT
[code-style-badge]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[code-style]: https://github.com/prettier/prettier
