'use strict';

let angular = require('angular');

module.exports = angular
  .module('spinnaker.netflix.serverGroup.diff', [
    require('./diff.service.js'),
    require('./securityGroupDiff.directive.js'),
  ])
  .name;
