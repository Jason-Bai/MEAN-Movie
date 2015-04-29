angular.module('app').
  factory('storage', ['$localStorage', function ($localStorage) {
    var factory = {
      set: function (key, value) {
        if (!key) return;
        $localStorage[key] = value || '';
        return $localStorage;
      },
      get: function (key) {
        if (!key) return;
        return $localStorage[key];
      }
    };
    return factory;
  }]);
