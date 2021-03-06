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
    invest: './invest/index.js',
    flasher: './flasher/index.js',
    wallet: './wallet/index.js',
    terms: './terms/index.js',
    '404': './404/index.js',
    success: './success/index.js',
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
      inlineSource: '.(js|css)$',
      favicon: rootDir(`src/assets/favicon.ico`)
    }),
    html({
      template: rootDir(`src/invest/index.html`),
      filename: 'invest.html',
      inject: 'body',
      chunks: ['invest'],
      inlineSource: '.(js|css)$',
      favicon: rootDir(`src/assets/favicon.ico`)
    }),
    html({
      template: rootDir(`src/flasher/index.html`),
      filename: 'flasher.html',
      inject: 'body',
      chunks: ['flasher'],
      inlineSource: '.(js|css)$',
      favicon: rootDir(`src/assets/favicon.ico`)
    }),
    html({
      template: rootDir(`src/wallet/index.html`),
      filename: 'wallet.html',
      inject: 'body',
      chunks: ['wallet'],
      inlineSource: '.(js|css)$',
      favicon: rootDir(`src/assets/favicon.ico`)
    }),
    html({
      template: rootDir(`src/terms/index.html`),
      filename: 'terms.html',
      inject: 'body',
      chunks: ['terms'],
      inlineSource: '.(js|css)$',
      favicon: rootDir(`src/assets/favicon-business.ico`)
    }),
    html({
      template: rootDir(`src/404/index.html`),
      filename: '404.html',
      inject: 'body',
      chunks: ['404'],
      inlineSource: '.(js|css)$',
      favicon: rootDir(`src/assets/favicon-business.ico`)
    }),
    html({
      template: rootDir(`src/success/index.html`),
      filename: 'success.html',
      inject: 'body',
      chunks: ['success'],
      inlineSource: '.(js|css)$',
      favicon: rootDir(`src/assets/favicon.ico`)
    }),
    html({
      template: rootDir(`src/blog/index.html`),
      filename: 'blog.html',
      chunks: [],
      favicon: rootDir(`src/assets/favicon.ico`)
    }),
    html({
      template: rootDir(`src/blog/engineering/index.html`),
      filename: 'blog/engineering.html',
      chunks: [],
      favicon: rootDir(`src/assets/favicon.ico`)
    }),
    html({
      template: rootDir(`src/blog/engineering/solidity-for-fun-and-profit.html`),
      filename: 'blog/engineering/solidity-for-fun-and-profit.html',
      chunks: [],
      favicon: rootDir(`src/assets/favicon.ico`)
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
        test: /\.(jpg|png|pdf)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(html|svg)$/,
        exclude: /node_modules/,
        loader: 'babel-loader!template-string-loader'
      }
    ]
  }
};
