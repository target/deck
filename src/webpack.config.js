'use strict';

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var path = require('path');
var webpack = require('webpack');
var sharedConfig = require(
  path.join(__dirname, '..', 'webpack.sharedConfig.js')
);

module.exports = {
  debug: sharedConfig.debug,
  devtool: sharedConfig.devtool,
  entry: {
    app: path.join(__dirname, 'index.js'),
  },
  output: {
    path: path.join(__dirname, 'build', 'webpack', process.env.SPINNAKER_ENV || ''),
    filename: '[name].js',

  },
  externals: [{
    'angular': {
      root: 'angular',
      amd: 'angular',
      commonjs2: 'angular',
      commonjs: 'angular',
    },
    'jquery': {
      root: 'jquery',
      amd: 'jquery',
      commonjs2: 'jquery',
      commonjs: 'jquery',
    }
  }],
  module: sharedConfig.module,
  resolve: {
    root: [
      sharedConfig.nodeModulesPath,
      sharedConfig.bowerComponentsPath,
    ],
    alias: {
      'core': path.join(__dirname, 'core'),
      //lodash: 'utils/lodash.js'
      //angular: 'imports?window={}!exports?window.angular!angular/angular.js',
      //uiselect: 'angular-ui-select/dist/select.js'
    }
  },
  resolveLoader: {
    root: sharedConfig.nodeModulesPath,
  },
  plugins: [
    new CommonsChunkPlugin(
      /* filename= */'init.js'
    ),
    new webpack.DefinePlugin(
      Object.assign(
        sharedConfig.definitions,
        {
          __DEFAULT_TIME_ZONE__: process.env.TIME_ZONE || 'America/Los_Angeles',
        }
      )
    )
  ],
  devServer: {
    port: process.env.DECK_PORT || 9000,
    host: process.env.DECK_HOST || 'localhost'
  }
};
