angular.module('vamosJuntas').controller('ReportAddressController', ['$scope', 'placeFactory', '$location', function($scope, placeFactory, $location) {

  $scope.placeDetails = placeFactory.getPlace();
  $scope.report = {};

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
  };

  $scope.submit = function(isFormValid) {
    if (isFormValid) {
      reportANewRisk();
      $scope.report = {};
      $location.path('/confirmation');
    }
  };
}]);
