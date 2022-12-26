/* eslint-disable jest/expect-expect */
const validate = require('../lib/validate');

const screens = { sm: '540px', md: '720px', lg: '960px', xl: '1140px' };

const input = {
  gridColumns: 12,
  gridGutterWidth: '30px',
  gridGutters: { 0: 0, 1: '15px' },
  generateContainer: true,
  containerMaxWidths: {},
  rtl: false,
};

const valid = (options) => {
  expect(() => validate({ screens })(options)).not.toThrow();
};

const invalid = (options) => {
  expect(() => validate({ screens })(options)).toThrow();
};

it('should not throw', () => {
  valid(input);
  valid({ ...input, containerMaxWidths: { xl: '1140px' } });
  valid({ ...input, gridGutters: {} });
});

it('should throw', () => {
  invalid();
  invalid({});

  // gridGutters
  invalid({ ...input, gridGutters: undefined });

  // containerMaxWidths
  invalid({ ...input, containerMaxWidths: undefined });
  invalid({ ...input, containerMaxWidths: { desktop: '38px' } });
  invalid({
    ...input,
    containerMaxWidths: {
      sm: '32px',
      md: '34px',
      lg: '36px',
      xl: '38px',
      xxl: '40px',
    },
  });
});
