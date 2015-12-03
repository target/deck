'use strict';

let angular = require('angular');

module.exports = angular
  .module('spinnaker.core.config.alert', [])
  .provider('alertConfig', () => {
    let url = null;
    let recipients = [];
    let subject = '[Spinnaker] Error in Deck';
    let template = 'spinnaker_deck_error';
    let throttleInSeconds = 5 * 60;
    let shouldAlert = false;

    return {
      setAlerting: (value) => shouldAlert = value,
      setUrl: (alertEndpoint) => url = alertEndpoint,
      setRecipients: (recipientsList) => recipients = recipientsList,
      setSubject: (subjectLine) => subject = subjectLine,
      setTemplateName: (templateName) => template = templateName,
      setThrottleInSeconds: (seconds) => throttleInSeconds = seconds,
      $get: () => {
        return {
          alert: () => shouldAlert,
          url: () => {
            if (url === null) {
              throw ("Alert URL has not been set. Set with alertConfigProvider#setUrl");
            }
            return url;
          },
          recipients: () => recipients,
          throttleInSeconds: () => throttleInSeconds,
          subject: () => subject,
          template: () => template,
        };
      }
    };
  });

