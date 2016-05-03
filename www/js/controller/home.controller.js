angular.module('vamosJuntas').controller('HomeController', ['$scope', 'placeFactory', function($scope, placeFactory) {
  $scope.places = placeFactory.fetchPlaces().then(function(response) {
    $scope.places = response.data;
  });

  $scope.getSpecificPlace = function(place) {
    placeFactory.addPlace(place);
  };

}]);
