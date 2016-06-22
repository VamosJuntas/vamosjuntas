angular.module('vamosJuntas').controller('HomeController',
 ['$scope', 'placeFactory', 'addressFactory', '$cordovaGeolocation', '$ionicLoading', function($scope, placeFactory, addressFactory, $cordovaGeolocation, $ionicLoading) {


  $scope.search = {};
  $scope.addresses;
  $scope.coordinates = {};
  $scope.errorMessage = false;

  $ionicLoading.show();

  var posOptions = {timeout: 10000, enableHighAccuracy: false};

  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      $scope.coordinates.latitude  = position.coords.latitude
      $scope.coordinates.longitude = position.coords.longitude

      console.log('Getting position.');
      console.log('latitude: ', $scope.coordinates.latitude);
      console.log('longitude: ', $scope.coordinates.longitude);

      placeFactory.fetchPlaces($scope.coordinates.latitude, $scope.coordinates.longitude).then(function(response) {
        console.log('Fetch Places');
        $scope.places = response.data;
      });

      addressFactory.getAddressByCoord($scope.coordinates.latitude, $scope.coordinates.longitude).then(function(response){
        console.log('addresses');
        $scope.search.text = response;
      });

      $ionicLoading.hide();
    }, function() {
      console.log('Error getting position.');
      $scope.errorMessage = true;
      $ionicLoading.hide();
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
