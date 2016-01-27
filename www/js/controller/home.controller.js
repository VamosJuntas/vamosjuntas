angular.module('vamosJuntas').controller('HomeController',
	['$scope', 'placeFactory', function ($scope, placeFactory) {
		placeFactory.fetchPlaces();
		$scope.places = placeFactory.places.reports;
}]);
