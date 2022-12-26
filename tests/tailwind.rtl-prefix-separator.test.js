const run = require('./run-test');

// eslint-disable-next-line jest/expect-expect
it('should handle rtl option and custom prefix, separator', () => run(__filename));
