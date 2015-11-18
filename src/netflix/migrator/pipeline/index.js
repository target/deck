'use strict';


let angular = require('angular');

module.exports = angular
  .module('spinnaker.netflix.migratior.pipeline', [
    require('./pipeline.migrator.directive')
  ])
  .name;
