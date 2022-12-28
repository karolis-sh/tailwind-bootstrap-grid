const path = require('path');

const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [tailwindcss(path.resolve(__dirname, 'tailwind.js'))],
};
