'use strict';

let angular = require('angular');

import {HealthCount} from './healthCounts.component.ts';


module.exports = angular
  .module('spinnaker.core.healthCounts.component', [])
  .directive('healthCounts2', window.adapter.downgradeNg2Component(HealthCount));
