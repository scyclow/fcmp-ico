'use strict';

const webpack = require('webpack');
const defaults = require('./webpack.default');
const postcss = require('./postcss');

process.env.BABEL_ENV = "development";

defaults.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: 'development'
    }
  })
);

defaults.devtool = 'cheap-module-source-map';
defaults.module.rules.push({
  test: /\.css$/,
  use: [
    'style-loader',
    'css-loader',
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
        plugins: postcss,
      },
    }
  ]
});

module.exports = defaults;
