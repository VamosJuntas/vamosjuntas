angular.module('vamosJuntas').controller('HomeController',
 ['$scope', 'placeFactory', 'addressFactory', '$cordovaGeolocation', function($scope, placeFactory, addressFactory, $cordovaGeolocation) {

  placeFactory.fetchPlaces().then(function(response) {
    $scope.places = response.data;
  });

  $scope.search = {};
  $scope.addresses;

  var posOptions = {timeout: 10000, enableHighAccuracy: false};

  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      $scope.latitude  = position.coords.latitude
      $scope.longitude = position.coords.longitude
    }, function(err) {

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

  $scope.searchAddress = function() {
    addressFactory.getAutoCompleteFromAddress($scope.search.text).then(function(response) {
      $scope.addresses = response.data.predictions;
    }, function(error) {
      $scope.addresses = [];
    });
  };

  $scope.confirmAddress = function (place) {
    $scope.search.text = place.description;
  }
}]);
