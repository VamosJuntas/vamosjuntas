angular.module('vamosJuntas').controller('placeDetailsController', ['$scope', 'placeDetailsFactory', '$location', function($scope, placeDetailsFactory, $location) {
  placeDetailsFactory.fetchPlace();
  $scope.placeDetails = placeDetailsFactory.place.report;

  $scope.submit = function() {
    $location.path('/report');
  };
}]);
