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
        if ($scope.addresses.length > 0) {
            $scope.addresses = [];
        }
        addressFactory.getAutocomleteFromAddress($scope.search.text).then(function(response) {
            $scope.addresses = response.data.predictions;
        });
    };
}]);
