angular.module('vamosJuntas').factory('placeFactory', ['$http', function($http) {
  return {
    fetchPlaces : function () {
      $http.get('http://localhost:3000/places').then(function(response) {
        return response.data;
      });
    },
    getPlace : function () {
      return places[0];
    }
  };
}]);
