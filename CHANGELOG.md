# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [6.0.0](https://github.com/karolis-sh/tailwind-bootstrap-grid/compare/v5.1.0...v6.0.0) (2025-05-14)


### ⚠ BREAKING CHANGES

* **tailwind:** drop tailwind v3 support, change plugin options structure

### Features

* **tailwind:** migrate to tailwind v4 ([d7ad4b7](https://github.com/karolis-sh/tailwind-bootstrap-grid/commit/d7ad4b7bedc03309725a10398ca5bd8fb13c2ebf)), closes [#157](https://github.com/karolis-sh/tailwind-bootstrap-grid/issues/157)

## [5.1.0](https://github.com/karolis-sh/tailwind-bootstrap-grid/compare/v5.0.1...v5.1.0) (2023-11-25)


### Features

* add TypeScript types ([dc82b58](https://github.com/karolis-sh/tailwind-bootstrap-grid/commit/dc82b581f823ed8c553ed0c22747ac97f033c09e))

### [5.0.1](https://github.com/karolis-sh/tailwind-bootstrap-grid/compare/v5.0.0...v5.0.1) (2022-04-17)


### Bug Fixes

* disable misleading container warning for some cases ([84033c0](https://github.com/karolis-sh/tailwind-bootstrap-grid/commit/84033c084570bd366dd8530f6506154ebc2e7a76))

## [5.0.0](https://github.com/karolis-sh/tailwind-bootstrap-grid/compare/v4.0.0...v5.0.0) (2022-02-20)


### ⚠ BREAKING CHANGES

* drop TailwindCSS 2 support

### Features

* add TailwindCSS 3 support ([95b8062](https://github.com/karolis-sh/tailwind-bootstrap-grid/commit/95b8062add721372b7d07b6ecc3f70598446cdcd))


### Bug Fixes

* bump joi ([665dda8](https://github.com/karolis-sh/tailwind-bootstrap-grid/commit/665dda89e590c40c7736d92c39bf9b69f2d0221b))
* swap chalk with picocolors ([d4f9be2](https://github.com/karolis-sh/tailwind-bootstrap-grid/commit/d4f9be2758398e1fd982220c9cd92cc9b14fc637))
* use tailwindcss/plugin wrapper ([e920c0b](https://github.com/karolis-sh/tailwind-bootstrap-grid/commit/e920c0becccde9020d91a55fc6d500a71f6ea7ea))

## [4.0.0](https://github.com/karolis-sh/tailwind-bootstrap-grid/compare/v3.3.0...v4.0.0) (2021-05-19)


### ⚠ BREAKING CHANGES

* Tailwind CSS v1 will no longer be supported.
* Gutter class changes and removing gridGutterWidths, generateNoGutters options.

### Features

* migrate to Bootstrap 5 ([ccf8882](https://github.com/karolis-sh/tailwind-bootstrap-grid/commit/ccf88821ccb1d267a3f870775fd0b9958dcc7ce1)), closes [#75](https://github.com/karolis-sh/tailwind-bootstrap-grid/issues/75)
* remove Tailwind CSS v1 support ([2c03247](https://github.com/karolis-sh/tailwind-bootstrap-grid/commit/2c0324781c508563b9e3d1e4dd6beef842ae73ef))


### Bug Fixes

* **deps:** bump chalk, joi, lodash, reduce-css-calc ([e512bd9](https://github.com/karolis-sh/tailwind-bootstrap-grid/commit/e512bd91a193dd0e3b480d6599decadf539d61d9))

## [3.3.0](https://github.com/karolis-sh/tailwind-bootstrap-grid/compare/v3.2.0...v3.3.0) (2021-03-04)


### Features

* add plugin scoped respectImportant support ([a06f8c6](https://github.com/karolis-sh/tailwind-bootstrap-grid/commit/a06f8c61a97d1fdf4cd5111d53224646b6c54b4e))

## [3.2.0](https://github.com/karolis-sh/tailwind-bootstrap-grid/compare/v3.1.0...v3.2.0) (2021-03-03)


### Features

* add support for important config option ([75be2c1](https://github.com/karolis-sh/tailwind-bootstrap-grid/commit/75be2c123aa7806b89afe60fe6140c2a525c16eb)), closes [#71](https://github.com/karolis-sh/tailwind-bootstrap-grid/issues/71)
* add TailwindCSS 2 support ([084772c](https://github.com/karolis-sh/tailwind-bootstrap-grid/commit/084772c43fb99517c4bef9882de9348b595a27e5))

## [3.1.0](https://github.com/karolis-sh/tailwind-bootstrap-grid/compare/v3.0.1...v3.1.0) (2020-11-04)

### Features

- add support for tailwindcss@1.9.6 ([781133d](https://github.com/karolis-sh/tailwind-bootstrap-grid/commit/781133d48fae61c58c17f01d480396661b29837c))

### [3.0.1](https://github.com/karolis-sh/tailwind-bootstrap-grid/compare/v3.0.0...v3.0.1) (2020-11-04)

### Bug Fixes

- fix container correPlugin detection ([93d476f](https://github.com/karolis-sh/tailwind-bootstrap-grid/commit/93d476f4f4c1caf7ebfb64bee5617925677ec994))

## [3.0.0](https://github.com/karolis-sh/tailwind-bootstrap-grid/compare/v2.2.2...v3.0.0) (2020-11-04)

### ⚠ BREAKING CHANGES

- now there are no defaults for container's max-width properties

### Features

- add console warning if container is generated by core plugin and the grid plugin ([dc2cd27](https://github.com/karolis-sh/tailwind-bootstrap-grid/commit/dc2cd273413a5f34616f03dd750b80b59231897d))
- change containerMaxWidths default to {} ([1d66105](https://github.com/karolis-sh/tailwind-bootstrap-grid/commit/1d66105a3159d4ab11898e7decf9e31934b14985))

### Bug Fixes

- add missing spacings for .col-\* on responsive gutters ([112ed90](https://github.com/karolis-sh/tailwind-bootstrap-grid/commit/112ed902588e0ef83f9de7c9064cf2df782e3bc7))
- add missing spacings for .row on responsive gutters ([cc4ebb8](https://github.com/karolis-sh/tailwind-bootstrap-grid/commit/cc4ebb8cc903bccea7591e39603da98e91d53152))
- add plugin options validation & make gridGutterWidths stricter ([84b32c4](https://github.com/karolis-sh/tailwind-bootstrap-grid/commit/84b32c49314be410007ac0002fe37dd18968eb35))
- reduce redundant .container-fluid styles output ([e8966c5](https://github.com/karolis-sh/tailwind-bootstrap-grid/commit/e8966c563130f71584a897f957d9bd7e72c173d7))

### [2.2.2](https://github.com/karolis-sh/tailwind-bootstrap-grid/compare/v2.2.1...v2.2.2) (2020-08-18)

### [2.2.1](https://github.com/karolis-sh/tailwind-bootstrap-grid/compare/v2.2.0...v2.2.1) (2020-08-17)

### Bug Fixes

- default gutter width when using gutters by breakpoint ([e77a5ef](https://github.com/karolis-sh/tailwind-bootstrap-grid/commit/e77a5ef7fac3f3ab7e3a0f8719999ef2b2d9ba06))

## [2.2.0](https://github.com/karolis-sh/tailwind-bootstrap-grid/compare/v2.1.0...v2.2.0) (2020-08-17)

### Features

- responsive gutter widths ([ace11e3](https://github.com/karolis-sh/tailwind-bootstrap-grid/commit/ace11e3ced682cffad1773cc85a0d40b317eefe1))

### Bug Fixes

- upgrade to lodash@4.17.15 ([f06f622](https://github.com/karolis-sh/tailwind-bootstrap-grid/commit/f06f622009de449e4e832dcca5de8dcf4f72fd90))

## [2.1.0](https://github.com/karolis-sh/tailwind-bootstrap-grid/compare/v2.0.2...v2.1.0) (2019-06-06)

### Bug Fixes

- remove redundant new lines from output ([703bfea](https://github.com/karolis-sh/tailwind-bootstrap-grid/commit/703bfea))

### Features

- **prefix:** add custom prefix support ([3f29370](https://github.com/karolis-sh/tailwind-bootstrap-grid/commit/3f29370)), closes [#5](https://github.com/karolis-sh/tailwind-bootstrap-grid/issues/5)

### Tests

- update test setup ([9cd4613](https://github.com/karolis-sh/tailwind-bootstrap-grid/commit/9cd4613))

### [2.0.2](https://github.com/karolis-sh/tailwind-bootstrap-grid/compare/v2.0.0...v2.0.2) (2019-05-14)

### Bug Fixes

- version bump ([057df19](https://github.com/karolis-sh/tailwind-bootstrap-grid/commit/057df19))

## [2.0.0](https://github.com/karolis-sh/tailwind-bootstrap-grid/compare/v1.2.0...v2.0.0) (2019-05-14)

### Features

- **tailwind:** add tailwind v1 support ([335b212](https://github.com/karolis-sh/tailwind-bootstrap-grid/commit/335b212))

### Tests

- simplify test configs ([fea50c0](https://github.com/karolis-sh/tailwind-bootstrap-grid/commit/fea50c0))

### BREAKING CHANGES

- **tailwind:** Drop tailwind 0.x.x version support
