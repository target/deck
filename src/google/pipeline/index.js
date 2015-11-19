'use strict';

const angular = require('angular');

module.exports = angular.module('spinnaker.gce.pipeline', [
  require('./stages'),
]);
