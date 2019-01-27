const path = require('path');
const tailwindcss = require('tailwindcss');
const cssnano = require('cssnano');
const formatCss = require('stylefmt');

module.exports = {
  plugins: [tailwindcss(path.resolve(__dirname, 'tailwind.js')), cssnano(), formatCss],
};
