const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: ['react-hot-loader/babel'],
  },
};

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, '../build'),
  },
  devtool: process.env.NODE_ENV === 'development' ? 'eval' : 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: babelLoader,
      },
      {
        test: /.mdx?$/i,
        use: [babelLoader, '@mdx-js/loader'],
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader', options: { postcssOptions: { path: __dirname } } },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src/index.html') }),
    new MiniCssExtractPlugin(),
  ],
};
