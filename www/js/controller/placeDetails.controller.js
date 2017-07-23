angular.module('vamosJuntas')
    .controller('placeDetailsController', ['$scope', 'placeFactory', '$location', function($scope, placeFactory, $location) {
      $scope.placeDetails = placeFactory.getPlace();

      $scope.allOccurrences = $scope.placeDetails.occurrences.map(function(ocurrence) {
        return { risk: ocurrence.risk, reports: ocurrence.reports };
      });

      $scope.myGoBack = function() {
        $ionicHistory.goBack();
      };

      $scope.submit = function() {
        $location.path('/report');
      };

    }]);
