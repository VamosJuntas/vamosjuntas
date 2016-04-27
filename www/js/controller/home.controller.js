angular.module('vamosJuntas').controller('HomeController',
 ['$scope', 'placeFactory', 'addressFactory',  function($scope, placeFactory, addressFactory) {
    placeFactory.fetchPlaces();
    $scope.places = placeFactory.places;
    $scope.searchText = '';
    $scope.addresses;

    $scope.searchAddress = function() {
      addressFactory.getAutoCompleteFromAddress(this.searchText).then(function(response) {
        $scope.addresses = response.data.predictions;
      });
    };


}]);
