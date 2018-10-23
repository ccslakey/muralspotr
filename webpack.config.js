var path = require('path');

module.exports = {
    entry: './server.js',
    devtool: 'inline-source-map',
    mode: 'development',
    target: "node",
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    }
  };