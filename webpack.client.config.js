var path = require('path');

module.exports = {
  entry: './client/index.js',
  devtool: 'inline-source-map',
  mode: 'development',
  target: "web",
  output: {
    path: path.join(__dirname, 'clientBuild'),
    filename: 'clientBundle.js',
  },
  module: {
    rules: [
      {
        test: [/.jsx?$/, /.js?$/],
        loader: 'babel-loader',
        include: path.join(__dirname, 'client'),
        exclude: /node_modules/,
        query: {
          "presets": ["@babel/preset-env", "@babel/preset-react"]
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'clientBuild/'),
    compress: true,
    port: 3000
  }
};