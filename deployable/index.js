'use strict';

const angular = require('angular');

module.exports = angular.module('spinnaker-ui-deployable', [
  require('src'),
])
  .config(function(apiHostProvider) {
    apiHostProvider.setHost(__GATE_HOST__);
  });
