'use strict';

const angular = require('angular');

module.exports = angular.module('spinnaker.core.config.apiHost', [
    require('exports?"restangular"!imports?_=lodash!restangular'),
])
  .provider('apiHost', function() {
    this.host = null;
    this.authEndpoint = null;
    this.useHttps = true;
    this.authEnabled = false;
    this.pollSchedule = 30000;

    this.baseUrl = () => {
      if (this.host === null) {
        throw ("API host has not been set. Set with apiHostProvider#setHost");
      }
      return this.useHttps ? `https://${ this.host }` : `http://${ this.host }`;

    };

    this.$get = () => ({
      setHost(h) {
        this.host = h;
      },
      setAuthEndpoint(endpoint) {
        this.authEndpoint = endpoint;
      },
      useHttps(value) {
        this.useHttps = value;
      },
      host() {
        return this.host;
      },
      authEndpoint() {
        if (this.authEndpoint === null) {
          throw ("Authentication endpoint has not been set. Set with apiHostProvider#setAuthEndpoint");
        }
        return this.authEndpoint;
      },
      baseUrl: this.baseUrl,
      authEnabled() {
        return this.authEnabled;
      },
      enableAuth() {
        this.authEnabled = true;
      },
      disableAuth() {
        this.authEnabled = false;
      },
      setPollSechedule(pollScheduleInMillis) {
        this.pollSchedule = pollScheduleInMillis;
      },
      getPollSchedule() {
        return this.pollSchedule;
      }
    });
  });
