angular.module('vamosJuntas').controller('HomeController', ['$scope', 'placeFactory', function($scope, placeFactory) {
  $scope.places = placeFactory.fetchPlaces().then(function(response) {
    $scope.places = response.data;
  });

  $scope.getTotalOfOccurrences = function(place) {
    var numberOfOccurrences = place.occurrences.map(function(occurrence) {
      return occurrence.numberOfOccurrences;
    }).reduce(function(a, b) {
      return a + b;
    }, 0);

    return numberOfOccurrences;
  };

  $scope.getSpecificPlace = function(place) {
    placeFactory.addPlace(place);
  };

}]);
