angular.module('vamosJuntas')
    .controller('ReportAddressController', ['$scope', '$stateParams', '$location', '$ionicHistory', 'reportFactory',
        function($scope, $stateParams, $location, $ionicHistory, reportFactory) {

            $scope.report = {};
            $scope.search = {};
            $scope.search.text = $stateParams.address;
            $scope.search.latitude = $stateParams.latitude;
            $scope.search.longitude = $stateParams.longitude;

            $scope.myGoBack = function() {
                $ionicHistory.goBack();
            };

            var reportANewRisk = function() {
                $scope.report.address = $scope.search.text;
                $scope.report.latitude = $scope.search.latitude;
                $scope.report.longitude = $scope.search.longitude;

                reportFactory.createReport($scope.report).success(function(data, status, headers, config) {
                    $location.path('/confirmation');
                }).error(function(data, status, header, config) {
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
