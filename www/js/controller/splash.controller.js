angular.module('vamosJuntas').controller('SplashController',['$scope','$state','$location',function($scope, $state, $location) { 
	$scope.submit = function() {
		$location.path('/placeDetails');
	};
}]);
