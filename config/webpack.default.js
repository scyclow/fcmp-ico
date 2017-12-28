'use strict';

const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const html = (params) => new HtmlWebpackPlugin(params);
const rootDir = (...paths) => path.join(__dirname, '..', ...paths);

module.exports = {
  context: rootDir('src'),
  entry: {
    index: './index.js',
    invest: './invest/index.js'
  },
  output: {
    path: rootDir('docs'),
    filename: '[name].bundle.js'
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      'node_modules'
    ],
    alias: {
      utils: rootDir('./src/utils'),
      assets: rootDir('./src/assets'),
      components: rootDir('./src/components'),
      contracts: rootDir('./build/contracts')
    }
  },
  plugins: [
    html({
      template: rootDir(`src/index.html`),
      filename: 'index.html',
      inject: 'body',
      chunks: ['index'],
      inlineSource: '.(js|css)$' // inline all css and js in prod
    }),
    html({
      template: rootDir(`src/invest/index.html`),
      filename: 'invest.html',
      inject: 'body',
      chunks: ['invest'],
      inlineSource: '.(js|css)$' // inline all css and js in prod
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(html|svg)$/,
        exclude: /node_modules/,
        loader: 'template-string-loader'
      }
    ]
  }
};
