(function() {

  angular.module('vamosJuntas').factory('placeFactory', placeFactory);

  placeFactory.$inject = ['$http'];

  function placeFactory($http) {
    var placeObject = {};

    placeObject.fetchPlaces = fetchPlaces;
    placeObject.addPlace = addPlace;
    placeObject.getPlace = getPlace;

    return placeObject;

    function fetchPlaces(lat, long) {
      return $http.get('http://0.0.0.0:3000/risks-around', {
        params: {
          latitude: lat,
          longitude: long,
        },
      });
    }

    function addPlace(place) {
      placeObject = place;
    }

    function getPlace() {
      return placeObject;
    }
  }
})();
