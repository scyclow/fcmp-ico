'use strict';

const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config/webpack.dev')
const WebpackDevServer = require('webpack-dev-server');

const HOST = process.env.HOST || '0.0.0.0';
const PORT = 8421;

const compiler = webpack(config)
const devServer = new WebpackDevServer(compiler, {
  hot: true,
  publicPath: '/'
});

devServer.listen(PORT, HOST, err => {
  if (err) {
    return console.log(err);
  }

  console.log(chalk.cyan(`Starting the development server at localhost:${PORT}\n`));
});
