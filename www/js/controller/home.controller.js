angular.module('vamosJuntas').controller('HomeController',
 ['$scope', 'placeFactory', function($scope, placeFactory) {
   $scope.places = [];
 	$scope.places =	placeFactory.fetchPlaces();

  $scope.getTotalOfOccurrences = function (place) {
    var numberOfOccurrences = 0;
    for(var i = 0; i < place.occurrences.length; i++) {
      numberOfOccurrences += place.occurrences[i].numberOfOccurrences;
    }
    return numberOfOccurrences;
  };

}]);
