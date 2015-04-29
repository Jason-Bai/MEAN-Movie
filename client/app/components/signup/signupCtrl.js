angular.module('signup').
  controller('SignupCtrl', ['$scope', 'signupSrv', function ($scope, signupSrv) {
    $scope.title = 'signup controller' + ' - ' + signupSrv.title;
  }]);
