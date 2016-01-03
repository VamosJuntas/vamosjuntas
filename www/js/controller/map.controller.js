angular.module('vamosJuntas').controller('MapController', function(
  $scope, $state, $cordovaGeolocation, uiGmapGoogleMapApi) {

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

        $scope.marker = {
          id: place.place_id,
          coords: { 
            latitude: place.geometry.location.lat(), 
            longitude: place.geometry.location.lng()
          }
        };
        
        console.log(place);
      }
    }
  };
  promise.then(function(position) {   
    $scope.map = {
      center: { latitude: position.coords.latitude, longitude: position.coords.longitude},
      zoom: 15
    };
    
    $scope.marker = {
      id: 1,
      coords: { 
        latitude: position.coords.latitude, 
        longitude: position.coords.longitude
      }
    };
  }, 
  function() {
    console.log('Could not get location');
  });

  
});
