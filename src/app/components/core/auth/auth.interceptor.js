/**
 * Frontend client application auth module;
 * Interceptor to inject if needed JWTToken on secured calls
 */
(function() {
  'use strict';

  angular.module('frontend.core.auth')
    .factory('authInterceptor', AuthInterceptor);

  AuthInterceptor.$inject = ['$q', '$injector'];

  function AuthInterceptor($q, $injector) {
    let refreshRequestLoading = false;

    return {
      request: request,
      responseError: responseError,
    };

    function request(config) {
      let apiService = $injector.get('apiService');
      return apiService.isSecureEndpoint(config.url, config.method)
        .catch(err => $q.reject(err))
        .then((secure) => {
          if (secure) {
            let authService = $injector.get('authService');
            if (!authService.isLoggedIn()) {
              let $rootScope = $injector.get('$rootScope');
              $rootScope.$broadcast(AUTH_EVENTS.NOT_AUTHENTICATED, config);
              return $q.reject();
            } else {
              return apiService.getApiConfig()
                .catch(err => $q.reject(err))
                .then((apiConfig) => {
                  config.headers[apiConfig.accessTokenHeader] = `Bearer ${authService.getToken()}`;
                  config.headers[apiConfig.refreshTokenHeader] = authService.getRefreshToken();
                  return config;
                });
            }
          } else return config;
        });
    }

    function responseError(err) {
      let HTTP_STATUS_CODE = $injector.get('HTTP_STATUS_CODE');
      if (err.status === HTTP_STATUS_CODE.UNAUTHORIZED_ACCESS) {
        $injector.get('$state').go('app.login');
        return $q.reject(err);
      } else if (err.status === HTTP_STATUS_CODE.AUTHENTICATION_EXPIRED) {
        let authService = $injector.get('authService');
        if (!refreshRequestLoading) {
          refreshRequestLoading = true;
          return authService.refreshToken()
            .catch(err => $q.reject(err))
            .then((response) => {
              let apiService = $injector.get('apiService');
              return apiService.getApiConfig()
                .catch(err => $q.reject(err))
                .then((apiConfig) => {
                  err.config.headers[apiConfig.accessTokenHeader] = `Bearer ${authService.getToken()}`;
                  return $injector.get('$http')(err.config)
                    .catch(err => $q.reject(err))
                    .then(response => $q.resolve(response));
                });
            })
            .catch(err => $q.reject(err))
            .finally(() => refreshRequestLoading = false);
        }
      } else return $q.reject(err);
    }
  }
})();
