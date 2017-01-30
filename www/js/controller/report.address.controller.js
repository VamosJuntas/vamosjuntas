angular.module('vamosJuntas')
    .controller('ReportAddressController', ['$scope', '$stateParams', '$location', '$ionicHistory', 'reportFactory',
        function($scope, $stateParams, $location, $ionicHistory, reportFactory) {

            $scope.report = {};
            $scope.report.address = $stateParams.address;
            $scope.report.latitude = $stateParams.latitude;
            $scope.report.longitude = $stateParams.longitude;

            $scope.myGoBack = function() {
                $ionicHistory.goBack();
            };

            var reportANewRisk = function() {
                reportFactory.createReport($scope.report).success(function(data, status, headers, config) {
                        $location.path('/confirmation');
                    })
                    .error(function(data, status, header, config) {
                        $scope.hasError = true;
                    });
            };

            $scope.submit = function(isFormValid) {
                if (isFormValid) {
                    reportANewRisk();
                }
            };
        }
    ]);
