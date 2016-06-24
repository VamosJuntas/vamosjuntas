angular.module('vamosJuntas').controller('HomeController',
 ['$scope', 'placeFactory', 'addressFactory', '$cordovaGeolocation', '$ionicLoading', function($scope, placeFactory, addressFactory, $cordovaGeolocation, $ionicLoading) {


  $scope.search = {};
  $scope.addresses;
  $scope.errorMessage = false;

  $ionicLoading.show();

  var coordinates = {};
  var posOptions = {timeout: 5000, enableHighAccuracy: false};

  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {

      placeFactory.fetchPlaces(position.coords.latitude, position.coords.longitude).then(function(response) {
        $scope.places = response.data;
      });

      addressFactory.getAddressByCoord(position.coords.latitude, position.coords.longitude).then(function(response){
        $scope.search.text = response;
      });

      $ionicLoading.hide();
    }, function() {
      $scope.errorMessage = true;
      $ionicLoading.hide();
    });

  $scope.getSpecificPlace = function(place) {
    placeFactory.addPlace(place);
  };

  $scope.getTotalOfOccurrences = function(place) {
   var numberOfOccurrences = place.occurrences.reduce(function(total, occurrence) {
      return total + occurrence.count;
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
  };
  
}]);
