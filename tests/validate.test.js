const validate = require('../lib/validate');

const screens = { sm: '540px', md: '720px', lg: '960px', xl: '1140px' };

const input = {
  gridColumns: 12,
  gridGutterWidth: '30px',
  gridGutterWidths: {},
  generateContainer: true,
  generateNoGutters: true,
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
  valid({
    ...input,
    gridGutterWidths: { sm: '32px', md: '34px', lg: '36px', xl: '38px' },
  });
});

it('should throw', () => {
  invalid();
  invalid({});

  // containerMaxWidths
  invalid({ ...input, containerMaxWidths: undefined });
  invalid({ ...input, containerMaxWidths: { desktop: '38px' } });
  invalid({
    ...input,
    containerMaxWidths: { sm: '32px', md: '34px', lg: '36px', xl: '38px', xxl: '40px' },
  });

  // gridGutterWidths
  invalid({ ...input, gridGutterWidths: undefined });
  invalid({ ...input, gridGutterWidths: { desktop: '38px' } });
  invalid({
    ...input,
    gridGutterWidths: { sm: '32px', md: '34px', lg: '36px', xl: '38px', xxl: '40px' },
  });
});
