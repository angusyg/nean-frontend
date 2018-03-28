/**
 * Frontend client application Home module:
 * Config for translate provider
 */
(function() {
  'use strict';

  angular
    .module('frontend.home')
    .config(Config);

  Config.$inject = ['$translateProvider', '$translatePartialLoaderProvider', 'TRANSLATE'];

  function Config($translateProvider, $translatePartialLoaderProvider, TRANSLATE) {
    $translateProvider.translations('fr', TRANSLATE.FR);
    $translatePartialLoaderProvider.addPart('home');
  }
})();
