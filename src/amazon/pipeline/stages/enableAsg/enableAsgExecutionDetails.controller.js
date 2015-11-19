'use strict';

let angular = require('angular');

module.exports = angular.module('spinnaker.pipelines.stage.enableAsg.aws.executionDetails.controller', [
  require('core'),
])
  .controller('awsEnableAsgExecutionDetailsCtrl', function ($scope, $stateParams, executionDetailsSectionService) {

    $scope.configSections = ['enableServerGroupConfig', 'taskStatus'];

    function initialize() {
      executionDetailsSectionService.synchronizeSection($scope.configSections);
      $scope.detailsSection = $stateParams.details;
    }

    initialize();

    $scope.$on('$stateChangeSuccess', initialize, true);

  });
