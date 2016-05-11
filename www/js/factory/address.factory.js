angular.module('vamosJuntas').factory('addressFactory', function($http, PlacesApiEndpoint) {
  var api_key = "AIzaSyDNGPh2ERYJq9Ei1tzDSNG-nOyYAJVhpY4";
  var url = "";
  return {
    //https://developers.google.com/places/web-service/autocomplete#place_autocomplete_responses
    getAutoCompleteFromAddress: function(name) {  
      url = PlacesApiEndpoint.autoCompleteBaseUrl + 'input=' + name + '&key=' + api_key;
      return $http.get(url);
    },
    //https://developers.google.com/places/web-service/details#PlaceDetailsRequests
    getCoordFromAddress: function(placeid) {
      url = PlacesApiEndpoint.coordinatesBaseUrl + "placeid=" + placeid + "&key=" + api_key;
      return $http.get(url);
    },
    //https://developers.google.com/places/web-service/search#PlaceSearchRequests
    getNearbyAddresses: function(lat, long) {
      url = PlacesApiEndpoint.nearbySearchBaseUrl + "location=" + lat + "," + long + "&radius=300&language=pt-PT&key=" + api_key;
      return $http.get(url);
    },
  };
});
