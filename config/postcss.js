'use strict';

const autoprefixer = require('autoprefixer');

module.exports = () => [
  require('postcss-flexbugs-fixes'),
  require('postcss-cssnext'),
  // autoprefixer({
  //   browsers: [
  //     '>1%',
  //     'last 4 versions',
  //     'Firefox ESR',
  //     'not ie < 9',
  //   ],
  //   flexbox: 'no-2009',
  // }),
]
