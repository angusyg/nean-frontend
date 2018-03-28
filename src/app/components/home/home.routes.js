/**
 * Frontend client application Home module:
 * Routes
 */
(function() {
  'use strict';

  angular
    .module('frontend.home')
    .config(Routing);

  Routing.$inject = ['$stateProvider', 'USER_ROLES'];

  function Routing($stateProvider, USER_ROLES) {
    const homeState = {
      name: 'app',
      url: '/app',
      templateUrl: '/partials/home.html',
      controller: 'HomeController',
      controllerAs: 'home',
      data: {
        authorizedRoles: [
          USER_ROLES.ADMIN,
          USER_ROLES.USER,
        ]
      }
    };

    $stateProvider.state(homeState);
  }
}());
