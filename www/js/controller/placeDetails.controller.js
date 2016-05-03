angular.module('vamosJuntas').controller('placeDetailsController', ['$scope', 'placeFactory', '$location', function($scope, placeFactory, $location) {

  $scope.placeDetails = placeFactory.getPlace();

  $scope.getTotalOfOccurrences = function(place) {
    var numberOfOccurrences = place.reduce(function(total, occurrence) {
      return total + numberOfOccurrences;
    }, 0);

    return numberOfOccurrences;
  };

  $scope.submit = function() {
    $location.path('/report');
  };

}]);
