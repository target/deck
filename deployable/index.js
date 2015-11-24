'use strict';

// deck is reliant on a million jquery features; we need to load it before angular so that angular does not
// try to use its jqLite implementation.
global.$ = global.jQuery = require('jquery');

const angular = require('angular');

module.exports = angular.module('spinnaker-ui-deployable', [
  require('src'),
])
.config(function(apiHostProvider) {
  console.log(__GATE_HOST__);
  apiHostProvider.setHost(__GATE_HOST__);
});
