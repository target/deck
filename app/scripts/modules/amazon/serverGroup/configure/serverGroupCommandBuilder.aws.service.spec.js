/*
 * Copyright 2014 Netflix, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

describe('Service: awsServerGroup', function () {

  beforeEach(
    window.module(
      require('config'),
      require('./serverGroupCommandBuilder.service.js')
    )
  );

  beforeEach(
    window.inject(function (_$httpBackend_, awsServerGroupCommandBuilder, _accountService_, _instanceTypeService_, _$q_, $rootScope, _providersConfig_) {
      this.$httpBackend = _$httpBackend_;
      this.service = awsServerGroupCommandBuilder;
      this.accountService = _accountService_;
      this.$q = _$q_;
      this.$scope = $rootScope;
      this.providersConfig = _providersConfig_;
      spyOn(_instanceTypeService_, 'getCategoryForInstanceType').and.returnValue(_$q_.when('custom'));
  }));

  describe('buildServerGroupCommandFromPipeline', function () {

    beforeEach(function() {

      this.cluster = {
        loadBalancers: ['elb-1'],
        account: 'prod',
        availabilityZones: {
          'us-west-1': ['d', 'g']
        },
        capacity: {
          min: 1,
          max: 1
        }
      };

      this.providersConfig.addProvider('aws', {
        defaults: {
          account: 'test',
          region: 'us-east-1'
        },
        defaultSecurityGroups: ['nf-datacenter-vpc', 'nf-infrastructure-vpc', 'nf-datacenter', 'nf-infrastructure'],
      });

      spyOn(this.accountService, 'getAvailabilityZonesForAccountAndRegion').and.returnValue(
        this.$q.when(['d', 'g'])
      );

      spyOn(this.accountService, 'getRegionsKeyedByAccount').and.returnValue(
        this.$q.when({
          test: ['us-east-1', 'us-west-1'],
          prod: ['us-west-1', 'eu-west-1']
        })
      );

    });

    it('applies account, region from cluster', function () {

      var command = null;
      this.service.buildServerGroupCommandFromPipeline({}, this.cluster).then(function(result) {
        command = result;
      });

      this.$scope.$digest();

      expect(command.credentials).toBe('prod');
      expect(command.region).toBe('us-west-1');
    });

    it('sets usePreferredZones', function() {
      var command = null;
      this.service.buildServerGroupCommandFromPipeline({}, this.cluster).then(function(result) {
        command = result;
      });

      this.$scope.$digest();
      expect(command.viewState.usePreferredZones).toBe(true);

      // remove an availability zone, should be false
      this.cluster.availabilityZones['us-west-1'].pop();
      this.service.buildServerGroupCommandFromPipeline({}, this.cluster).then(function(result) {
        command = result;
      });

      this.$scope.$digest();
      expect(command.viewState.usePreferredZones).toBe(false);
    });

  });

});
