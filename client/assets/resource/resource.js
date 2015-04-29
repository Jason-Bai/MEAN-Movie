angular.module('resource', [])
.factory('Resource', ['$http', '$q', 'configs', function ($http, $q, configs) {

  function ResourceFactory(collectionName) {
    var url = configs.baseUrl + '/' + collectionName;
    var defaultParams = {};

    var thenFactoryMethod = function (httpPromise, successcb, errorcb, isArray) {

      var scb = successcb || angular.noop;
      var ecb = errorcb || angular.noop;

      return httpPromise.then(function (res) {

        var result;

        if (isArray) {
          result = [];
          for (var i = 0; i < res.data.length; i++) {
            result.push(new Resource(res.data[i]));
          }
        } else {
          if (res.data.length == 0) {
            return $q.reject({
              code: 'resource no data',
              collection: collectionName
            });
          } else {
            result = new Resource(res.data);
          }
        }

        scb(result, res.status, res.headers, res.config);
      }, function (res) {
        ecb(undefined, res.status, res.headers, res.config);
      });
    };


    var Resource = function (data) {
      angular.extend(this, data);
    };

    Resource.all = function (cb, errorcb) {
      return Resource.query({}, cb, errorcb);
    };

    Resource.query = function (queryJson, successcb, errorcb) {
      var params = angular.isObject(queryJson) ? {q: JSON.stringify(queryJson)} : {};
      var httpPromise = $http.get(url, {params: angular.extend({}, defaultParams, params)});
      return thenFactoryMethod(httpPromise, successcb, errorcb, true);

    }

    Resource.getById = function (id, successcb, errorcb) {
      var httpPromise = $http.get(url + '/' + id, {params: defaultParams});
      return thenFactoryMethod(httpPromise, successcb, errorcb);
    };

    Resource.getByIds = function (ids, successcb, errorcb) {
      var qin = [];
      angular.forEach(ids, function (id) {
        qin.push({$oid: id});
      });
      return Resource.query({_id: {$in: qin}}, successcb, errorcb);
    };

    // instance methods
    Resource.fn = Resource.prototype;

    Resource.fn.$id = function () {
      if (this._id && this._id.$oid) {
        return this._id.$oid;
      }
    };

    Resource.fn.$save = function (successcb, errorcb) {
      var httpPromise = $http.post(url, this, {parasm: defaultParams})
      return thenFactoryMethod(httpPromise, successcb, errorcb);
    };

    Resource.fn.$update = function (successcb, errorcb) {
      var httpPromise = $http.put(url + '/' + this.$id(), angular.extends({}, this, {_id: undefined}), {params: defaultParams});
      return thenFactoryMethod(httpPromise, successcb, errorcb);
    };

    Resource.fn.$remove = function (successcb, errorcb) {
      var httpPromise = $http['delete'](url + '/' + this.$id(), {params: defaultParams});
      return thenFactoryMethod(httpPromise, successcb, errorcb);
    };

    Resource.fn.$saveOrUpdate = function (savecb, updatecb, errorSavecb, errorUpdatecb) {
     if (this.$id()) {
      return this.$update(updatecb, errorUpdatecb);
     } else {
      return this.$save(savecb, errorSavecb);
     }
    }

    return Resource;
  }

  return ResourceFactory;

}]);
