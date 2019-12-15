const path = require('path')

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {

  },
  devServer: {
    contentBase: './dist',
    port: 9000
  },
  plugins: []
}