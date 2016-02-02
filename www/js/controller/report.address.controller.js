angular.module('vamosJuntas').controller('ReportAddressController', function ($scope, $location) {
	
	$scope.submit = function(reportForm) {
		if(reportForm.$valid) {
			$location.path('/confirmation');
		}
	};
});
