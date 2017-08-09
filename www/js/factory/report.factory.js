(function() {
  angular.module('vamosJuntas').factory('reportFactory', reportFactory);

  reportFactory.$inject = ['$http', 'ApiEndpoint'];

  function reportFactory($http, ApiEndpoint) {
    var reportObject = {};
    var addPlaceFromForm = function(report) {
      return {
        'address': report.address,
        'geolocation': {
          'latitude': report.latitude,
          'longitude': report.longitude,
        },
        'category': report.risk,
        'date': report.date,
      };
    };
    reportObject.createReport = createReport;
    return reportObject;


    function createReport(report) {
      return $http.post(AppSettings.apiBaseUrl + '/reports', addPlaceFromForm(report), {});
    }
  }
})();
