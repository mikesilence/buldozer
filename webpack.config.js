'use strict';

var config;
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

config = {
  entry:  {
    bootstrap: [
      path.resolve(__dirname, 'assets', 'javascripts', 'bootstrap.js'),
      path.resolve(__dirname, 'assets', 'javascripts', 'bootstrap-sprockets.js'),
      path.resolve(__dirname, 'assets', 'stylesheets', '_bootstrap.scss'),
      path.resolve(__dirname, 'assets', 'stylesheets', 'shop-homepage.css'),
    ],

    application: [
      path.resolve(__dirname, 'assets', 'javascripts', 'application.js')
    ]

    // stage01: path.resolve(__dirname, 'assets', 'javascripts', 'junior.js'),
    // stage02: path.resolve(__dirname, 'assets', 'javascripts', 'underscore.js')
  },
  output: {
    path: path.resolve(__dirname, 'static'),
    publicPath: '../',
    filename: '[name]/[name].js'
  },
  resolve: {
    moduleDirectories: ['node_modules'],
    root: path.resolve(__dirname, 'assets'),
    alias: {
      _fonts: 'fonts',
      _images: 'images',
      _scss: 'scss',
      _js: 'js',
    },
  },
  module: {
    loaders: [{
      test: /\.(eot|woff|woff2|ttf)$/,
      loader: 'url?name=fonts/[hash].[ext]&limit=5000',
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'url?name=images/[hash].[ext]&limit=5000',
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('css!autoprefixer-loader?browsers=last 5 version'),
    }, {
      test: /\.sass$/,
      loader: ExtractTextPlugin.extract('css!autoprefixer-loader?browsers=last 5 version!sass?sourceMap&indentedSyntax'),
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('css!autoprefixer-loader?browsers=last 5 version!sass?sourceMap&indentedSyntax'),
    }],
  },

  debug: true,

  watch: true,

  devtool: 'source-map',

  plugins: [
    new ExtractTextPlugin('[name]/[name].css', {allChunks: true}),
    new AssetsPlugin({
      filename: 'static.json',
      path: path.resolve(__dirname, 'static'),
      update: true,
      prettyPrint: true,
    })
  ]
};

if (process.env.NODE_VER === 'stage01') {
  config.entry.application.push(path.resolve(__dirname, 'assets', 'javascripts', 'junior.js'));
}

if (process.env.NODE_VER === 'stage02') {
  config.entry.application.push(path.resolve(__dirname, 'assets', 'javascripts', 'underscore.js'));
}

if (process.env.NODE_VER === 'stage03') {
  config.module.loaders.push({
    test: /\.pug$/,
    loader: 'pug-loader'
  })

  config.plugins.push(new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'template', 'index.pug')
    })
  )
}

module.exports = config;