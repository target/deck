'use strict';

let angular = require('angular');

module.exports = angular
  .module('spinnaker.netflix.whatsNew', [
    require('./whatsNew.directive.js'),
    require('./whatsNew.read.service.js'),
  ]);
