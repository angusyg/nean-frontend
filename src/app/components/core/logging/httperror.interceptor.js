/**
 * Frontend client application logging module:
 * Http interceptor to send to server logger, errors received from api server calls
 */
(function() {
  'use strict';

  angular
    .module('frontend.core.logging')
    .factory('httpErrorInterceptor', HttpErrorInterceptor);

  HttpErrorInterceptor.$inject = ['$q', '$log'];

  function HttpErrorInterceptor($q, $log) {
    return {
      responseError,
    };

    function responseError(err) {
      if (err.status >= 400 && err.status <= 600) {
        $log.error(`Received ${err.status} on request ${err.data.reqId}: ${JSON.stringify(err.config)}`);
      }
      return $q.reject(err);
    }
  }
}());
