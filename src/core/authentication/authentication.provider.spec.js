'use strict';

let angular = require('angular');

describe('authenticationProvider: application startup', function() {

  beforeEach(
    window.module(
      require('./authentication.module.js')
    )
  );

  afterEach(function() {
    this.apiHost.disableAuth();
  });

  beforeEach(() => {
    angular
      .module('mockApp', [])
      .config((apiHostProvider) => {
        apiHostProvider.enableAuth();
      });

    window.module('mockApp');
  });

  beforeEach(window.inject(function(authenticationService, $timeout, $httpBackend, apiHost, redirectService, $window, $location, $rootScope) {
    this.authenticationService = authenticationService;
    this.$timeout = $timeout;
    this.$http = $httpBackend;
    this.apiHost = apiHost;
    this.redirectService = redirectService;
    this.$window = $window;
    this.$location = $location;
    this.$rootScope = $rootScope;
  }));

  describe('authenticateUser', function() {
    it('requests authentication from gate, then sets authentication name field', function() {
      if(!this.apiHost.authEnabled()) { pending(); } //prevents the test from running if authentication is not enabled
      this.$http.whenGET(this.apiHost.authEndpoint()).respond(200, {email: 'joe!'});
      this.$timeout.flush();
      this.$http.flush();

      expect(this.$rootScope.authenticating).toBe(false);
      expect(this.authenticationService.getAuthenticatedUser().name).toBe('joe!');
      expect(this.authenticationService.getAuthenticatedUser().authenticated).toBe(true);
    });

    it('requests authentication from gate, then opens modal and redirects on 401', function() {
      if(!this.apiHost.authEnabled()) { pending(); } //prevents the test from running if authentication is not enabled
      var redirectUrl = 'abc';
      spyOn(this.redirectService, 'redirect').and.callFake(function(url) {
        redirectUrl = url;
      });
      this.$http.whenGET(this.apiHost.authEndpoint()).respond(401, null, {'X-AUTH-REDIRECT-URL': '/authUp'});
      this.$timeout.flush();
      this.$http.flush();

      var callback = encodeURIComponent(this.$location.absUrl());

      expect(this.$rootScope.authenticating).toBe(true);
      expect(this.authenticationService.getAuthenticatedUser().name).toBe('[anonymous]');
      expect(this.authenticationService.getAuthenticatedUser().authenticated).toBe(false);
      expect(redirectUrl).toBe(this.apiHost.baseUrl() + '/authUp?callback=' + callback);
    });
  });

});
