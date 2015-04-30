angular.module('resources.movies', ['resource']).
  factory('Movies', ['Resource', function (Resource) {

  var Movies = new Resource('movies');

  Movies.getTopTen = function (successcb, errorcb) {
    return Movies.all(successcb, errorcb);
  };

  return Movies;

}]);
