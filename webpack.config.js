'use strict'
const path = require('path')

module.exports = {
  watch: true,

  entry: {
    'app': ['./js/app.js']
  },


  output: {
    path: './build',
    filename: '[name].js'
  },

  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.js$/, exclude: [/node_modules/], loader: 'babel'}
    ]
  },

  resolve: {
    root: [
      path.resolve(__dirname, './node_modules')
    ],
    alias: {
      // set jquery alias to avoid duplicated modules in upstay_common
      // 'vue': path.resolve(__dirname, './node_modules/vue'),
      'vue': path.resolve(__dirname, './node_modules/vue/dist/vue.js')
    }
  },

  devtool: '#source-map'
};