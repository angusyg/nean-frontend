/**
 * Frontend client application constants module:
 * Constants definition
 */
(function() {
  'use strict';

  angular
    .module('frontend.core.constants')
    .constant('API', {
      URL: '',
      BASE: '/api',
    })
    .constant('APP', {
      HOME_STATE_NAME: 'app',
    })
    .constant('AUTH_EVENTS', {
      LOGIN_SUCCESS: 'auth-login-success',
      LOGIN_FAILED: 'auth-login-failed',
      LOGOUT_SUCCESS: 'auth-logout-success',
      TOKEN_EXPIRED: 'auth-token-expired',
      NOT_AUTHENTICATED: 'auth-not-authenticated',
      NOT_AUTHORIZED: 'auth-not-authorized',
    })
    .constant('HTTP_STATUS_CODE', {
      OK: 200,
      ACCEPTED: 202,
      NO_CONTENT: 204,
      UNAUTHORIZED_ACCESS: 401,
      UNAUTHORIZED_OPERATION: 403,
      AUTHENTICATION_EXPIRED: 419,
      SERVER_ERROR: 500,
    })
    .constant('SECURITY', {
      ACTIVATED: false,
      ACCESS_TOKEN: 'JWTToken',
      REFRESH_TOKEN: 'RefreshToken',
    })
    .constant('USER_ROLES', {
      ADMIN: 'ADMIN',
      USER: 'USER',
    })
    .constant('TRANSLATE', {
      FR: {
        AUTH_BAD_LOGIN: "Login inconnu",
        AUTH_BAD_PASSWORD: "Mot de passe incorrect",
        AUTH_ERROR: "Erreur lors de la connexion",
      },
      EN: {
        AUTH_BAD_LOGIN: "Bad login",
        AUTH_BAD_PASSWORD: "Bad password",
        AUTH_ERROR: "An error occured while connection",
      }
    })
    .constant('PARAMETERS', {
      TOOLTIP_DURATION: 3000,
      SERVER_LOGGING_ACTIVATED: false,
    })
    .constant('ENDPOINTS', {
      DISCOVER: 'discover',
      LOGIN: 'login',
      LOGOUT: 'logout',
      REFRESH: 'refreshToken',
    });
})();
