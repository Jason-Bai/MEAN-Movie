angular.module('home', ['resources.movies']).
  controller('HomeCtrl', ['$scope', 'homeSrv', 'Movies', function ($scope, homeSrv, Movies) {
    $scope.title = 'home controller ' + ' - ' + homeSrv.title;
    Movies.getTopTen(function (res) {
      console.log(res);
    }, function (err) {
      console.log(err);
    });
  }
]);
