angular.module('me', []).
  controller('MeCtrl', ['$scope', 'meSrv', function ($scope, meSrv) {
    $scope.title = 'me controller' + ' - ' + meSrv.title;
  }]);
