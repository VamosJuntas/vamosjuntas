angular.module('vamosJuntas').controller('ReportAddressController', function ($scope, $stateParams, $location) {
  $scope.report = {};
  $scope.report.address = $stateParams.address;
  $scope.submit = function(isFormValid) {
    if(isFormValid) {
      $location.path('/confirmation');
    }
  };
});
