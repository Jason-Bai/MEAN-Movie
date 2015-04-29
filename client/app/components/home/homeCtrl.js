angular.module('home').
  controller('HomeCtrl', ['$scope', 'homeSrv', function ($scope, homeSrv) {
    $scope.title = 'home controller ' + ' - ' + homeSrv.title;
  }
]);
