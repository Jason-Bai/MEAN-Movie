angular.module('home', ['resources.movies']).
  controller('HomeCtrl', ['$scope', 'homeSrv', 'Movies', function ($scope, homeSrv, Movies) {
    $scope.title = 'home controller ' + ' - ' + homeSrv.title;
  }
]);
