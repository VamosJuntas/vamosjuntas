angular.module('vamosJuntas')
  .controller('SplashController',['$scope', '$state', '$location', '$ionicPopup', function($scope, $state, $location, $ionicPopup) {
    $scope.submit = function() {
        $location.path('/home');
    };
    $scope.showAlert = function() {
      var alertPopup = $ionicPopup.alert({
        templateUrl: 'templates/terms-of-use.html',
        title: 'Termos de uso'
      });

      alertPopup.then(function(res) {
        console.log('Thank you for not eating my delicious ice cream cone');
      });
    };
}]);
