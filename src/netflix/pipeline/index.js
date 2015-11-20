'use strict';


let angular = require('angular');

module.exports = angular
  .module('spinnaker.netflix.pipeline', [
    require('./stage/canary'),
  ]);
