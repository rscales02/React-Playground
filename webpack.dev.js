const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge.strategy({
  entry: 'prepend',
})(common, {
  devtool: 'eval',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
    hot: true,
    overlay: true,
    progress: true,
    historyApiFallback: true,
  },
  entry: [
    'react-hot-loader/patch',
  ],
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
});