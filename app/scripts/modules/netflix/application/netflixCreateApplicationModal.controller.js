'use strict';

let angular = require('angular');

module.exports = angular
  .module('spinnaker.netflix.application.create.modal.controller', [
    require('config'),
    require('angular-ui-router'),
    require('../../core/application/service/applications.write.service.js'),
    require('../../core/application/service/applications.read.service.js'),
    require('../../core/utils/lodash.js'),
    require('../../core/account/account.service.js'),
  ])
  .controller('netflixCreateApplicationModalCtrl', function($controller, $scope, $q, $log, $state, $modalInstance,
                                                            featureFlagConfig,
                                                            accountService, applicationWriter, applicationReader, _) {

    angular.extend(this, $controller('CreateApplicationModalCtrl', {
      $scope: $scope,
      $q: $q,
      $log: $log,
      $state: $state,
      $modalInstance: $modalInstance,
      accountService: accountService,
      applicationWriter: applicationWriter,
      applicationReader: applicationReader,
      _ : _,
    }));

    this.chaosEnabled = featureFlagConfig.get('chaosMonkey');

    if (this.chaosEnabled) {
      this.application.chaosMonkey = {
        enabled: true,
        meanTimeBetweenKillsInWorkDays: 5,
        minTimeBetweenKillsInWorkDays: 1,
        grouping: 'cluster',
        regionsAreIndependent: true,
        exceptions: [],
      };
    }

  });
