const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: ['react-hot-loader/babel'],
  },
};

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, '../build'),
  },
  devtool: process.env.NODE_ENV === 'development' ? 'eval' : 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: babelLoader,
      },
      {
        test: /.mdx?$/,
        use: [babelLoader, '@mdx-js/loader'],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          ExtractCssChunks.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader', options: { config: { path: __dirname } } },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src/index.html') }),
    new ExtractCssChunks(),
  ],
};
