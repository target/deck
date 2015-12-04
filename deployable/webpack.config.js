'use strict';

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var path = require('path');
var sharedConfig = require(
  path.join(__dirname, '..', 'webpack.sharedConfig.js')
);
var webpack = require('webpack');
var definitions = sharedConfig.sharedDefinitions;

definitions.__DEFAULT_TIME_ZONE__ = process.env.TIME_ZONE || "'America/Los_Angeles'";
definitions.__GATE_HOST__ = process.env.GATE_HOST || "'spinnaker-api-prestaging.prod.netflix.net'";
definitions.__WHATS_NEW_GIST_ID__ = process.env.WHATS_NEW_GIST_ID|| "'32526cd608db3d811b38'";
definitions.__WHATS_NEW_FILE_NAME__ = process.env.WHATS_NEW_FILE_NAME || "'news.md'";
definitions.__WHATS_NEW_ACCESS_TOKEN__ = process.env.WHATS_NEW_ACCESS_TOKEN || "''";
definitions.__AUTH_ENDPOINT__ = process.env.AUTH_ENDPOINT || "'https://spinnaker-api-prestaging.prod.netflix.net/auth/info'";
definitions.__FEEDBACK_URL__ = process.env.FEEDBACK_URL || "'http://hootch.test.netflix.net/submit'";
definitions.__BAKERY_DETAIL_URL__ = process.env.BAKERY_DETAIL_URL || "'http://bakery.test.netflix.net/#/?region={{context.region}}&package={{context.package}}&detail=bake:{{context.status.resourceId}}'";
definitions.__DEFAULT_PROVIDERS__ = process.env.DEFAULT_PROVIDERS || "['aws']";

definitions.__FEATURE_REBAKE_ENABELED__ = process.env.FEATURE_REBAKE_ENABELED || "true";
definitions.__FEATURE_NETFLIX_MODE_ENABELED__ = process.env.FEATURE_NETFLIX_MODE_ENABELED || "true";
definitions.__FEATURE_BLESK_ENABLED__ = process.env.FEATURE_BLESK_ENABLED || "true";
definitions.__FEATURE_FAST_PROPERTIES_ENABLED__ = process.env.FEATURE_FAST_PROPERTIES_ENABLED || "true";
definitions.__FEATURE_VPC_MIGRATOR_ENABELED__ = process.env.FEATURE_VPC_MIGRATOR_ENABELED || "true";
definitions.__FEATURE_CLUSTER_DIFF_ENABLED__ = process.env.FEATURE_CLUSTER_DIFF_ENABLED || "true";
definitions.__FEATRUE_PIPELINES_ENABLED__ = process.env.FEATRUE_PIPELINES_ENABLED || "true";
definitions.__FEATRUE_CHAOS_MONKEY_ENABLED__= process.env.FEATRUE_CHAOS_MONKEY_ENABLED || "true";

definitions.__ALERTING_ON__ = process.env.ALERTING_ON || "false";
definitions.__ALERTING_URL__ = process.env.ALERTING_URL || "'http://atlas-alert-api-main.us-west-1.prod.netflix.net:7001/api/v3/trigger'";
definitions.__ALERTING_RECIPIENTS__ = process.env.ALERTING_RECIPIENTS || "['chrisb@netflix.com', 'zthrash@netflix.com']";
definitions.__ALERTING_SUBJECT__ = process.env.ALERTING_SUBJECT || "'[Spinnaker] Error in Deck'";
definitions.__ALERTING_TEMPLATE_NAME__ = process.env.ALERTING_TEMPLATE_NAME || "'spinnaker_deck_error'";
definitions.__ALERTING_THROTTLE_SEC__ = process.env.ALERTING_THROTTLE_SEC || 5 * 60;

var awsConfig = "{ defaults: { account: 'test', region: 'us-east-1' }, defaultSecurityGroups: ['nf-datacenter-vpc', 'nf-infrastructure-vpc', 'nf-datacenter', 'nf-infrastructure'] }";
var gceConfig = "{ defaults: { account: 'my-google-account', region: 'us-central1', zone: 'us-central1-f', },}";
var azureConfig = "{ defaults: { account: 'azure-test', region: 'West US' },}";
var titanConfig = "{ defaults: { account: 'titantest', region: 'us-east-1' },}";
var cfConfig = "{ defaults: { account: 'titantest', region: 'us-east-1' },}";
definitions.__AWS_PROVIDER_SETTINGS__ = process.env.AWS_PROVIDER_SETTINGS || awsConfig;
definitions.__GCE_PROVIDER_SETTINGS__ = process.env.GCE_PROVIDER_SETTINGS || gceConfig;
definitions.__AZURE_PROVIDER_SETTINGS__ = process.env.AZURE_PROVIDER_SETTINGS || azureConfig;
definitions.__TITAN_PROVIDER_SETTINGS__ = process.env.TITAN_PROVIDER_SETTINGS || titanConfig;
definitions.__CF_PROVIDER_SETTINGS__ = process.env.CF_PROVIDER_SETTINGS || cfConfig;

var alias = sharedConfig.sharedAliases;
alias['src'] = path.join(__dirname, '..', 'app', 'scripts');
alias['config'] = path.join(__dirname, '..', 'app', 'scripts', 'config');

module.exports = {
  debug: sharedConfig.debug,
  devtool: sharedConfig.devtool,
  entry: path.join(__dirname, 'index.js'),
  output: {
    path: path.join(__dirname, 'build', 'webpack', process.env.SPINNAKER_ENV || ''),
    filename: '[name].js',
  },
  module: sharedConfig.module,
  resolve: {
    root: [
      sharedConfig.nodeModulesPath,
      sharedConfig.bowerComponentsPath,
    ],
    alias: alias,
  },
  resolveLoader: {
    root: sharedConfig.nodeModulesPath,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Spinnaker',
      template: path.join(__dirname, 'index.html'),
      favicon: path.join(__dirname, 'favicon.ico'),
      inject: true,
    }),
    new webpack.DefinePlugin(definitions),
  ],
  devServer: {
    port: process.env.DECK_PORT || 9000,
    host: process.env.DECK_HOST || 'localhost'
  }
};
