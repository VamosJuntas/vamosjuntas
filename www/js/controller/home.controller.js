angular.module('vamosJuntas').controller('HomeController',
 ['$scope', 'placeFactory', 'addressFactory',  function($scope, placeFactory, addressFactory) {
  placeFactory.fetchPlaces().then(function(response) {
    $scope.places = response.data;
  });
  $scope.search = {};
  $scope.addresses;

  $scope.getTotalOfOccurrences = function(place) {
    var numberOfOccurrences = place.occurrences.reduce(function(total, occurrence) {
      return total + occurrence.numberOfOccurrences;
    }, 0);

    return numberOfOccurrences;
  };

  $scope.getSpecificPlace = function(place) {
    placeFactory.addPlace(place);
  };

  $scope.searchAddress = function() {
    addressFactory.getAutoCompleteFromAddress($scope.search.text).then(function(response) {
      $scope.addresses = response.data.predictions;
    });
  };

  $scope.confirmAddress = function (place) {
    $scope.search.text = place.description;
  }
}]);
