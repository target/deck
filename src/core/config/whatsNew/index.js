'use strict';


let angular = require('angular');

module.exports = angular
  .module('spinnaker.core.config.whatsNew', [])
  .provider('whatsNew', function() {
    let whatsNew = {
      gistId: '',
      fileName: 'news.md',
      accessToken: '',
    };
    this.$get = function() {
      return {
        gistId() {
          return whatsNew.gistId;
        },
        setGistid(gistId) {
          whatsNew.gistId = gistId;
        },
        fileName() {
          return whatsNew.fileName;
        },
        setFileName(fileName) {
          whatsNew.fileName = fileName;
        },
        accessToken() {
          return whatsNew.accessToken;
        },
        setAccessToken(token) {
          whatsNew.accessToken = token;
        },
        get() {
          return whatsNew;
        }
      };
    };
  });
