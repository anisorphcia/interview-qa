const path = require('path');

module.exports = {
  entry: './02.es6.js', // 入口文件
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js' // 输出文件
  },
  module: {
    rules: [
      {
        test: /\.js$/, // 对所有 .js 文件使用 babel-loader
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  mode: 'development' // 开发模式
};
