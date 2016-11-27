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
      // 'vue': path.resolve(__dirname, './node_modules/vue'),
      'vue': path.resolve(__dirname, './node_modules/vue/dist/vue.js'),
      'core-js': path.resolve(__dirname, './node_modules/core-js'),
      'babel-runtime': path.resolve(__dirname, './node_modules/babel-runtime')
    }
  },

  devtool: '#source-map'
};