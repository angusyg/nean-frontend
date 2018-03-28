/**
 * Frontend client application services:
 * Service to create Frontend custom errors
 */
(function() {
  'use strict';

  angular
    .module('frontend.core.services')
    .factory('Exception', ExceptionService);

  ExceptionService.$inject = ['$log'];

  function ExceptionService($log) {
    const ConfigException = class ConfigException extends Error {
      constructor(message) {
        super(message);
        this.name = 'ConfigException';
        $log.error(JSON.stringify(this, Object.getOwnPropertyNames(this)));
      }
    };

    const FrontEndException = class FrontEndException extends Error {
      constructor(message) {
        super(message);
        this.name = 'FrontEndException';
        $log.error(JSON.stringify(this, Object.getOwnPropertyNames(this)));
      }
    };

    const IllegalArgumentException = class IllegalArgumentException extends Error {
      constructor(message) {
        super(message);
        this.name = 'IllegalArgumentException';
        $log.error(JSON.stringify(this, Object.getOwnPropertyNames(this)));
      }
    };

    const SecurityException = class SecurityException extends Error {
      constructor(message) {
        super(message);
        this.name = 'SecurityException';
        $log.error(JSON.stringify(this, Object.getOwnPropertyNames(this)));
      }
    };

    return {
      ConfigException,
      FrontEndException,
      IllegalArgumentException,
      SecurityException,
    };
  }
})();
