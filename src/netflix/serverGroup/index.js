'use strict';

let angular = require('angular');

module.exports = angular
  .module('spinnaker.netflix.serverGroup', [
    require('./diff'),
    require('./networking'),
    require('./serverGroupCommandConfigurer.service.js'),
  ]);
