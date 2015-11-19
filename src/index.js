'use strict';

// deck is reliant on a million jquery features; we need to load it before angular so that angular does not
// try to use its jqLite implementation.
global.$ = global.jQuery = require('jquery');

const angular = require('angular');

let modulesToInclude = [
  require('./core'),
];

if (__NETFLIX_ENABLED__) {
  modulesToInclude.push(
    require('./netflix')
  );
}

if (__AMAZON_ENABLED__) {
  modulesToInclude.push(
    require('./amazon')
  );
}

if (__GOOGLE_ENABLED__) {
  modulesToInclude.push(
    require('./google')
  );
}

if (__CLOUDFOUNDRY_ENABLED__) {
  modulesToInclude.push(
    require('./cloudfoundry')
  );
}

if (__TITAN_ENABLED__) {
  modulesToInclude.push(
    require('./titan')
  );
}

module.exports = angular.module('netflix.spinnaker', modulesToInclude)
.config(function(defaultTimeZoneProvider) {
  defaultTimeZoneProvider.set(__DEFAULT_TIME_ZONE__);
});

