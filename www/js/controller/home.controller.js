angular.module('vamosJuntas').controller('HomeController',
 ['$scope', 'placeFactory', 'addressFactory',  function($scope, placeFactory, addressFactory) {
    placeFactory.fetchPlaces();
    $scope.places = placeFactory.places;
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
