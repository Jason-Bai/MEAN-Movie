angular.module('resources.movies', ['resource']).
  factory('Movies', ['Resource', function (Resource) {

  var Movies = new Resource('movies');

  return Movies;

}]);
