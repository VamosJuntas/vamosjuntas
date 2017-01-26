angular.module('vamosJuntas').controller('ReportAddressController', ['$scope','$http', '$stateParams','$location','$ionicHistory','ApiEndpoint', function($scope, $http, $stateParams, $location, $ionicHistory, ApiEndpoint) {

  $scope.report = {};
  $scope.report.address = $stateParams.address;
  $scope.report.latitude = $stateParams.latitude;
  $scope.report.longitude = $stateParams.longitude;

  $scope.myGoBack = function() {
    $ionicHistory.goBack();
  };

  var addPlaceFromForm = function(report) {
    return {
      "address": report.address,
      "geolocation": {
        "latitude": report.latitude,
        "longitude": report.longitude
      },
      "category": report.risk,
      "date": report.date
    };
  };

  var reportANewRisk = function() {
    $http.post(ApiEndpoint.url, addPlaceFromForm($scope.report), {})
    .success(function (data, status, headers, config) {
      $location.path('/confirmation');
    })
    .error(function (data, status, header, config) {
      console.log('error');
      $scope.hasError = true;
    });
  };

  $scope.submit = function(isFormValid) {
    if (isFormValid) {
      reportANewRisk();
    }
  };
}]);
