const path = require('path');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');

const CSS_INPUT = `
@tailwind components;
@tailwind utilities;
`;

describe('tailwind-bootstrap-grid', () => {
  it('should handle defaults', async () => {
    const result = await postcss()
      .use(tailwindcss(path.resolve(__dirname, 'tailwind.js')))
      .process(CSS_INPUT, { from: undefined });

    expect(result.warnings().length).toBe(0);
    expect(result.css).toMatchSnapshot();
  });

  it('should handle custom prefix and separator', async () => {
    const result = await postcss()
      .use(tailwindcss(path.resolve(__dirname, 'tailwind.prefix-separator.js')))
      .process(CSS_INPUT, { from: undefined });

    expect(result.warnings().length).toBe(0);
    expect(result.css).toMatchSnapshot();
  });

  it('should handle rtl', async () => {
    const result = await postcss()
      .use(tailwindcss(path.resolve(__dirname, 'tailwind.rtl.js')))
      .process(CSS_INPUT, { from: undefined });

    expect(result.warnings().length).toBe(0);
    expect(result.css).toMatchSnapshot();
  });

  it('should handle rtl option and custom prefix, separator', async () => {
    const result = await postcss()
      .use(tailwindcss(path.resolve(__dirname, 'tailwind.rtl-prefix-separator.js')))
      .process(CSS_INPUT, { from: undefined });

    expect(result.warnings().length).toBe(0);
    expect(result.css).toMatchSnapshot();
  });
});
