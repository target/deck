'use strict';

let angular = require('angular');

module.exports = angular
  .module('spinnaker.netflix', [
    require('./alert/alertHandler.js'),
    require('./blesk'),
    require('./canary'),
    require('./fastProperties'),
    require('./feedback'),
    require('./instance/aws/netflixAwsInstanceDetails.controller.js'),
    require('./migrator'),
    require('./pipeline'),
    require('./report'),
    require('./serverGroup'),
    require('./templateOverride'),
    require('./whatsNew'),
  ])
  .name;
