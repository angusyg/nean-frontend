/**
 * Frontend client application services:
 * Helper service with multiples useful functions
 */
(function() {
  'use strict';

  angular
    .module('frontend.core.services')
    .factory('helper', HelperService);

  HelperService.$inject = ['base64'];

  function HelperService(base64) {
    return {
      getUserIdFromToken: getUserIdFromToken,
      getUserInfosFromToken: getUserInfosFromToken,
      getUserLoginFromToken: getUserLoginFromToken,
      getUserRolesFromToken: getUserRolesFromToken,
      isBlank: isBlank,
      isNotBlank: isNotBlank,
    };

    function getUserIdFromToken(token) {
      return getUserInfosFromToken(token).id;
    }

    function getUserInfosFromToken(token) {
      let encoded = token.split('.')[1];
      return JSON.parse(base64.urlDecodeBase64(encoded));
    }

    function getUserLoginFromToken(token) {
      return getUserInfosFromToken(token).login;
    }

    function getUserRolesFromToken(token) {
      return getUserInfosFromToken(token).roles;
    }

    function isBlank(obj) {
      return typeof obj === 'undefined' ||
        obj === null ||
        obj === {} ||
        ((typeof obj === 'string' || obj instanceof String) && obj.length === 0) ||
        (Number.isFinite(obj) && obj === 0) ||
        ((typeof obj === 'boolean' || obj instanceof Boolean) && obj === false) ||
        (Array.isArray(obj) && obj.length === 0) ||
        (obj instanceof Error && typeof obj.message !== 'undefined')
    }

    function isNotBlank(obj) {
      return !isBlank(obj);
    }
  }
})();
