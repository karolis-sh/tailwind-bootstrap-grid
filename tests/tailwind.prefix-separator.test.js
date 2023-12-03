const run = require('./run-test');

// eslint-disable-next-line vitest/expect-expect
it('should handle custom prefix and separator', () => run(__filename));
