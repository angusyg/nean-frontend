/**
 * Frontend client application services:
 * Service to display Toast for notification
 */
(function() {
  'use strict';

  angular
    .module('frontend.core.services')
    .factory('toastService', ToastService);

  ToastService.$inject = [];

  function ToastService($mdToast) {
    return {
      error,
      success,
      info,
    };

    function error(message) {
      show('error', message);
    }

    function success(message) {
      show('success', message);
    }

    function info(message) {
      show('info', message);
    }

    function show(level, message) {
      //$mdToast.show($mdToast.simple()
      //  .textContent(message)
      //  .theme(`${level}-toast`));
    }
  }
})();
