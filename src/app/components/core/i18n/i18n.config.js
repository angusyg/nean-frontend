/**
 * Frontend client application internationalization module;
 * Translation provider configuration
 */
(function() {
  'use strict';

  angular
    .module('frontend.core.i18n')
    .config(Config);

  Config.$inject = ['$translateProvider', '$translatePartialLoaderProvider'];

  function Config($translateProvider, $translatePartialLoaderProvider) {
    $translatePartialLoaderProvider.addPart('core');
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: '/i18n/{part}/{lang}.json'
    });
    $translateProvider.preferredLanguage('fr');
    $translateProvider.forceAsyncReload(true);
  }
})();
