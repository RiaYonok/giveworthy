var path = require('path');
var srcDir = path.resolve(__dirname, 'src');
var buildDir = path.resolve(__dirname, 'build');

var webpack = require('webpack');
var BabelMinifyWebpackPlugin = require('babel-minify-webpack-plugin');
var UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.resolve(srcDir, 'index.html'),
  filename: 'index.html',
  inject: 'body',
});

module.exports = env => {
  var rules = [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    },
    {
      test: /\.s[ca]ss$/,
      exclude: /node_modules/,
      use: [
        "style-loader",
        "css-loader",
        "postcss-loader",
        "sass-loader"
      ],
    },
  ];

  var output = {
    filename: 'app.js',
    path: buildDir
  };

  var resolve = {
    alias: {
      Components: path.resolve(__dirname, 'src/components'),
      Redux: path.resolve(__dirname, 'src/redux'),
      Scss: path.resolve(__dirname, 'assets/scss') 
    }
  };

  if (!env || !env.mode)
    env = {mode: 'development'};

  if (env.mode === 'production') {
    return {
      entry: path.resolve(srcDir, 'index.js'),
      module: { rules },
      output,
      resolve,
      mode: 'production',
      devtool: 'eval',
      plugins: [
        HTMLWebpackPluginConfig,
        new CleanWebpackPlugin(['build']),
        new UglifyJSWebpackPlugin(),
        new BabelMinifyWebpackPlugin()
      ]
    };
  } else {
    return {
      entry: path.resolve(srcDir, 'index.js'),
      module: { rules },
      output,
      resolve,
      mode: 'development',
      devtool: 'inline-source-map',
      devServer: {
        contentBase: buildDir,
        hot: true
      },
      plugins: [
        HTMLWebpackPluginConfig,
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
      ]
    };
  }
};
