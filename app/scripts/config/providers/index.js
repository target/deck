'use strict';

let angular = require('angular');

module.exports = angular
  .module('spinnaker.core.config.providers', [])
  .provider('providersConfig', () => {
    let providers = {};

    let addProviderFn = (name, config) => {
      providers[name] = config;
    };

    return {
      addProvider: addProviderFn,
      provider: (name) => providers[name],
      $get: () => {
        return {
          provider: (name) => {
            return providers[name];
          },
          providers: () => {
            return providers;
          },
          addProvider: addProviderFn,
        };
      }
    };
  });
