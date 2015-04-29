angular.module('signin').
  controller('SigninCtrl', ['$scope', 'signinSrv', function ($scope, signinSrv) {
    $scope.title = 'signin controller' + ' - ' + signinSrv.title;
  }]);
