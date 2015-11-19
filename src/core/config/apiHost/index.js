'use strict';

const angular = require('angular');

module.exports = angular.module('spinnaker.core.config.apiHost', [
  require('restangular'),
])
  .provider('apiHost', function() {
    this.host = null;
    this.authEndpoint = null;
    this.useHttps = true;
    this.authEnabled = false;
    this.pollSchedule = 30000;

    this.$get = function() {
      var that = this;
      return {
        setHost(h) {
          that.host = h;
        },
        setAuthEndpoint(endpoint) {
          that.authEndpoint = endpoint;
        },
        useHttps(value) {
          that.useHttps = value;
        },
        host() {
          return that.host;
        },
        authEndpoint() {
          if (that.authEndpoint === null) {
            throw ("Authentication endpoint has not been set. Set with apiHostProvider#setAuthEndpoint");
          }
          return that.authEndpoint;
        },
        baseUrl() {
          if (that.host === null) {
            throw ("API host has not been set. Set with apiHostProvider#setHost");
          }
          return useHttps ? `https://${ that.host }` : `http://${ that.host }`;
        },
        authEnabled() {
          return that.authEnabled;
        },
        enableAuth() {
          that.authEnabled = true;
        },
        disableAuth() {
          that.authEnabled = false;
        },
        setPollSechedule(pollScheduleInMillis) {
          that.pollSchedule = pollScheduleInMillis;
        },
        getPollSchedule() {
          return that.pollSchedule;
        }
      };
    };
  });
