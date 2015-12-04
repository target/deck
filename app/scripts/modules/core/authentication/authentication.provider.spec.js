'use strict';

describe('authenticationProvider: application startup', function() {

  beforeEach(
    window.module(
      require('./authentication.module.js')
    )
  );

  afterEach(function() {
    this.apiHostConfig.disableAuth();
  });

  beforeEach(window.inject(function(authenticationService, $timeout, $httpBackend, settings, apiHostConfig, redirectService, $window, $location, $rootScope) {
    this.authenticationService = authenticationService;
    this.$timeout = $timeout;
    this.$http = $httpBackend;
    this.settings = settings;
    this.redirectService = redirectService;
    this.$window = $window;
    this.$location = $location;
    this.$rootScope = $rootScope;
    this.apiHostConfig = apiHostConfig;
  }));

  describe('authenticateUser', function() {
    it('requests authentication from gate, then sets authentication name field', function() {
      if(!this.apiHostConfig.authEnabled()) { pending(); } //prevents the test from running if authentication is not enabled
      this.$http.whenGET(this.apiHostConfig.authEndpoint()).respond(200, {email: 'joe!'});
      this.$timeout.flush();
      this.$http.flush();

      expect(this.$rootScope.authenticating).toBe(false);
      expect(this.authenticationService.getAuthenticatedUser().name).toBe('joe!');
      expect(this.authenticationService.getAuthenticatedUser().authenticated).toBe(true);
    });

    it('requests authentication from gate, then opens modal and redirects on 401', function() {
      if(!this.apiHostConfig.authEnabled()) { pending(); } //prevents the test from running if authentication is not enabled
      var redirectUrl = 'abc';
      spyOn(this.redirectService, 'redirect').and.callFake(function(url) {
        redirectUrl = url;
      });
      this.$http.whenGET(this.apiHostConfig.authEndpoint()).respond(401, null, {'X-AUTH-REDIRECT-URL': '/authUp'});
      this.$timeout.flush();
      this.$http.flush();

      var callback = encodeURIComponent(this.$location.absUrl());

      expect(this.$rootScope.authenticating).toBe(true);
      expect(this.authenticationService.getAuthenticatedUser().name).toBe('[anonymous]');
      expect(this.authenticationService.getAuthenticatedUser().authenticated).toBe(false);
      expect(redirectUrl).toBe(this.apiHostConfig.baseUrl() + '/authUp?callback=' + callback);
    });
  });

});