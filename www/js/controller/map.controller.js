angular.module('vamosJuntas').controller('MapController', function(
  $scope, $state, $cordovaGeolocation, uiGmapGoogleMapApi) {

  function createMarker(id, latitude, longitude) {
    return {
          id: id,
          coords: { 
            latitude: latitude, 
            longitude: longitude
          }
        };
  }

  var options = {timeout: 10000, enableHighAccuracy: true};
  var promise = $cordovaGeolocation.getCurrentPosition(options);

  $scope.searchbox = {
    template: 'searchbox.tpl.html',
    position:'top-right',
    options: {
      bounds: {},
      visible: true
    },
    events: {
      places_changed: function (searchBox) {
        var place = searchBox.getPlaces()[0];

        $scope.map = {
          center: { 
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng()
          },
          zoom: 15
        };

        $scope.marker = createMarker(
          place.place_id, 
          place.geometry.location.lat(),
          place.geometry.location.lng());
      }
    }
  };
  promise.then(function(position) {   
    $scope.map = {
      center: { latitude: position.coords.latitude, longitude: position.coords.longitude},
      zoom: 15
    };
    
    $scope.marker = createMarker(
          1, 
          position.coords.latitude,
          position.coords.longitude);
  }, 
  function() {
    console.log('Could not get location');
  });

  
});
