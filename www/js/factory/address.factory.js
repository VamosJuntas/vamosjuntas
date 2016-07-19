angular.module('vamosJuntas').factory('addressFactory', function($http, $q, PlacesAPI) {
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

    getAddressByCoord: function(latitude, longitude) {
      var deferred = $q.defer();
      var geocoder = new google.maps.Geocoder();
      var latlng = {
          lat: latitude,
          lng: longitude
        };

      geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
          deferred.resolve(results[0].formatted_address);
        } else {
          deferred.reject(status);
        }
      });
      return deferred.promise;
    }
  };
});
