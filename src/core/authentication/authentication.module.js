'use strict';

let angular = require('angular');

module.exports = angular.module('spinnaker.authentication', [
  require('./authentication.service.js'),
  require('../config/settings.js'),
  require('./authentication.initializer.service.js'),
  require('./authentication.interceptor.service.js'),
  //require('../config/apiHost')
])
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('gateRequestInterceptor');
  })
  .config(function ($httpProvider, apiHostProvider) {
    if (apiHostProvider.authOn) {
      $httpProvider.interceptors.push('authenticationInterceptor');
    }
  })
  .run(function (authenticationInitializer, apiHost) {
    if(apiHost.authEnabled()) {
      authenticationInitializer.authenticateUser();
    }
  })
  .factory('gateRequestInterceptor', function (apiHost) {
    return {
      request: function (config) {
        if (config.url.indexOf(apiHost.baseUrl()) === 0) {
          config.withCredentials = true;
        }
        return config;
      }
    };
  });
