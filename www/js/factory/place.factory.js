(function() {
  'use strict';
  angular.module('vamosJuntas').factory('placeFactory', placeFactory);

  placeFactory.$inject = ['$http', 'ApiEndpoint'];

  function placeFactory($http, ApiEndpoint) {
    var placeObject = {};

    placeObject.fetchPlaces = fetchPlaces;
    placeObject.addPlace = addPlace;
    placeObject.getPlace = getPlace;

    return placeObject;

    function fetchPlaces(lat, long) {
      return $http.get(ApiEndpoint.risksAroundUrl + lat + ',' + long);
    }

    function addPlace(place) {
      placeObject = place;
    }

    function getPlace() {
      return placeObject;
    }
  }
})();
