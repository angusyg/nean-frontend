/**
 * Frontend client application auth module;
 * Templates for authentication
 */
(function() {
  'use strict';

  angular
    .module('frontend.core.auth')
    .run(['$templateCache', ($templateCache) => {
      $templateCache.put('AUTH-DIRECTIVE',
        `<div class="modal-header">
          <h4 class="modal-title mx-auto" id="modal-header">
            <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MDQgNTA0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MDQgNTA0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGNpcmNsZSBzdHlsZT0iZmlsbDojOTBERkFBOyIgY3g9IjI1MiIgY3k9IjI1MiIgcj0iMjUyIi8+CjxwYXRoIHN0eWxlPSJmaWxsOiMyQzk5ODQ7IiBkPSJNNDkuOSw0MDIuNUM5NS44LDQ2NC4xLDE2OS4zLDUwNCwyNTIsNTA0czE1Ni4yLTM5LjksMjAyLjEtMTAxLjVINDkuOXoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0U2RTlFRTsiIGQ9Ik0zMTEuNiwzOTUuMmM2LjMtMi44LDEwLjMtOSwxMC4zLTE1Ljh2LTU5LjZjMC01LjItMi42LTkuOC02LjYtMTMuMWMtMi41LTIuMS00LTQuOS00LTcuOSAgYzAtNS4zLDQuNS05LjcsMTAuNi0xMS4xdi00aDcuOHY0YzYuMSwxLjQsMTAuNiw1LjgsMTAuNiwxMS4xYzAsMy4xLTEuNSw1LjktNCw3LjljLTQsMy4zLTYuNiw4LTYuNiwxMy4xdjU5LjYgIGMwLDYuOSw0LjEsMTMuMSwxMC4zLDE1LjhsMTYuNCw3LjJoLTI2LjdoLTcuOGgtMjYuN0wzMTEuNiwzOTUuMnoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zNzUuMSwxNzMuM2M3LDE3LjIsMTEuMSwzNy4xLDExLjEsNTZjMCw0OC42LTI3LDcyLjUtNjAuNCw3Mi41cy02MC40LTIzLjktNjAuNC03Mi41ICBjMC0xOC45LDQuMS0zOC44LDExLjEtNTZMMzc1LjEsMTczLjNMMzc1LjEsMTczLjN6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiNGRjcwNTg7IiBkPSJNMzgwLjIsMjEzLjdjMC44LDUuOSwxLjIsMTEuNywxLjIsMTcuNWMwLDQxLjctMjEuMyw2Ny42LTU1LjUsNjcuNnMtNTUuNS0yNS45LTU1LjUtNjcuNiAgYzAtNS43LDAuNC0xMS42LDEuMi0xNy41TDM4MC4yLDIxMy43TDM4MC4yLDIxMy43eiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRjE1NDNGOyIgZD0iTTM0OS40LDI4MS41bDAuOS0wLjljMC43LTAuNywxLjYtMS42LDIuNy0yLjlzMi40LTIuOSwzLjgtNC44czIuOC00LjEsNC4xLTYuNiAgYzIuNy01LDUuMi0xMS4xLDYuOC0xNy45YzAuOC0zLjQsMS40LTYuOSwxLjktMTAuNWMwLjQtMy43LDAuNy03LjIsMC43LTExYzAuMS00LjQtMC4xLTguOC0wLjUtMTMuMWgtNS4zYzAuOCw0LjMsMS4zLDguNywxLjUsMTMuMiAgYzAuMiwzLjUsMC4yLDcuMywwLjEsMTAuN2MtMC4yLDMuNS0wLjUsNy0xLjEsMTAuM2MtMS4xLDYuNy0zLDEyLjgtNS4zLDE3LjhjLTEuMiwyLjUtMi40LDQuOC0zLjYsNi44cy0yLjQsMy42LTMuNCw0LjkgIGMtMSwxLjQtMS45LDIuNC0yLjUsM0MzNDkuOCwyODEsMzQ5LjUsMjgxLjMsMzQ5LjQsMjgxLjV6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiNFNkU5RUU7IiBkPSJNMzU5LjUsMTczLjNoLTkuMWMwLjQsMC44LDEsMS44LDEuNiwzYzEuNSwyLjgsMy40LDcsNS40LDEyYzIuOCw3LDUuNSwxNS45LDcuMSwyNS40aDUuMyAgYy0wLjktMTAuMS0zLjEtMTkuNi01LjQtMjcuMWMtMS43LTUuNC0zLjQtOS44LTQuNy0xMi45QzM1OS42LDE3My41LDM1OS42LDE3My40LDM1OS41LDE3My4zeiIvPgo8cG9seWdvbiBzdHlsZT0iZmlsbDojRkY3MDU4OyIgcG9pbnRzPSIxNjIuMyw5MC45IDE5NS40LDkwLjkgMjAxLjcsNjcuNiAxNTYsNjcuNiAiLz4KPHBhdGggc3R5bGU9ImZpbGw6IzMyNEE1RTsiIGQ9Ik0xNjAuNiwxMzguMVY5NS42SDE5N3Y0Mi41YzAsOS4zLDQuOCwxNy44LDEyLjgsMjIuNmMxNy4zLDEwLjUsMjguOSwyOS41LDI4LjksNTEuMnYxNzYuMiAgYzAsNy42LTYuMiwxMy44LTEzLjgsMTMuOGgtOTIuMmMtNy42LDAtMTMuOC02LjItMTMuOC0xMy44VjIxMS45YzAtMjEuNywxMS42LTQwLjcsMjguOS01MS4yQzE1NS44LDE1NS45LDE2MC42LDE0Ny4zLDE2MC42LDEzOC4xeiAgIi8+CjxwYXRoIHN0eWxlPSJmaWxsOiNDRUQ1RTA7IiBkPSJNMTU2LjgsOTkuMWg0NGMwLjUsMCwwLjgtMC40LDAuOC0wLjh2LTkuNGMwLTAuNS0wLjQtMC44LTAuOC0wLjhoLTQ0Yy0wLjUsMC0wLjgsMC40LTAuOCwwLjh2OS40ICBDMTU2LDk4LjcsMTU2LjMsOTkuMSwxNTYuOCw5OS4xeiIvPgo8cmVjdCB4PSIxMTkiIHk9IjIzMS40IiBzdHlsZT0iZmlsbDojRkZEMDVCOyIgd2lkdGg9Ijk3LjciIGhlaWdodD0iMTA5LjkiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" class="rounded mx-auto d-block" alt="avatar">Wine Cellar
          </h4>
        </div>
        <form name="authForm" ng-submit="auth.login()">
          <div class="modal-body" id="modal-body">
            <div class="form-group">
              <div class="input-group" tooltip-placement="right" uib-tooltip="{{'AUTH_BAD_LOGIN' | translate}}" tooltip-class="fe-error" tooltip-is-open="auth.error === 1" tooltip-trigger="'none'" ng-class="{'shake': auth.error === 1}">
                <div class="input-group-prepend">
                  <div class="input-group-text" id="icon-login"><i class="material-icons">person</i></div>
                </div>
                <input name="login" type="text" class="form-control form-control-sm" id="login" placeholder="Login" required ng-model="auth.user.login">
              </div>
            </div>
            <div class="form-group">
              <div class="input-group" tooltip-placement="right" uib-tooltip="{{'AUTH_BAD_PASSWORD' | translate}}" tooltip-class="fe-error" tooltip-is-open="auth.error === 2" tooltip-trigger="'none'" ng-class="{'shake': auth.error === 2}">
                <div class="input-group-prepend">
                  <div class="input-group-text" id="icon-password"><i class="material-icons">lock</i></div>
                </div>
                <input name="password" type="password" class="form-control form-control-sm" id="password" placeholder="Mot de passe" required ng-model="auth.user.password">
              </div>
            </div>
          </div>
          <div class="modal-footer" tooltip-placement="bottom" uib-tooltip="{{'AUTH_ERROR' | translate}}" tooltip-class="fe-error" tooltip-is-open="auth.error === 0" tooltip-trigger="'none'">
            <button class="btn btn-primary" type="submit" ng-disabled="authForm.$invalid">Connexion</button>
          </div>
        </form>`
      );
    }]);
})();
