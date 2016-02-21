angular.module('vamosJuntas').factory('placeFactory', ['$http', function($http) {
  var places = {
    reports: ['initialPlace']
  };

  function fetchPlaces() {
    $http.get('http://localhost:3000/places').then(function(response) {
      places.reports = response.data;
    });
  }

  function getPlace() {
    return places.report[0];
  }

  return {
    fetchPlaces: fetchPlaces,
    places: places,
    getPlace: getPlace
  };
}]);
