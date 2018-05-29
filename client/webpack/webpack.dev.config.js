var webpack = require('webpack');
var path = require('path');

var parentDir = path.join(__dirname, '../client/')

module.exports = {
  entry: [
    path.join(parentDir, 'index.js')
  ],
  output: {
    path: parentDir + '/dist',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: parentDir,
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:3000"
    }
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
    }, {
      test: /\.less$/,
      loaders: ["style-loader", "css-loader", "less-loader"]
    }]
  },
  mode: "development"
}