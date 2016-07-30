angular.module('vamosJuntas').controller('ReportAddressController', ['$scope', 'placeFactory', '$stateParams','$location','$ionicHistory', function($scope, placeFactory, $stateParams, $location, $ionicHistory) {

  $scope.placeDetails = placeFactory.getPlace();
  $scope.report = {};
  $scope.report.address = $stateParams.address;

  $scope.myGoBack = function() {
    $ionicHistory.goBack();
  };

  var addPlaceFromForm = function(report) {
    return {
      "address": report.address,
      "risk": report.risk,
      "reports": [{
        "date": report.date,
        "period": report.period
      }],
      "count": 1
    };
  };

  var reportANewRisk = function() {
    var found = false;
    if($scope.placeDetails.address === undefined){
      $scope.placeDetails = addPlaceFromForm($scope.report);
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
      if(!found){
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
