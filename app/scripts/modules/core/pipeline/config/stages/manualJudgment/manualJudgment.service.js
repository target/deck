'use strict';

const angular = require('angular');

module.exports = angular
  .module('spinnaker.core.pipeline.stage.manualJudgment.service', [
    require('config'),
    require('../../../../delivery/service/execution.service.js'),
  ])
  .factory('manualJudgmentService', function($http, $q, executionService, apiHostConfig) {

    let buildMatcher = (stage, judgment, deferred) => {
      return (execution) => {
        let matches = execution.stages.filter((test) => test.id === stage.id);
        if (!matches.length) {
          deferred.reject();
          return true;
        }
        return matches[0].status !== 'RUNNING';
      };
    };

    let provideJudgment = (execution, stage, judgment) => {
      var targetUrl = [apiHostConfig.baseUrl(), 'pipelines', execution.id, 'stages', stage.id].join('/');
      var deferred = $q.defer();
      var request = {
        method: 'PATCH',
        url: targetUrl,
        data: {judgmentStatus: judgment},
        timeout: apiHostConfig.getPollSchedule() * 2 + 5000,
      };

      $http(request)
        .success(() => {
          executionService.waitUntilExecutionMatches(execution.id, buildMatcher(stage, judgment, deferred))
            .then(deferred.resolve, deferred.reject);
          }
        )
        .error(deferred.reject);

      return deferred.promise;
    };

    return {
      provideJudgment: provideJudgment
    };
  });
