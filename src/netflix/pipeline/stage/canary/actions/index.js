'use strict';

let angular = require('angular');

module.exports = angular
  .module('spiinnaker.netflix.pipeline.stage.canary.actions', [
    require('./endCanary.controller.js'),
    require('./generateScore.controller.js')
  ])
  .name;
