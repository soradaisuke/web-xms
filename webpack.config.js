const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const resolve = require('./resolve');

module.exports = {
  mode: 'production',
  context: path.resolve(__dirname, 'src'),
  entry: {
    index: './index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve,
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          ie8: true,
          safari10: true,
        },
      }),
    ],
  },
};
