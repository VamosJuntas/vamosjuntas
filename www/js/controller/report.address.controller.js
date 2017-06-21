angular.module('vamosJuntas')
    .controller('ReportAddressController', ['$scope', '$stateParams', '$location', '$ionicHistory', 'placeFactory', 'reportFactory',
        function($scope, $stateParams, $location, $ionicHistory, placeFactory, reportFactory) {

            $scope.report = {};
            $scope.search = {};
            $scope.search.text = placeFactory.getPlace() === undefined ? $stateParams.address : placeFactory.getPlace().address;
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
