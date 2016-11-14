angular.module('vamosJuntas').controller('ReportAddressController', ['$scope','$http', 'placeFactory', '$stateParams','$location','$ionicHistory','ApiEndpoint', function($scope, $http, placeFactory, $stateParams, $location, $ionicHistory, ApiEndpoint) {

  $scope.placeDetails = placeFactory.getPlace();
  $scope.report = {};
  $scope.search = {};
  $scope.search.text = $stateParams.address;
  $scope.search.latitude = $stateParams.latitude;
  $scope.search.longitude = $stateParams.longitude;

  $scope.myGoBack = function() {
    $ionicHistory.goBack();
  };

  var addPlaceFromForm = function(report, search) {
    return {
      "address": search.text,
      "geolocation": {
        "latitude": search.latitude,
        "longitude": search.longitude
      },
      "category": report.risk,
      "date": report.date
    };
  };

  var reportANewRisk = function() {
    var found = false;
    if($scope.placeDetails.address === undefined){
      $scope.placeDetails = addPlaceFromForm($scope.report, $scope.search);
      $http.post(ApiEndpoint.url, $scope.placeDetails, {})
      .success(function (data, status, headers, config) {
        console.log('funcionou');
      })
      .error(function (data, status, header, config) {
        console.log('não funcionou');
      });
    }else{
      for(var i = 0; i < $scope.placeDetails.occurrences.length; i++ ){
        if ($scope.placeDetails.occurrences[i].risk === $scope.report.risk) {
          $scope.placeDetails.occurrences[i].reports.push({
            "date": $scope.report.date,
            "period": $scope.report.period
          });
          $scope.placeDetails.occurrences[i].count += 1;
          found = true;
          break;
        }
      }
      if (!found) {
        $scope.placeDetails.occurrences.push(addPlaceFromForm($scope.report));
      }
    }
  };

  $scope.submit = function(isFormValid) {
    if (isFormValid) {
      reportANewRisk();
      $scope.hasError = false;
      $location.path('/confirmation');
    }
  };
}]);
