angular.module('app', [
  'ngStorage',
  'ngRoute',
  // 加载需要的模块
  'home',
  'signin',
  'signup',
  'me'
])
.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
  // 后端设置的static属性为client，所有开头需要加上app
  var basePath = 'app/components/';
  // routes
  $routeProvider.
    when('/', {
      templateUrl: basePath + 'home/homeView.html',
      controller: 'HomeCtrl'
    }).
    when('/signin', {
      templateUrl: basePath + 'signin/signinView.html',
      controller: 'SigninCtrl'
    }).
    when('/signup', {
      templateUrl: basePath + 'signup/signupView.html',
      controller: 'SignupCtrl'
    }).
    when('/me', {
      templateUrl: basePath + 'me/meView.html',
      controller: 'MeCtrl'
    }).
    otherwise({
      redirect: '/'
    });

  // interceptors
  $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $localtion, $localStorage) {
    return {
      'request': function (config) {
        config.headers = config.headers || {};
        if ($localStorage.token) {
          config.headers.Authorization = 'Bearer ' + $localStorage.token;
        }
        return config;
      },
      'responseError': function (response) {
        if (response.status === 401 || response.status === 403) {
          $location.path('/signin');
        }
        return $q.reject(response);
      }
    };
  }]);
}]);
