angular.module('starter').controller('MapController', function($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};
  var promise = $cordovaGeolocation.getCurrentPosition(options);

  promise.then(function(position) {

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15
    };

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    google.maps.event.addListenerOnce($scope.map, 'idle', function() {

      var marker = new google.maps.Marker({
        map: $scope.map,
        position: latLng
      });
    });

  }, function(error) {
    console.log('Could not get location');
  });
});
