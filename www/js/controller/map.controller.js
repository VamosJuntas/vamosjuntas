angular.module('vamosJuntas').controller('MapController', function($scope, $state, $cordovaGeolocation, uiGmapGoogleMapApi) {

  var options = {timeout: 10000, enableHighAccuracy: true};
  var promise = $cordovaGeolocation.getCurrentPosition(options);

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
