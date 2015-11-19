'use strict';

const angular = require('angular');

module.exports = angular.module('spinnaker.cloudfoundry.pipeline', [
  require('./stages'),
]);
