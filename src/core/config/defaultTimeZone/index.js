'use strict';

const angular = require('angular');

module.exports = angular.module('spinnaker.core.config.defalutTime', [])
  .provider('defaultTimeZone', function() {
    let defalutTimeZone = 'America/Los_Angeles';
    this.$get = function() {
      return {
        get() {
          return defalutTimeZone;
        },
        set(tz) {
          defalutTimeZone = tz;
        }
      };
    };
  });
