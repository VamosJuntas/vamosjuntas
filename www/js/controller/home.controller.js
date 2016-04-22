angular.module('vamosJuntas').controller('HomeController',
 ['$scope', 'placeFactory', 'addressFactory',  function($scope, placeFactory, addressFactory) {
    placeFactory.fetchPlaces();
    $scope.places = placeFactory.places;
    $scope.search = {};
    $scope.addresses = [];

    $scope.searchAddress = function() {
        addressFactory.getAutocomleteFromAddress($scope.search.text).then(function(response) {
            if ($scope.addresses.length > 0) {
              $scope.addresses = [];
            }
            $scope.addresses = response.data.predictions;
        });
    };

    var getDetailsFromPlace = function(place_id) {
        addressFactory.getCoordFromAddress(place_id).then(function(response) {
            searchNearbyPlacesByCoord(response.data.result.geometry.location.lat, response.data.result.geometry.location.lng);
        });
    };

    var searchNearbyPlacesByCoord = function(lat, long) {
        if ($scope.addresses.length > 0) {
          $scope.addresses = [];
        }
        addressFactory.getNearbyAddresses(lat, long).then(function(response) {
          $scope.addresses.push(response.data.results);
        });
    };
}]);
