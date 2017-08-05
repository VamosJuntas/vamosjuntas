angular.module('vamosJuntas').controller('HomeController',
 ['$scope', 'placeFactory', 'addressFactory', 'occurrencesFactory', 'geolocationFactory', '$ionicLoading', function($scope, placeFactory, addressFactory, occurrencesFactory, geolocationFactory, $ionicLoading) {

  $scope.search = {};
  $scope.errorMessage = false;

  $ionicLoading.show();

  var coordinates = {};
  var posOptions = { timeout: 5000, enableHighAccuracy: false };

  geolocationFactory
    .getCurrentPosition(posOptions)
    .then(function (position) {

      placeFactory.fetchPlaces(position.coords.latitude, position.coords.longitude).then(function(response) {
        $scope.places = occurrencesFactory.build(response.data);
      });

      addressFactory.getAddressByCoord(position.coords.latitude, position.coords.longitude).then(function(response){
        $scope.search.text = response;
      });

      $ionicLoading.hide();
    }, function() {
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
 }]);
