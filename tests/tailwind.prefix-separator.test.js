const run = require('./run-test');

// eslint-disable-next-line jest/expect-expect
it('should handle custom prefix and separator', () => run(__filename));
