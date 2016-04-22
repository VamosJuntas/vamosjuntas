angular.module('vamosJuntas').controller('HomeController',
 ['$scope', 'placeFactory', 'addressFactory',  function($scope, placeFactory, addressFactory) {
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
