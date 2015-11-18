'use strict';

let angular = require('angular');

module.exports = angular
  .module('spinnaker.netflix.migrator.serverGroup', [
    require('./serverGroup.migrator.directive.js')
  ])
  .name;
