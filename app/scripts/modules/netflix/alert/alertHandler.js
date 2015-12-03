'use strict';

let angular = require('angular');

module.exports = angular
  .module('spinnaker.netflix.alert.handler', [
    require('config'),
    require('../../core/authentication/authentication.service.js'),
  ])
  .config(function ($provide) {
    $provide.decorator('$exceptionHandler', function($delegate, alertConfig, authenticationService, $) {
      return function(exception, cause) {
        $delegate(exception, cause);
        if (!alertConfig.alert()) {
          return;
        }
        let message = exception.message;
        if (!message) {
          try {
            message = JSON.stringify(exception);
          } catch (e) {
            message = '[No message available - could not convert exception to JSON string]';
          }
        }
        let payload = {
          alertName: 'Spinnaker',
          details: {
            url: location.href,
            user: authenticationService.getAuthenticatedUser().name,
          },
          exception: {
            classes: [exception.name || '[no name on exception]'],
            messages: [message],
            stackTraces: [exception.stack || '[no stacktrace available]'],
            callerClass: 'Spinnaker',
            callerMethod: '[see stack trace]',
          },
          actions: [
            {
              action: 'email',
              suppressTimeSecs: alertConfig.throttleInSeconds(),
              to: alertConfig.recipients(),
              subject: alertConfig.subject() || '[Spinnaker] Error in Deck',
              htmlTemplate: alertConfig.template() || 'spinnaker_deck_error',
              incidentKey: exception.message,
            }
          ],
        };
        if (navigator.sendBeacon) {
          navigator.sendBeacon(alertConfig.url(), JSON.stringify(payload));
        } else {
          console.warn('no beacon support :(');
          $.post(alertConfig.url(), JSON.stringify(payload));
        }
      };
    });
  });
