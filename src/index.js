'use strict';

// deck is reliant on a million jquery features; we need to load it before angular so that angular does not
// try to use its jqLite implementation.
global.$ = global.jQuery = require('jquery');

let angular = require('angular');

module.exports = angular.module('netflix.spinnaker', [
  require('./netflix'),
  require('./core'),
  require('./amazon'),
  require('./google'),
  require('./cloudfoundry'),
  require('./titan')
])
.config(function(defaultTimeZoneProvider) {
  defaultTimeZoneProvider.set(__DEFAULT_TIME_ZONE__);
});

