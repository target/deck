'use strict';


let angular = require('angular');

module.exports = angular
  .module('spinnaker.netflix.migrator.pipeline', [
    require('./pipeline.migrator.directive')
  ]);
