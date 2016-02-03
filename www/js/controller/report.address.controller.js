angular.module('vamosJuntas').controller('ReportAddressController', function ($scope, $location) {

	$scope.submit = function(isFormValid) {
		if(isFormValid) {
			$location.path('/confirmation');
		}
	};
});
