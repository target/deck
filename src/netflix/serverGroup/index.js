'use strict';

let angular = require('angular');

module.exports = angular
  .module('spinnaker.netflix.serverGroup', [
    require('./diff'),
    require('./networking'),
    require('./netflixAwsServerGroupDetails.controller.js'),
    require('./serverGroupCommandConfigurer.service.js'),
  ])
  .name;
