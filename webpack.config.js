module.exports = {
  cache: true,

  watch: true,

  entry: {
    'app': ['./js/app.js']
  },

  output: {
    filename: '[name].js'
  },

  devtool: 'inline-source-map',

  module: {
    loaders: [
      { test: /\.js$|\.vue$/, exclude: /node_modules|build/, loader: 'vue'}
    ]
  },

  // vue-loader config:
  // lint all JavaScript inside *.vue files with ESLint
  // make sure to adjust your .eslintrc
  vue: {
    loaders: {
      js: 'babel-loader'
    }
  },

  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.vue']
  }
};