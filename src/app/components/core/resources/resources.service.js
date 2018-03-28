(function() {
  'use strict';

  angular
    .module('frontend.core.resources')
    .factory('resourcesService', ResourcesService);

  ResourcesService.$inject = ['apiService', '$q', 'helper', 'Exception'];

  function ResourcesService(apiService, $q, helper, Exception) {
    const ADD_OPERATION = 'add';
    const GET_OPERATION = 'get';
    const LIST_OPERATION = 'list';
    const REMOVE_OPERATION = 'remove';
    const UPDATE_OPERATION = 'update';

    return {
      add: add,
      get: get,
      list: list,
      remove: remove,
      update: update,
    };

    function add(item, resource) {
      let defer = $q.defer();
      if (helper.isBlank(resource)) defer.reject(new Exception.IllegalArgumentException(`Resource is blank`));
      else if (helper.isBlank(item)) defer.reject(new Exception.IllegalArgumentException(`Parameter is blank`));
      else if (!(item instanceof Object)) defer.reject(new Exception.IllegalArgumentException(`Parameter is not an Object`));
      else {
        let cfg = apiService.getApiCallConfig();
        cfg.addData(item);
        apiService.callResource(resource, ADD_OPERATION, cfg)
          .then((response) => defer.resolve(response))
          .catch((err) => defer.reject(err));
      }
      return defer.promise;
    }

    function get(id, resource) {
      let defer = $q.defer();
      if (helper.isBlank(resource)) defer.reject(new Exception.IllegalArgumentException(`Resource is blank`));
      else if (helper.isBlank(id)) defer.reject(new Exception.IllegalArgumentException(`Parameter is blank`));
      else if (!(country instanceof String)) defer.reject(new Exception.IllegalArgumentException(`Parameter is not a String`));
      else {
        let cfg = apiService.getApiCallConfig();
        cfg.addParameter('id', id);
        apiService.callResource(resource, GET_OPERATION, cfg)
          .then((response) => defer.resolve(response))
          .catch((err) => defer.reject(err));
      }
      return defer.promise;
    }

    function list(resource) {
      let defer = $q.defer();
      if (helper.isBlank(resource)) defer.reject(new Exception.IllegalArgumentException(`Resource is blank`));
      else {
        apiService.callResource(resource, LIST_OPERATION)
          .then((response) => defer.resolve(response))
          .catch((err) => defer.reject(err));
      }
      return defer.promise;
    }

    function remove(item, resource) {
      let defer = $q.defer();
      let id = item;
      if (helper.isBlank(resource)) defer.reject(new Exception.IllegalArgumentException(`Resource is blank`));
      else if (helper.isBlank(item)) defer.reject(new Exception.IllegalArgumentException(`Parameter is blank`));
      else if (item instanceof Object) {
        if (helper.isBlank(item._id)) defer.reject(new Exception.IllegalArgumentException(`Parameter has no id property`));
        else id = item._id;
      } else if (!(item instanceof String)) defer.reject(new Exception.IllegalArgumentException(`Parameter is not a String`));
      else {
        let cfg = apiService.getApiCallConfig();
        cfg.addParameter('id', id);
        apiService.callResource(resource, REMOVE_OPERATION, cfg)
          .then((response) => defer.resolve(response))
          .catch((err) => defer.reject(err));
      }
      return defer.promise;
    }

    function update(item, resource) {
      let defer = $q.defer();
      if (helper.isBlank(resource)) defer.reject(new Exception.IllegalArgumentException(`Resource is blank`));
      else if (helper.isBlank(item)) defer.reject(new Exception.IllegalArgumentException(`Parameter is blank`));
      else if (!(item instanceof Object)) defer.reject(new Exception.IllegalArgumentException(`Parameter is not an Object`));
      else {
        let cfg = apiService.getApiCallConfig();
        cfg.addParameter('id', id);
        cfg.addData(item);
        apiService.callResource(resource, UPDATE_OPERATION, cfg)
          .then((response) => defer.resolve(response))
          .catch((err) => defer.reject(err));
      }
      return defer.promise;
    }
  }
})();
