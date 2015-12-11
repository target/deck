'use strict';

const angular = require('angular');

// TODO: angular loader doesn't recognize this as a module definition b/c modulesToInclude is not an ArrayExpression
// manually appending .name for now
module.exports = angular.module('netflix.spinnaker', [
    require('./modules/core'),
  ])
  .config(function ($logProvider, statesProvider) {
    statesProvider.setStates();
    $logProvider.debugEnabled(true);
  });


