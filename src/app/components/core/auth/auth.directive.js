/**
 * Frontend client application auth module;
 * Directive to show login modal on authentication error event
 */
(function() {
  'use strict';

  angular
    .module('frontend.core.auth')
    .directive('authDialog', AuthDialog);

  AuthDialog.$inject = ['$state', '$uibModal', '$templateCache', 'AUTH_EVENTS'];

  function AuthDialog($state, $uibModal, $templateCache, AUTH_EVENTS) {
    return {
      restrict: 'E',
      link: link
    };

    function link(scope, el, attr, ctrl) {
      let loginInProgress = false;

      const show = (event, data) => {
        if (!loginInProgress) {
          loginInProgress = true;
          const loggedIn = $uibModal.open({
            animation: true,
            template: $templateCache.get('AUTH-DIRECTIVE'),
            controller: ModalController,
            controllerAs: 'auth',
            windowClass: 'frontend-app',
            size: 'dialog-centered modal-sm',
            backdrop: 'static',
          });

          loggedIn.result
            .then(() => $state.go(data.$to()))
            .finally(() => loginInProgress = false);
        }
      };
      scope.$on(AUTH_EVENTS.NOT_AUTHENTICATED, show);
    }

    ModalController.$inject = ['$uibModalInstance', 'authService', '$timeout', 'PARAMETERS'];

    function ModalController($uibModalInstance, authService, $timeout, PARAMETERS) {
      const vm = this;
      vm.user = {
        login: '',
        password: '',
      };
      vm.error = null;
      vm.login = login;

      function login() {
        authService.login(vm.user)
          .then(() => $uibModalInstance.close())
          .catch((err) => {
            if (err.status === 401) vm.error = err.data.code;
            else vm.error = 0;
            $timeout(() => vm.error = null, PARAMETERS.TOOLTIP_DURATION);
          });
      }
    };
  }
})();
