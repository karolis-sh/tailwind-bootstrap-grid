const postcss = require('postcss');
const prettier = require('prettier');
const tailwindcss = require('tailwindcss');

const CSS_INPUT = `
@tailwind components;
@tailwind utilities;
`;

module.exports = async (testFile) => {
  const configFile = testFile.replace('.test.js', '.js');

  const result = await postcss()
    .use(tailwindcss(configFile))
    .process(CSS_INPUT, { from: undefined });

  expect(result.warnings()).toHaveLength(0);

  const css = await prettier.format(result.css, { parser: 'css' });

  expect(css).toMatchSnapshot();
};
