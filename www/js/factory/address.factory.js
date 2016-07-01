angular.module('vamosJuntas').factory('addressFactory', function($http, PlacesAPI) {
  var api_key = "AIzaSyDNGPh2ERYJq9Ei1tzDSNG-nOyYAJVhpY4";
  var url = "";
  
  return {
    //https://developers.google.com/places/web-service/details#PlaceDetailsRequests
    getCoordFromAddress: function(placeid) {
      url = PlacesAPI.coordinatesBaseUrl + "placeid=" + placeid + "&key=" + api_key;
      return $http.get(url);
    },
    //https://developers.google.com/places/web-service/search#PlaceSearchRequests
    getNearbyAddresses: function(lat, long) {
      url = PlacesAPI.nearbySearchBaseUrl + "location=" + lat + "," + long + "&radius=300&language=pt-PT&key=" + api_key;
      return $http.get(url);
    },
  };
});
