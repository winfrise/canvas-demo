const path = require('path')

module.exports = {
  entry: {
    'ball-move': './src/ball-move.js', // 小球自由落体运动
    'ball-parabola-move': './src/ball-parabola-move.js' // 烟花
  },
  mode: 'development',
  output: {
    filename: '[name].js',
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