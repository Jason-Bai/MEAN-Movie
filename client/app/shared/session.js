angular.module('app').
  factory('session', ['$http', 'storage', 'config', function (storage, config) {
    var r = {};
    r.authed = function () {
      return !!storage.get('token');
    }
    r.fetchToken = function (params) {
      if (r.user && r.token) return r;
      $http.post(config.baseUrl + '/authenticate', params).success(function (data) {
        storage.set('token', data.token);
        storage.set('user', data.user);
      });
    }
    return r;
}]);
