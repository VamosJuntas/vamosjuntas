angular.module('vamosJuntas').controller('placeDetailsController', ['$scope', 'placeFactory', '$location', function($scope, placeFactory, $location) {
  $scope.placeDetails = placeFactory.getPlace();

  $scope.myGoBack = function() {
    $ionicHistory.goBack();
  };
  
  $scope.submit = function() {
    $location.path('/report');
  };

}]);
