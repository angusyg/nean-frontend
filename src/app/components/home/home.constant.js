/**
 * Frontend client application Home module:
 * Constants (translate)
 */
(function() {
  'use strict';

  angular
    .module('frontend.home')
    .constant('TRANSLATE', {
      FR: {
        HELLO_WORLD: "Hello world from module constants",
      }
    });
})();
