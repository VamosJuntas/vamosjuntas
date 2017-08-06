angular.module('vamosJuntas')
  .controller('placeDetailsController', placeDetailsController);

placeDetailsController.$inject = ['$scope', 'placeFactory', '$location'];

function placeDetailsController($scope, placeFactory, $location) {
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

  $scope.mostFrequentOccurence = mostFrequentOccurence($scope.placeDetails.occurrences);
  $scope.numberOfOtherOccurrences = numberOfOtherOccurrences($scope.placeDetails.occurrences);

  function mostFrequentOccurence(allOccurrences) {
    var _allOccurrences = allOccurrences.slice();
    return _allOccurrences.sort(byNumberOfOcurrences).shift();
  }

  function numberOfOtherOccurrences(allOccurrences) {
    var INITIAL_VALUE = 0;
    var _allOccurrences = allOccurrences.slice();
    var _otherOccurrences = _allOccurrences.sort(byNumberOfOcurrences).slice(1);

    var sumNumberOfOccurrences = function(previousOccurrence, currentOccurrence) {
      return previousOccurrence + Number(currentOccurrence.numberOfOccurrences);
    };

    return _otherOccurrences.reduce(sumNumberOfOccurrences, INITIAL_VALUE);
  }

  function byNumberOfOcurrences(firstOccurrence, secondOccurrence) {
    return Number(secondOccurrence.numberOfOccurrences) - Number(firstOccurrence.numberOfOccurrences);
  }
}
