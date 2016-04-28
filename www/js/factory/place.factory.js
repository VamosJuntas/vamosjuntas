angular.module('vamosJuntas').factory('placeFactory', ['$http', function($http) {
  var placeObject = this;
  return {
    fetchPlaces: function() {
      return $http.get('http://localhost:3000/places');
    },
    addPlace: function(place) {
      placeObject = place;
    },
    getPlace: function() {
      return placeObject;
    }
  };
}]);
