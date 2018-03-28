/**
 * Frontend client application auth module:
 * Config to add auth interceptor
 */
(function() {
  'use strict';

  angular
    .module('frontend.core.auth')
    .config(Config);

  Config.$inject = ['$httpProvider', '$translateProvider', 'SECURITY', 'TRANSLATE'];

  function Config($httpProvider, $translateProvider, SECURITY, TRANSLATE) {
    if (SECURITY.ACTIVATED) $httpProvider.interceptors.push('authInterceptor');
    $translateProvider.translations('fr', TRANSLATE.FR);
    $translateProvider.translations('en', TRANSLATE.EN);
  }
})();
