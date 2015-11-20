'use strict';

let angular = require('angular');

module.exports = angular
  .module('spinnaker.netflix.migrator', [
    require('./pipeline'),
    require('./serverGroup'),
    require('./migrator.service.js'),
  ]);
