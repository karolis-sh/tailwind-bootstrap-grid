const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const prettier = require('prettier');

const CSS_INPUT = `
@tailwind components;
@tailwind utilities;
`;

module.exports = async (testFile) => {
  const configFile = testFile.replace('.test.js', '.js');

  const result = await postcss()
    .use(tailwindcss(configFile))
    .process(CSS_INPUT, { from: undefined });

  expect(result.warnings().length).toBe(0);
  expect(prettier.format(result.css, { parser: 'css' })).toMatchSnapshot();
};
