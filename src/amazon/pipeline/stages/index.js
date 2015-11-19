'use strict';

const angular = require('angular');

module.exports = angular.module('spinnaker.amazon.pipeline.stages', [
  require('./bake'),
  require('./destroyAsg'),
  require('./disableAsg'),
  require('./disableCluster'),
  require('./enableAsg'),
  require('./findAmi'),
  require('./resizeAsg'),
  require('./scaleDownCluster'),
  require('./shrinkCluster'),
]);
