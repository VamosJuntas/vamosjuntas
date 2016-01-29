angular.module('vamosJuntas').controller('ReportAddressController', function ($scope, $location) {
	$scope.submit = function() {
		$location.path('/confirmation');
	};	
});
