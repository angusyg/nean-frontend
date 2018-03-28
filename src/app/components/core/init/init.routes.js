/**
 * Frontend client application init module:
 * Routes
 */
(function() {
  'use strict';

  angular
    .module('frontend.core.init')
    .config(Routing)
    .config(Config);

  Routing.$inject = ['$stateProvider'];

  function Routing($stateProvider) {
    const initState = {
      name: 'init',
      url: '/',
      controller: 'InitController'
    };
    $stateProvider.state(initState);
  }

  // Configuration of providers
  Config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function Config($urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise('/');
  }
}());
