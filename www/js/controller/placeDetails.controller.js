angular.module('vamosJuntas').controller('placeDetailsController',['$scope','placeDetailsFactory', function ($scope, placeDetailsFactory){
  placeDetailsFactory.fetchPlace();
  $scope.placeDetails = placeDetailsFactory.place.report;
}]);
