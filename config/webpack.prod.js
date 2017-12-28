'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const defaults = require('./webpack.default');
const postcss = require('./postcss');

process.env.BABEL_ENV = "production";

defaults.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: 'production'
    }
  })
);

defaults.module.rules.push({
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      'css-loader',
      {
        loader: require.resolve('postcss-loader'),
        options: {
          ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
          plugins: postcss,
        },
      }
    ]
  })
});

defaults.plugins.push(new ExtractTextPlugin('[name].css'))
defaults.plugins.push(new HtmlWebpackInlineSourcePlugin())

module.exports = defaults;
