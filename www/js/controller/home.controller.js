angular.module('vamosJuntas').controller('HomeController', ['$scope', 'placeFactory', function($scope, placeFactory) {
  $scope.places = placeFactory.fetchPlaces().then(function(response) {
    $scope.places = response.data;
  });

  $scope.getTotalOfOccurrences = function(place) {
    var numberOfOccurrences = place.occurrences.reduce(function(total, occurrence) {
      return total + occurrence.numberOfOccurrences;
    }, 0);

    return numberOfOccurrences;
  };

  $scope.getSpecificPlace = function(place) {
    placeFactory.addPlace(place);
  };

}]);
