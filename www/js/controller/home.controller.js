angular.module('vamosJuntas').controller('HomeController', ['$scope', 'placeFactory', function($scope, placeFactory) {
  $scope.places = placeFactory.fetchPlaces().then(function(response) {
    $scope.places = response.data;
  });

  $scope.getSpecificPlace = function(place) {
    placeFactory.addPlace(place);
  };

  $scope.getTotalOfOccurrences = function(place) {
   var numberOfOccurrences =   place.occurrences.reduce(function(total, occurrence) {
      return total + occurrence.count;
    }, 0);

    return numberOfOccurrences;
  };

}]);
