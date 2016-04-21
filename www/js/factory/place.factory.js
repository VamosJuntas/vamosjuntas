angular.module('vamosJuntas').factory('placeFactory', ['$http', function($http) {
  return {
    fetchPlaces : function () {
      return $http.get('http://localhost:3000/places');
    },
    getPlace : function () {
      return places[0];
    }
  };
}]);
