'use strict';

let angular = require('angular');

module.exports = angular
  .module('spinnaker.netflix.report', [
    require('./reservationReport.directive.js'),
    require('./reservationReport.read.service.js'),
  ])
  .name;
